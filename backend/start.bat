@echo off
echo Starting Career Compass Backend...
set PYTHONPATH=.
python -m uvicorn app.main:app --reload --port 8000
