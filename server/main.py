from fastapi import FastAPI, HTTPException, status, Request, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from motor.motor_asyncio import AsyncIOMotorClient
from starlette.middleware.base import BaseHTTPMiddleware
from pymongo.collection import ReturnDocument
from models import User, UserUpdateModel  # Import the models from models.py
from datetime import datetime, timezone
import uvicorn
import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, auth

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    # List of origins that are allowed to make requests.
    allow_origins=["http://localhost:5173"],
    # For production, this should be set to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["Authorization", "Content-Type", "Access-Control-Allow-Headers",
                   "Origin", "Accept", "X-Requested-With"],  # Explicitly allow headers
)

# Initialize Firebase Admin SDK (with credentials), this file should be .gitignored
cred = credentials.Certificate("stockcarter-firebase-adminsdk.json")
firebase_admin.initialize_app(cred)

# Ensures that the token is valid and decodes it, puts the token in the request state
# In every function, id can be retrieved from request.state.user['uid'], and other claims can be retrieved in a similar way
# We should only ever use the id in the backend that we get from the token, and not the id that is sent from the frontend
# this is because the id from the frontend can be tampered with, but the id from the token is secure
class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.method == "OPTIONS":
            return await call_next(request)
        print(f"Method: {request.method}, Path: {request.url.path}")
        authorization: str = request.headers.get("Authorization")
        if not authorization:
            return JSONResponse({"detail": "Authorization header is missing"}, status_code=401)

        token = authorization.split(" ")[1]
        try:
            # Decode the token
            decoded_token = auth.verify_id_token(token)
            # Attach user info to request state
            request.state.user = decoded_token
        except Exception as e:
            return JSONResponse({"detail": "Invalid token"}, status_code=403)

        response = await call_next(request)
        return response


# Adding the AuthMiddleware to the FastAPI app
app.add_middleware(AuthMiddleware)


class LogRequestBodyMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        body = await request.body()
        print(f"Incoming request body: {body.decode()}")
        response = await call_next(request)
        return response


app.add_middleware(LogRequestBodyMiddleware)


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

# To get a user from MongoDB
@app.get("/users", response_model=User, status_code=status.HTTP_200_OK)
async def read_user(request: Request, db=Depends(get_database)):
    users_collection = db.users
    user_id = request.state.user.get("uid")
    user_data = await users_collection.find_one({"_id": user_id})
    if user_data:
        return User(**user_data)
    raise HTTPException(status_code=404, detail="User not found")

# To create a user in MongoDB
@app.post("/users", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_user(request: Request, user: User, db=Depends(get_database)):
    users_collection = db.users
    user_id = request.state.user['uid']
    if not user_id:
        raise HTTPException(
            status_code=422, detail="User ID is missing in the token")

    existing_user = await users_collection.find_one({"_id": user_id})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    user_data = user.dict(exclude={'id'})
    user_data['_id'] = user_id  # Set user ID from token as it is untampered
    user_data['createdAt'] = user_data['updatedAt'] = datetime.now(
        timezone.utc)
    try:
        result = await users_collection.insert_one(user_data)
        if not result.inserted_id:
            raise HTTPException(
                status_code=500, detail="Failed to create user")
        return user_data
    except Exception as e:
        print(f"Error inserting user: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# To update a user in MongoDB
@app.put("/users", response_model=User, status_code=status.HTTP_200_OK)
async def update_user(request: Request, user_update: UserUpdateModel, db=Depends(get_database)):
    users_collection = db.users
    user_id = request.state.user['uid']
    existing_user = await users_collection.find_one({"_id": user_id})
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = user_update.dict(exclude_unset=True)
    updated_user = await users_collection.find_one_and_update(
        {"_id": user_id},
        {"$set": update_data},
        return_document=ReturnDocument.AFTER
    )
    return updated_user


def start():
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
