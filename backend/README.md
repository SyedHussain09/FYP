# Career Compass — Backend

This folder contains a FastAPI backend scaffold for the Career Compass platform. It provides lightweight endpoints to support the Next.js frontend during development.

Quick start (with poetry):

1. Install dependencies

   poetry install

2. Start dev server

   poetry run uvicorn app.main:app --reload --port 8000

API endpoints

- GET /api/health — health check
- POST /api/profiles — create a profile (MVP generates UUID)
- GET /api/insights/highlights — small insights payload
- GET /api/insights/pulse — market pulse ticker
- GET /api/recommendations — mock recommendations
- GET /api/jobs/alerts — sample job alerts

Notes

- This is a scaffold that focuses on wiring and demo data — real integrations and ingestion pipelines will be added in subsequent iterations.
