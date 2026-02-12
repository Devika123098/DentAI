# DentAI Client

Next.js frontend for DentAI.

## Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Bun (package manager/runtime)
- Biome for linting/formatting

## Run Locally
From `client/`:

```bash
bun install
bun run dev
```

Open `http://localhost:3000`.

## Available Scripts
- `bun run dev` starts the development server.
- `bun run build` creates a production build.
- `bun run start` serves the production build.
- `bun run lint` runs Biome checks.
- `bun run format` formats code with Biome.

## Frontend Workflow
1. Start the backend first (see `server/README.md`) so API endpoints are available.
2. Start the frontend with `bun run dev`.
3. Build UI in `client/src/app/`.
4. When adding API calls, point them to the FastAPI server (default `http://localhost:8000`).
5. Validate the full flow in browser:
   - UI loads at `http://localhost:3000`
   - Backend responds at `http://localhost:8000/`

## Current Status
The current `client/src/app/page.tsx` is still the starter page. No backend call is wired yet, so the next step is implementing fetch logic from the frontend to the FastAPI routes.
