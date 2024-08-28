from fastapi import APIRouter, HTTPException, Request, Depends, status
from models.user_models import User, UserUpdateModel, ExperienceLevel, InvestmentTimeframe, InvestorType
from services.database import get_database
from pymongo.errors import PyMongoError
from datetime import datetime, timezone
from pymongo.collection import ReturnDocument

router = APIRouter()

@router.get("/users", response_model=User, status_code=status.HTTP_200_OK)
async def read_user(request: Request, db=Depends(get_database)):
    try:
        print(f"User: {request.state.user}")
        users_collection = db.users
        user_id = request.state.user.get("uid")
        user_data = await users_collection.find_one({"_id": user_id})
        print(f"User data: {user_data}")
        if user_data:
            # Deserialize strings back to enums, handle None values
            if 'experienceLevel' in user_data and user_data['experienceLevel'] is not None:
                user_data['experienceLevel'] = ExperienceLevel(
                    user_data['experienceLevel'])
            if 'investmentTimeframe' in user_data and user_data['investmentTimeframe'] is not None:
                user_data['investmentTimeframe'] = InvestmentTimeframe(
                    user_data['investmentTimeframe'])
            if 'investorType' in user_data and user_data['investorType'] is not None:
                user_data['investorType'] = InvestorType(
                    user_data['investorType'])

            return User(**user_data)

        raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        print(f"Error reading user: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# To create a user in MongoDB


@router.post("/users", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_user(request: Request, user: User, db=Depends(get_database)):
    try:
        users_collection = db.users
        user_id = request.state.user.get('uid')

        if not user_id:
            raise HTTPException(
                status_code=422, detail="User ID is missing in the token")

        existing_user = await users_collection.find_one({"_id": user_id})
        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists")

        user_data = user.model_dump(exclude={'id'})
        # Set user ID from token as it is untampered
        user_data['_id'] = user_id
        user_data['createdAt'] = user_data['updatedAt'] = datetime.now(
            timezone.utc)

        result = await users_collection.insert_one(user_data)
        if not result.inserted_id:
            raise HTTPException(
                status_code=500, detail="Failed to create user")

        return user_data
    except PyMongoError as e:
        print(f"MongoDB error: {str(e)}")
        raise HTTPException(status_code=500, detail="Database error")
    except HTTPException as http_exc:
        print(f"HTTP error: {str(http_exc)}")
        raise http_exc  # Re-raise HTTP exceptions to preserve the original status code
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# To update a user in MongoDB


@router.put("/users", response_model=User, status_code=status.HTTP_200_OK)
async def update_user(request: Request, user_update: UserUpdateModel, db=Depends(get_database)):
    try:
        users_collection = db.users
        user_id = request.state.user['uid']
        existing_user = await users_collection.find_one({"_id": user_id})
        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")

        update_data = user_update.model_dump(exclude_unset=True)

        # Serialize enums to strings before updating
        if 'experienceLevel' in update_data and isinstance(update_data['experienceLevel'], ExperienceLevel):
            update_data['experienceLevel'] = update_data['experienceLevel'].value
        if 'investmentTimeframe' in update_data and isinstance(update_data['investmentTimeframe'], InvestmentTimeframe):
            update_data['investmentTimeframe'] = update_data['investmentTimeframe'].value
        if 'investorType' in update_data and isinstance(update_data['investorType'], InvestorType):
            update_data['investorType'] = update_data['investorType'].value

        updated_user = await users_collection.find_one_and_update(
            {"_id": user_id},
            {"$set": update_data},
            return_document=ReturnDocument.AFTER
        )

        if not updated_user:
            raise HTTPException(
                status_code=404, detail="User not found after update")
        return updated_user
    except Exception as e:
        print(f"Error updating user: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")