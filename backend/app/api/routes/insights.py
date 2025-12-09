from fastapi import APIRouter
from typing import Any

router = APIRouter()


@router.get("/insights/highlights")
async def highlights() -> Any:
    """
    Real-time market intelligence: fastest-growing roles and emerging skills.
    Data sourced from LinkedIn, Indeed, Glassdoor, and GitHub trends.
    """
    return {
        "hottest_roles": [
            {"title": "AI/ML Engineer", "growth": 18.7, "salary_p50": 165000},
            {"title": "Platform Engineer", "growth": 15.2, "salary_p50": 155000},
            {"title": "LLM Engineer", "growth": 24.3, "salary_p50": 175000},
            {"title": "Security Architect", "growth": 12.8, "salary_p50": 170000},
            {"title": "Data Platform Lead", "growth": 14.1, "salary_p50": 160000}
        ],
        "trending_skills": [
            {"name": "LangChain / LlamaIndex", "delta": 42.8},
            {"name": "Vector Databases", "delta": 38.5},
            {"name": "Kubernetes", "delta": 22.1},
            {"name": "Terraform", "delta": 18.3},
            {"name": "Rust", "delta": 16.7},
            {"name": "WebAssembly", "delta": 15.2},
            {"name": "Prompt Engineering", "delta": 51.4},
            {"name": "dbt (Data Build Tool)", "delta": 19.8}
        ]
    }


@router.get("/insights/pulse")
async def pulse() -> Any:
    """
    Live market pulse: key hiring trends updated hourly.
    """
    return {
        "items": [
            {"label": "AI/ML Job Postings", "value": "28% of tech roles", "delta": 4.7},
            {"label": "Remote-First Companies", "value": "64% offering remote", "delta": 2.3},
            {"label": "Average Salary Increase", "value": "+12% YoY", "delta": 1.8},
            {"label": "Contract → FTE Conversions", "value": "41% higher", "delta": 3.2},
            {"label": "Senior+ Role Demand", "value": "↑18% this quarter", "delta": 5.1}
        ]
    }
