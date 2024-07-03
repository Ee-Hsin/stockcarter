from fastapi import FastAPI, HTTPException, status, Depends
from motor.motor_asyncio import AsyncIOMotorClient
from models import User # Import the models from models.py
from datetime import datetime, timezone
import uvicorn

app = FastAPI()

@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient('mongodb://localhost:27017/')
    app.db = app.mongodb_client['stockcarter_db']

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

def get_database():
    return app.db

#Example of a route to fetch data from MongoDB
@app.post("/users/", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_user(user: User, db=Depends(get_database)):
    users_collection = db.users
    # Check if the user already exists
    if await users_collection.find_one({"_id": user._id}):
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Prepare user data with current timestamps
    user_data = user.dict(by_alias=True)
    user_data['createdAt'] = user_data['updatedAt'] = datetime.now(timezone.utc)

    # Insert the user into the database
    await users_collection.insert_one(user_data)
    return user

def start():
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)