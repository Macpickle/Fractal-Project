from fastapi import APIRouter
from models.user.userModel import *
from database.database import *

router = APIRouter()
userDatabase = database("database/userData.json")

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
@router.post("/users/")
async def users_register(user: userItem):
    userNameList = userDatabase.getEntry("user_name")
    if(user.user_name.lower() in [name.lower() for name in userNameList]):
        return {"message": "User name already in use"}
    else:
        items = userDatabase.getData()
        items.append(user.model_dump())
        write_data_to_db(data=items,filename=userDatabase.filename)
        print(f'Added user {user.user_name}')
        return {"message": "Account registered"}

@router.post("/users/")
async def users_login(user: userItem):
    userDict = userDatabase.getUser() 
    if(len(userDict) == 0):
        return {"message": "Invalid username"}
    else:
        if(user.user_pass == userDict['user_pass']):
            return {"message": "Login success"}
        
    return {"message": "Login fail"}


    