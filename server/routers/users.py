from fastapi import APIRouter, HTTPException
from models.user.userModel import *
from models.database.database import *

import os
from fastapi import Request
print(os.getcwd())  # Shows your current working directory

router = APIRouter()
userDatabase = database("userData.json")



# file contains basic routes for user retrieval, creation and deletion
# add more routes, and get user data here

# Create a route to get all users
@router.get("/users/")
async def read_users():
    return userDatabase.getData()

# Create a index route
@router.get("/")
def index():
    return {"result": "Hello World"}

# BELOW PUTS IT ON THE API http://127.0.0.1:8000/items/

# Create a route to create items
@router.post("/register/")
async def users_register(request: Request):
    user = await request.json() # await for json
    username = user['username']
    password = user['password']
    email = user['email']

    userDataUsername = userDatabase.getUser(username, "username") # search through database trying to find username

    # if user is found, send error
    if userDataUsername:
        return HTTPException(status_code=404, detail="Username or Email is already in use")
    
    userDataEmail = userDatabase.getUser(email, "email") # search through database trying to find email

    # if user is found, send error
    if userDataEmail:
        return HTTPException(status_code=404, detail="Username or Email is already in use")

    # success
    user = {
        "username": username,
        "password": password,
        "email": email,
        "role": "user"
    }

    items = userDatabase.getData()
    items.append(user)

    write_data_to_db(items, userDatabase.filename) # write to database
    return {"detail": "Registration Successful", "user": {"username": username, "role": "user"}}
    
# route to login users, takes in JSON data email and password
@router.post("/login/")
async def users_login(request: Request):
    user = await request.json() # await for json 
    email = user['email']
    password = user['password']
    userData = userDatabase.getUser(email, "email") # call getUser in database

    if userData is None:
        return HTTPException(status_code=404, detail="Invalid email or password")
        
    if userData['password'] != password:
        return HTTPException(status_code=401, detail="Invalid email or password")
    
    return {"detail": "Login Successful", "user": {"username": userData['username'], "role": userData['role']}}


    



