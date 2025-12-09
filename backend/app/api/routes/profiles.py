from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import uuid

router = APIRouter()

class ProfileIn(BaseModel):
    name: str
    careerStage: str
    interests: list[str] = []
    skills: list[str] = []
    targetRoles: list[str] = []
    location: str | None = None
    salaryGoal: int | None = None


@router.post("/profiles")
async def create_profile(payload: ProfileIn):
    # For MVP we generate a simple UUID and return it. Persistence will be added later.
    profile_id = str(uuid.uuid4())
    return {"profile_id": profile_id}
