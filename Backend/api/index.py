from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import json
from typing import Dict, Any

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def read_db():
    try:
        with open("../database/users.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        # empty db create if don't exists
        return {"users": {}}

def write_db(data):
    with open("../database/users.json", "w") as f:
        json.dump(data, f, indent=2)

@app.post("/signup")
def signup(user_data: Dict[str, str]):
    db = read_db()
    users = db["users"]
    username = user_data.get("username")
    password = user_data.get("password")

    if not username or not password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username and password are required.")

    if username in users:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists.")

    users[username] = {"password": password}
    write_db(db)
    
    return {"message": "Account created successfully!"}

@app.post("/login")
def login(user_data: Dict[str, str]):
    db = read_db()
    users = db["users"]
    username = user_data.get("username")
    password = user_data.get("password")

    user = users.get(username)
    if user and user.get("password") == password:
        return {"message": "Login successful!"}
    
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password.")

@app.get("/dashboard")
def get_dashboard():
    db = read_db()
    return db["intern_data"]

@app.get("/leaderboard")
def get_leaderboard():
    db = read_db()
    return db["leaderboard_data"]