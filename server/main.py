from __future__ import annotations

import base64
import os
from typing import Any

import cv2
import numpy as np
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.responses import Response
from fastapi.responses import JSONResponse
from ultralytics import YOLO
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


MODEL_PATH = os.getenv("MODEL_PATH", "best.pt")
_model: YOLO | None = None


@app.on_event("startup")
def load_model() -> None:
    global _model
    if not os.path.exists(MODEL_PATH):
        _model = None
        return
    _model = YOLO(MODEL_PATH)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "DentAI FastAPI is running"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)) -> JSONResponse:
    if _model is None:
        raise HTTPException(
            status_code=500,
            detail=f"Model not loaded. Put best.pt at '{MODEL_PATH}' or set MODEL_PATH.",
        )

    img_bytes = await file.read()
    if not img_bytes:
        raise HTTPException(status_code=400, detail="Empty file upload.")

    img_arr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(img_arr, cv2.IMREAD_COLOR)
    if img is None:
        raise HTTPException(status_code=400, detail="Invalid image file.")

    results = _model(img)[0]

    detections: list[dict[str, Any]] = []
    for box in results.boxes:
        cls_id = int(box.cls[0])
        conf = float(box.conf[0])
        xyxy = box.xyxy[0].tolist()
        detections.append(
            {
                "class_id": cls_id,
                "class_name": _model.names.get(cls_id, str(cls_id)),
                "confidence": conf,
                "bbox": xyxy,
            }
        )

    annotated = results.plot()
    ok, buffer = cv2.imencode(".jpg", annotated)
    if not ok:
        raise HTTPException(status_code=500, detail="Failed to encode output image.")
    img_b64 = base64.b64encode(buffer).decode("utf-8")

    return JSONResponse({"detections": detections, "image_base64": img_b64})


@app.post("/predict-image")
async def predict_image(file: UploadFile = File(...)) -> Response:
    if _model is None:
        raise HTTPException(
            status_code=500,
            detail=f"Model not loaded. Put best.pt at '{MODEL_PATH}' or set MODEL_PATH.",
        )

    img_bytes = await file.read()
    if not img_bytes:
        raise HTTPException(status_code=400, detail="Empty file upload.")

    img_arr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(img_arr, cv2.IMREAD_COLOR)
    if img is None:
        raise HTTPException(status_code=400, detail="Invalid image file.")

    results = _model(img)[0]
    annotated = results.plot()
    ok, buffer = cv2.imencode(".jpg", annotated)
    if not ok:
        raise HTTPException(status_code=500, detail="Failed to encode output image.")

    return Response(content=buffer.tobytes(), media_type="image/jpeg")
