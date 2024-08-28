# services/database.py

from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

# Initialize global variables for the database client
client = None
db = None

def init_database():
    """Initialize the MongoDB client and database"""
    global client, db
    MONGODB_URI = os.getenv("MONGODB_URI")
    client = AsyncIOMotorClient(MONGODB_URI)
    db = client["stockcarter_db"]

def get_database():
    """Get the database instance; raises error if not initialized"""
    if db is None:
        raise NotImplementedError("Database client not initialized yet.")
    return db

def close_database():
    """Close the MongoDB client"""
    if client:
        client.close()