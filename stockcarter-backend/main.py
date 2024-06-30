from fastapi import FastAPI
from pymongo import MongoClient
import uvicorn

app = FastAPI()

client = MongoClient('mongodb://localhost:27017/')
db=client['stockcarter_db']

@app.get("/")
def read_root():
    return {"Hello": "World"}

#Example of a route to fetch data from MongoDB
@app.get("get_stocks")
def get_stocks():
    stocks_collection = db.stocks
    stocks = list(stocks_collection.find({}))
    return {"stocks": stocks}

def start():
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)