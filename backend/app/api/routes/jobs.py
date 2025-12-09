from fastapi import APIRouter
from typing import Any

router = APIRouter()


@router.get("/jobs/alerts")
async def alerts() -> Any:
    return {
        "jobAlerts": [
            {
                "id": "1",
                "role": "Data Scientist",
                "company": "Acme AI",
                "location": "Remote",
                "salaryRange": "100000-140000",
                "postedAt": "2025-11-01T12:00:00Z",
                "applyUrl": "https://example.com/job/1",
                "skills": ["Python", "SQL", "Pandas"]
            },
            {
                "id": "2",
                "role": "MLOps Engineer",
                "company": "InfraCorp",
                "location": "Bengaluru, IN",
                "salaryRange": "110000-160000",
                "postedAt": "2025-11-09T08:30:00Z",
                "applyUrl": "https://example.com/job/2",
                "skills": ["Docker", "Kubernetes", "CI/CD"]
            }
        ]
    }
