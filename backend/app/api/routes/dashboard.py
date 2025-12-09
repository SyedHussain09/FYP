from fastapi import APIRouter, Query
from typing import Any

router = APIRouter()


@router.get("/dashboard")
async def get_dashboard(profileId: str = Query(None)):
    """
    Return comprehensive dashboard data with realistic professional insights.
    In production, this would query user profile, ML models, and live market data.
    """
    return {
        "profile": {
            "name": "Hussain",
            "careerStage": "mid-career",
            "location": "Remote / Hybrid",
            "interests": ["Artificial Intelligence", "Cloud Infrastructure", "Data Engineering"],
            "skills": ["Python", "TensorFlow", "AWS", "Docker", "SQL", "FastAPI"],
            "targetRoles": ["Machine Learning Engineer", "AI Solutions Architect", "Data Platform Lead"]
        },
        "recommendations": [
            {
                "role": "Senior Machine Learning Engineer",
                "fitScore": 92.5,
                "demandSignal": 14.2,
                "salaryP50": 165000,
                "salaryP90": 225000,
                "confidence": 0.94,
                "rationale": [
                    "Strong track record in production ML systems",
                    "Expert-level Python and deep learning frameworks",
                    "Experience leading cross-functional AI initiatives",
                    "Market demand up 14% in Q4 2025"
                ]
            },
            {
                "role": "AI Solutions Architect",
                "fitScore": 88.3,
                "demandSignal": 11.8,
                "salaryP50": 175000,
                "salaryP90": 245000,
                "confidence": 0.91,
                "rationale": [
                    "Proven cloud infrastructure expertise (AWS/Azure)",
                    "Strong stakeholder communication skills",
                    "Experience designing scalable AI platforms",
                    "High demand in enterprise tech sector"
                ]
            },
            {
                "role": "Principal Data Engineer",
                "fitScore": 85.7,
                "demandSignal": 9.4,
                "salaryP50": 155000,
                "salaryP90": 210000,
                "confidence": 0.89,
                "rationale": [
                    "Deep expertise in data pipelines and ETL",
                    "Leadership experience with data teams",
                    "Strong SQL and distributed systems knowledge"
                ]
            },
            {
                "role": "MLOps Lead",
                "fitScore": 84.2,
                "demandSignal": 16.5,
                "salaryP50": 170000,
                "salaryP90": 230000,
                "confidence": 0.87,
                "rationale": [
                    "CI/CD and infrastructure automation skills",
                    "Experience with Kubernetes and Docker",
                    "Fastest-growing ML role in 2025"
                ]
            },
            {
                "role": "AI Product Manager",
                "fitScore": 79.8,
                "demandSignal": 8.2,
                "salaryP50": 145000,
                "salaryP90": 200000,
                "confidence": 0.82,
                "rationale": [
                    "Technical background enables effective collaboration",
                    "Product thinking and user empathy",
                    "Growing demand for technical PMs in AI"
                ]
            }
        ],
        "skillGaps": [
            {"skill": "Kubernetes", "level": 65, "marketDemand": 90},
            {"skill": "LangChain / LLM Ops", "level": 45, "marketDemand": 95},
            {"skill": "System Design", "level": 70, "marketDemand": 85},
            {"skill": "Spark / Big Data", "level": 55, "marketDemand": 80},
            {"skill": "Leadership", "level": 60, "marketDemand": 88},
            {"skill": "Vector Databases", "level": 40, "marketDemand": 92}
        ],
        "salaryTrajectory": [
            {"year": 2025, "salary": 145000},
            {"year": 2026, "salary": 162000},
            {"year": 2027, "salary": 178000},
            {"year": 2028, "salary": 195000},
            {"year": 2029, "salary": 215000},
            {"year": 2030, "salary": 235000}
        ],
        "learningPath": [
            {
                "title": "Advanced Machine Learning Engineering",
                "provider": "Stanford Online",
                "hours": 80,
                "relevance": 96,
                "cost": 2400,
                "url": "https://online.stanford.edu/courses/machine-learning"
            },
            {
                "title": "Building Production-Grade LLM Applications",
                "provider": "DeepLearning.AI",
                "hours": 24,
                "relevance": 94,
                "cost": 0,
                "url": "https://www.deeplearning.ai/courses/"
            },
            {
                "title": "Kubernetes for ML Engineers",
                "provider": "Linux Foundation",
                "hours": 40,
                "relevance": 92,
                "cost": 299,
                "url": "https://training.linuxfoundation.org/"
            },
            {
                "title": "System Design for Senior Engineers",
                "provider": "Educative.io",
                "hours": 35,
                "relevance": 89,
                "cost": 79,
                "url": "https://www.educative.io/courses/grokking-system-design"
            },
            {
                "title": "AI Product Leadership",
                "provider": "Reforge",
                "hours": 30,
                "relevance": 85,
                "cost": 1995,
                "url": "https://www.reforge.com/"
            }
        ],
        "jobAlerts": [
            {
                "id": "job-001",
                "role": "Senior ML Engineer",
                "company": "Meta",
                "location": "Remote (US)",
                "salaryRange": "$180k - $250k",
                "postedAt": "2025-11-12T08:00:00Z",
                "skills": ["Python", "PyTorch", "MLOps", "Kubernetes", "AWS"],
                "applyUrl": "https://www.metacareers.com/jobs"
            },
            {
                "id": "job-002",
                "role": "AI Solutions Architect",
                "company": "Google Cloud",
                "location": "Hybrid - Mountain View",
                "salaryRange": "$190k - $280k",
                "postedAt": "2025-11-11T14:30:00Z",
                "skills": ["TensorFlow", "GCP", "System Design", "Vertex AI"],
                "applyUrl": "https://careers.google.com"
            },
            {
                "id": "job-003",
                "role": "ML Platform Lead",
                "company": "Netflix",
                "location": "Los Gatos, CA",
                "salaryRange": "$200k - $320k",
                "postedAt": "2025-11-10T10:15:00Z",
                "skills": ["Python", "Spark", "Kubernetes", "Leadership"],
                "applyUrl": "https://jobs.netflix.com"
            },
            {
                "id": "job-004",
                "role": "Staff MLOps Engineer",
                "company": "OpenAI",
                "location": "San Francisco",
                "salaryRange": "$210k - $350k",
                "postedAt": "2025-11-09T16:45:00Z",
                "skills": ["Kubernetes", "LLMs", "Python", "Infrastructure"],
                "applyUrl": "https://openai.com/careers"
            }
        ]
    }
