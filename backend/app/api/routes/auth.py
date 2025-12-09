from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from datetime import timedelta
import httpx
import os
from dotenv import load_dotenv
from app.core.auth import (
    verify_password,
    get_password_hash,
    create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from app.core.database import get_user, create_user

load_dotenv()

router = APIRouter(prefix="/auth", tags=["authentication"])

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: dict

@router.post("/register", response_model=Token)
async def register(user: UserRegister):
    """Register a new user."""
    # Check if user already exists
    if get_user(user.username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    # Create user
    hashed_password = get_password_hash(user.password)
    new_user = create_user(user.username, user.email, hashed_password)
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "user_id": new_user["user_id"]},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "user_id": new_user["user_id"],
            "username": new_user["username"],
            "email": new_user["email"]
        }
    }

@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    """Login an existing user."""
    # Get user from database
    db_user = get_user(user.username)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Verify password
    if not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "user_id": db_user["user_id"]},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "user_id": db_user["user_id"],
            "username": db_user["username"],
            "email": db_user["email"]
        }
    }

class GoogleAuthRequest(BaseModel):
    token: str

@router.post("/google", response_model=Token)
async def google_auth(request: GoogleAuthRequest):
    """Authenticate with Google OAuth token."""
    try:
        # Verify the Google ID token
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"https://oauth2.googleapis.com/tokeninfo?id_token={request.token}"
            )
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid Google token"
                )
            
            google_user = response.json()
            email = google_user.get("email")
            name = google_user.get("name", email.split("@")[0] if email else "user")
            
            if not email:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email not provided by Google"
                )
            
            # Check if user exists (use email as username for Google users)
            user = get_user(email)
            if not user:
                # Create new user with email as username and a random password
                random_password = "google_oauth_" + email  # Simple password for Google users
                user = create_user(email, email, get_password_hash(random_password))
            
            # Create access token
            access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            access_token = create_access_token(
                data={"sub": user["username"], "user_id": user["user_id"]},
                expires_delta=access_token_expires
            )
            
            return {
                "access_token": access_token,
                "token_type": "bearer",
                "user": {
                    "user_id": user["user_id"],
                    "username": user["username"],
                    "email": user["email"]
                }
            }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Google authentication failed: {str(e)}"
        )

