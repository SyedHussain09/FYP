from fastapi import APIRouter
from typing import Any

router = APIRouter()


@router.get("/recommendations")
async def recommendations():
    # Return a small set of mock recommendations for the UI to render.
    return {
        "recommendations": [
            {
                "role": "Data Scientist",
                "fitScore": 87.2,
                "demandSignal": 8.5,
                "salaryP50": 115000,
                "salaryP90": 160000,
                "confidence": 0.9,
                "rationale": ["Strong Python & statistics", "Relevant project experience", "High market demand"]
            },
            {
                "role": "MLOps Engineer",
                "fitScore": 78.1,
                "demandSignal": 9.1,
                "salaryP50": 135000,
                "salaryP90": 185000,
                "confidence": 0.86,
                "rationale": ["DevOps background", "ML infra experience"]
            }
        ]
    }
