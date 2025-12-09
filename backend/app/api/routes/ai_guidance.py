from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional
import anthropic
import os
from dotenv import load_dotenv
from app.core.auth import get_current_user
import json

load_dotenv()

router = APIRouter(prefix="/ai-guidance", tags=["ai-guidance"])

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")

if not ANTHROPIC_API_KEY:
    raise ValueError("ANTHROPIC_API_KEY not found in environment variables")

client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    custom_query: str

class RoadmapRequest(BaseModel):
    career_goal: str
    current_level: str
    time_commitment: str  # e.g., "10 hours/week"
    preferences: Optional[str] = None

SYSTEM_PROMPT = """You are an expert career guidance AI specializing in technology careers, software engineering, data science, AI/ML, and related fields. 

Your role is to provide:
1. Personalized career roadmaps with realistic timelines
2. Curated learning resources (courses, tutorials, books)
3. Skill gap analysis and recommendations
4. Industry insights and trends
5. Actionable steps to achieve career goals

Always provide:
- Specific, actionable advice
- Free and paid course recommendations (prioritize quality)
- Realistic timelines based on user's time commitment
- Proven techniques and industry-standard practices
- Links to reputable resources when possible

Be conversational, supportive, and practical."""

@router.post("/chat")
async def chat_with_ai(
    request: ChatRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Chat with Claude AI for career guidance.
    User can ask custom questions about career paths, skills, roadmaps, etc.
    """
    try:
        # Build messages
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
        
        # Add custom query
        if request.custom_query:
            messages.append({"role": "user", "content": request.custom_query})
        
        # Call Claude API
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            system=SYSTEM_PROMPT,
            messages=messages
        )
        
        return {
            "response": response.content[0].text,
            "usage": {
                "input_tokens": response.usage.input_tokens,
                "output_tokens": response.usage.output_tokens
            }
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")

@router.post("/chat/stream")
async def chat_with_ai_stream(
    request: ChatRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Stream chat responses from Claude AI.
    Provides real-time streaming for better UX.
    """
    try:
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
        
        if request.custom_query:
            messages.append({"role": "user", "content": request.custom_query})
        
        async def generate():
            with client.messages.stream(
                model="claude-sonnet-4-20250514",
                max_tokens=4096,
                system=SYSTEM_PROMPT,
                messages=messages
            ) as stream:
                for text in stream.text_stream:
                    yield f"data: {json.dumps({'text': text})}\n\n"
        
        return StreamingResponse(generate(), media_type="text/event-stream")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")

@router.post("/roadmap")
async def generate_roadmap(
    request: RoadmapRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Generate a personalized career roadmap with timeline and resources.
    """
    try:
        prompt = f"""Create a detailed, personalized career roadmap for the following:

Career Goal: {request.career_goal}
Current Level: {request.current_level}
Time Commitment: {request.time_commitment}
Additional Preferences: {request.preferences or 'None'}

Please provide:
1. **Overview**: Brief summary of the path from current level to goal
2. **Timeline**: Realistic milestone-based timeline (quarters/months)
3. **Learning Path**: Step-by-step skills to acquire with resources
4. **Free Courses**: Top free resources (YouTube, freeCodeCamp, MIT OpenCourseWare, etc.)
5. **Paid Courses**: High-quality paid options (Coursera, Udemy, Educative, etc.) with justification
6. **Projects**: Real-world projects to build for portfolio
7. **Certifications**: Relevant certifications (if applicable)
8. **Networking**: Communities and events to join
9. **Job Search**: When and how to start applying

Format as a structured markdown with clear sections, bullet points, and actionable items."""

        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": prompt}]
        )
        
        return {
            "roadmap": response.content[0].text,
            "career_goal": request.career_goal,
            "estimated_timeline": f"Based on {request.time_commitment}"
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")

@router.post("/resources")
async def get_learning_resources(
    skill: str,
    level: str = "beginner",
    include_paid: bool = True,
    current_user: dict = Depends(get_current_user)
):
    """
    Get curated learning resources for a specific skill.
    """
    try:
        prompt = f"""Provide a curated list of learning resources for: {skill}
Level: {level}
Include paid resources: {include_paid}

Please provide:
1. **Free Resources**:
   - Best YouTube channels/playlists with links
   - Free online courses (Coursera free audits, edX, etc.)
   - Documentation and tutorials
   - Practice platforms

2. {"**Paid Resources** (only high-quality, proven courses):" if include_paid else ""}
   {"- Top paid courses with pricing and why they're worth it" if include_paid else ""}
   {"- Books (with Amazon/publisher links)" if include_paid else ""}

3. **Practice Projects**: 3-5 project ideas to build skills

4. **Communities**: Where to get help (Discord, Reddit, Stack Overflow)

Format as markdown with clickable links where possible."""

        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=3000,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": prompt}]
        )
        
        return {
            "resources": response.content[0].text,
            "skill": skill,
            "level": level
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")
