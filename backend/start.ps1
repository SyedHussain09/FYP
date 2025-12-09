# Backend Startup Script
Write-Host "Starting Career Compass Backend..." -ForegroundColor Green
$env:PYTHONPATH = "."
python -m uvicorn app.main:app --reload --port 8000
