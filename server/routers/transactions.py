from fastapi import APIRouter, HTTPException, Request, Depends, status
from models.transaction_models import Transaction, TransactionResponse
from services.database import get_database
from typing import Union, List

router = APIRouter()

@router.get("/transactions", response_model=List[Transaction], status_code=status.HTTP_200_OK)
async def get_transactions(request: Request, db=Depends(get_database)):
    try:
        user_id = request.state.user.get("uid")
        # Access the users and transactions collections (We will be
        # using the .transactions field in the user document to get the transactions)
        # because .find_one for users is O(1) as it is indexed while
        # .find for transactions is O(n)
        users_collection = db.users
        transactions_collection = db.transactions

        # Fetch user document to get transaction IDs
        user_data = await users_collection.find_one({"_id": user_id})
        if not user_data:
            raise HTTPException(status_code=404, detail="User not found")

         # Get the list of transaction IDs from the user's document
        transaction_ids = user_data.get("transactions", [])
        if not transaction_ids:
            return []  # Return empty list if no transactions found

        # Query transactions by their IDs
        cursor = transactions_collection.find(
            {"_id": {"$in": transaction_ids}})
        transactions = await cursor.to_list(length=None)

        # Convert transactions from BSON to Pydantic models
        transactions_list = []
        for transaction in transactions:
            # Convert ObjectId to string
            transaction['id'] = str(transaction['_id'])
            transactions_list.append(Transaction(**transaction))

        return transactions_list

    except Exception as e:
        print(f"Error getting transactions: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.post("/transactions", response_model=TransactionResponse, status_code=status.HTTP_201_CREATED)
async def create_transaction(request: Request, transactions: Union[Transaction, List[Transaction]], db=Depends(get_database)):
    try:
        user_id = request.state.user.get("uid")
        if not user_id:
            raise HTTPException(status_code=401, detail="User ID not found")

        transactions_collection = db.transactions
        users_collection = db.users

        #We allow a single transaction to be passed as well as a list of transactions
        #We convert single transactions to a list for easy processing
        if not isinstance(transactions, list):
            transactions = [transactions]

        # Prepare list to store the new transaction IDs
        new_transaction_ids = []

        for transaction in transactions:
            transaction.userId = user_id
            # convert to dictionary
            transaction_dict = transaction.model_dump(by_alis=True)
            result = await transactions_collection.insert_one(transaction_dict)
            new_transaction_ids.append(str(result.inserted_id))

        # Update the user's document with the new transaction IDs
        await users_collection.update_one(
            {"_id": user_id},
            {"$push": {"transactions": {"$each": new_transaction_ids}}}
        )

        return {"message": f"{len(new_transaction_ids)} transaction(s) created successfully", "transaction_ids": new_transaction_ids}

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error creating transactions: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")