from fastapi import APIRouter
from models.user.userModel import userItem
from database.database import *

router = APIRouter()
userDatabase = database("database/userData.json")

# Create a route to get all users
@router.get("/users/")
async def read_users():
    return userDatabase.getData()

# Create a route to create items

@router.post("/users/register")
async def users_register(user: userItem):
    foundUser = userDatabase.getData(username=user.username)
    
    if foundUser is not None:
        return {"message": "User already exists", "ok": False}
    
    data = user.model_dump()
    data.update({"id":userDatabase.dataSize + 1})
    
    userDatabase.addData(data)
    return {"message": "User created", "ok": True}
    

@router.post("/users/login")
async def users_login(user: userItem):    
    foundUser = userDatabase.getData(username=user.username) 
    
    if foundUser is None:
        return {"message": "User not found", "ok": False}
    
    if foundUser["password"] == user.password:
        return {"message": "Login successful", "ok": True}
    
    return {"message": "Incorrect password", "ok": False}
    
    