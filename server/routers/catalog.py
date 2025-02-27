from fastapi import APIRouter
from models.database.database import *

import os
print(os.getcwd())  # Shows your current working directory

router = APIRouter()
path = "./catalogDB.json"
DB = database(path)

@router.get("/catalog")
async def getCatalog():
    return {
        "catalog": DB.getData()
    }