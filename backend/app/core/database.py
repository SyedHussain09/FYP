"""
Simple in-memory user database for demo purposes.
In production, replace with SQLAlchemy + PostgreSQL.
"""

users_db = {}

def get_user(username: str):
    """Get user by username."""
    return users_db.get(username)

def create_user(username: str, email: str, hashed_password: str):
    """Create a new user."""
    user_id = len(users_db) + 1
    users_db[username] = {
        "user_id": user_id,
        "username": username,
        "email": email,
        "hashed_password": hashed_password,
        "created_at": None
    }
    return users_db[username]
