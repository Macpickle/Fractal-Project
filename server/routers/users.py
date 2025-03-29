from fastapi import APIRouter
from models.user.userModel import userItem
from database.database import *

router = APIRouter()
userDatabase = database("database/userData.json")

# Route to get all users
@router.get("/users/")
async def read_users():
    return userDatabase.getData()

# Route to register user
@router.post("/users/register")
async def users_register(user: userItem):
    foundUser = userDatabase.getData(username=user.username)
    
    if foundUser is not None:
        return {"message": "User already exists", "ok": False}
    
    data = user.model_dump()
    data.update({"id":userDatabase.dataSize + 1})
    
    userDatabase.addData(data)
    return {"message": "User created", "ok": True}
    
# Route to login user
@router.post("/users/login")
async def users_login(user: userItem):    
    foundUser = userDatabase.getData(username=user.username) 
    
    if foundUser is None:
        return {"message": "User not found", "ok": False}
    
    if foundUser["password"] == user.password:
        return {"message": "Login successful", "ok": True}
    
    return {"message": "Incorrect password", "ok": False}
    
# Route to delete user
@router.delete("/users/{id}")
async def delete_user(id: int):
    print(f"Deleting user with ID: {id}")
    found = userDatabase.deleteData({"id":id})
    
    if found:
        return {"message":"User deleted"}
    else:
        return {"message":"User not found"}