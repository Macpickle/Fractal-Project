from fastapi import APIRouter
from models.user.userModel import *
from models.database.database import *

import os
print(os.getcwd())  # Shows your current working directory

router = APIRouter()
path = ".."
userDatabase = database(path)

# file contains basic routes for user retrieval, creation and deletion
# add more routes, and get user data here

# Create a route to get all users
@router.get("/users/")
async def read_users():
    return {"message": "GET users"}

# Create a index route
@router.get("/")
def index():
    return {"result": "Hello World"}

# BELOW PUTS IT ON THE API http://127.0.0.1:8000/items/

# Create a route to create items
@router.post("/items/")
async def create_item(item: userItem):
    items = read_data_from_db()
    
    items.append(item.model_dump())
    write_data_to_db(items)
    return item

