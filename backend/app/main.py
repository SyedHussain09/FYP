from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .api.routes import health, profiles, recommendations, insights, jobs, dashboard, auth, ai_guidance

app = FastAPI(
    title="Career Compass API",
    description="AI-powered career guidance platform backend",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api/v1")
app.include_router(auth.router, prefix="/api/v1")
app.include_router(profiles.router, prefix="/api/v1")
app.include_router(recommendations.router, prefix="/api/v1")
app.include_router(insights.router, prefix="/api/v1")
app.include_router(jobs.router, prefix="/api/v1")
app.include_router(dashboard.router, prefix="/api/v1")
app.include_router(ai_guidance.router, prefix="/api/v1")


@app.get("/api")
async def root():
    return {"status": "ok", "message": "Career Compass API is alive"}
