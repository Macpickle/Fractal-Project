from fastapi import APIRouter
from models.catalog.productModel import *
from database.database import *

router = APIRouter()
productDatabase = database("database/productData.json")

@router.get("/products/")
async def read_products():
    return productDatabase.getData()