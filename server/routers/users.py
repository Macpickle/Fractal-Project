from fastapi import APIRouter
from models.user.userModel import userItem
from database.database import *

router = APIRouter()
userDatabase = database("database/userData.json")

# Route to get all users
@router.get("/users/")
async def read_users():
    """
    Retrieves all users from the database.

    Returns:
    list: A list of dictionaries representing the users.
    """
    return userDatabase.getData()

# Route to register user
@router.post("/users/register")
async def users_register(user: userItem):
    """
    Registers a new user in the database.

    Parameters:
    user (userItem): An instance of the userItem class representing the new user.

    Returns:
    dict: A dictionary containing a success message and the created user data if the user was created,
          or a failure message if the user already exists.
    """
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
    """
    Authenticates a user by verifying their username and password.

    Parameters:
    user (userItem): An instance of the userItem class representing the user attempting to log in.

    Returns:
    dict: A dictionary containing a success message and the logged-in user data if the login is successful,
          or a failure message if the user was not found or the password was incorrect.
    """ 
    foundUser = userDatabase.getData(username=user.username) 
    
    if foundUser is None:
        return {"message": "User not found", "ok": False}
    
    if foundUser["password"] == user.password:
        return {"message": "Login successful", "ok": True}
    
    return {"message": "Incorrect password", "ok": False}
    
# Route to delete user
@router.delete("/users/{id}")
async def delete_user(id: int):
    """
    Deletes a specific user from the database based on the provided ID.

    Parameters:
    id (int): The ID of the user to delete.

    Returns:
    dict: A dictionary containing a success message if the user was deleted,
          or a message indicating that the user was not found.
    """
    print(f"Deleting user with ID: {id}")
    found = userDatabase.deleteData({"id":id})
    
    if found:
        return {"message":"User deleted"}
    else:
        return {"message":"User not found"}