from fastapi import FastAPI, status, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from motor.motor_asyncio import AsyncIOMotorClient
import uvicorn
import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials
from contextlib import asynccontextmanager
from middlewares.auth_middleware import AuthMiddleware
from middlewares.log_request_middleware import LogRequestBodyMiddleware
from routers import users, transactions
from services import database as db_service  # Import database service

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize MongoDB client and database
    db_service.init_database()

    # Check MongoDB connection
    try:
        await app.db.command("ping")
        print("Successfully connected to MongoDB!")
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")

    # Initialize Firebase Admin SDK (with credentials), this file should be .gitignored
    cred = credentials.Certificate("stockcarter-firebase-adminsdk.json")
    default_app = firebase_admin.initialize_app(cred)

    # Check Firebase initialization
    if not firebase_admin._apps:
        print("Firebase Admin SDK initialization failed")
        raise Exception("Firebase Admin SDK initialization failed")
    else:
        print("Firebase Admin SDK initialized correctly")

    yield  # At this point, the app is running and serving requests

    # Cleanup/Shutdown logic
    db_service.close_database()
    print("MongoDB client closed")

app = FastAPI(lifespan=lifespan)

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

# Adding the AuthMiddleware and Logging Body Middleware to the FastAPI app
app.add_middleware(AuthMiddleware)
app.add_middleware(LogRequestBodyMiddleware)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": exc.errors(), "body": exc.body},
    )

# Include routers
app.include_router(users.router)
app.include_router(transactions.router)

def start():
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
