from fastapi import FastAPI, HTTPException, status, Request, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from motor.motor_asyncio import AsyncIOMotorClient
from starlette.middleware.base import BaseHTTPMiddleware
from pymongo.collection import ReturnDocument
from models import User # Import the models from models.py
from datetime import datetime, timezone
import uvicorn
import os
from dotenv import load_dotenv

app = FastAPI()

class LogRequestBodyMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        body = await request.body()
        print(f"Incoming request body: {body.decode()}")
        response = await call_next(request)
        return response

app.add_middleware(LogRequestBodyMiddleware)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # List of origins that are allowed to make requests. 
    # For production, this should be set to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.on_event("startup")
async def startup_db_client():
    # Load MongoDB URI from environment variables
    load_dotenv()
    MONGODB_URI = os.getenv("MONGODB_URI")
    print("Connecting to MongoDB with URI:", MONGODB_URI)
    app.mongodb_client = AsyncIOMotorClient(MONGODB_URI)
    app.db = app.mongodb_client['stockcarter_db']

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

def get_database():
    return app.db

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": exc.errors(), "body": exc.body},
    )

#To create or update a user in MongoDB
@app.post("/users", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_or_update_user(user: User, db=Depends(get_database)):
    print(f"Received user data: {user.json()}")
    users_collection = db.users
    existing_user = await users_collection.find_one({"_id": user.id})
    # If the user already exists, update the user
    if existing_user:
        update_data = {}
        if user.name:
            update_data["name"] = user.name #Name could change from the google account, so we want to update our user doc too!
        else:
            update_data["name"] = existing_user.get("name", None) #If no name is provided, keep the existing name

        updated_user = await users_collection.find_one_and_update(
            {"_id": user.id},
            {"$set": update_data},
            return_document=ReturnDocument.AFTER
        )
        return updated_user
    # If the user does not exist, create a new user
    else:
        # Prepare user data with current timestamps
        user_data = user.dict(by_alias=True)
        user_data['createdAt'] = user_data['updatedAt'] = datetime.now(timezone.utc)

        # Insert the user into the database
        await users_collection.insert_one(user_data)
        return user

#To get a user from MongoDB
@app.get("/users/{user_id}", response_model=User, status_code=status.HTTP_200_OK)
async def read_user(user_id: str, db=Depends(get_database)):
    users_collection = db.users
    user_data = await users_collection.find_one({"_id": user_id})
    if user_data:
        return User(**user_data)
    raise HTTPException(status_code=404, detail="User not found")

def start():
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)