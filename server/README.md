# DentAI Server

FastAPI backend for DentAI.

## Stack
- FastAPI
- Uvicorn (ASGI server)
- Python 3.11 (venv is present in `server/venv`)

## Run Locally
From `server/`:

```bash
# optional: activate existing virtual environment
.\venv\Scripts\Activate.ps1

# if dependencies are missing
pip install fastapi uvicorn

# run api
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Health check:
- `GET http://localhost:8000/` returns `{ "message": "Hello from FastAPI" }`.

## Backend Workflow
1. Define routes in `server/main.py`.
2. Run with `uvicorn main:app --reload` for hot reload.
3. Verify endpoints in browser/curl before wiring frontend.
4. Keep response shapes stable so frontend integration stays predictable.

## Client + Server Workflow
1. Start server on port `8000`.
2. Start client on port `3000`.
3. Implement/adjust API routes in FastAPI.
4. Consume those routes from Next.js components or route handlers.
5. Validate changes end-to-end in browser and API responses.

## Current Status
The backend currently exposes one route in `server/main.py`:
- `GET /` -> returns a hello message.

Add new endpoints here as DentAI features grow.
