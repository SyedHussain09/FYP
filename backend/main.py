"""
Career Compass Backend Server
Run this file directly: python main.py
"""
import sys
import os

# Add current directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

if __name__ == "__main__":
    import uvicorn
    from app.main import app
    
    print("🚀 Starting Career Compass Backend Server...")
    print("📍 Server will run on: http://localhost:8000")
    print("📝 API docs available at: http://localhost:8000/docs")
    print("\nPress CTRL+C to stop the server\n")
    
    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8000,
        reload=True
    )
