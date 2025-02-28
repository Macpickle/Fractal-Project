from fastapi import APIRouter
from models.catalog.productModel import productItem
from datetime import datetime
from database.database import *

router = APIRouter()
productDatabase = database("database/productData.json")

@router.get("/products/")
async def read_products():
    return productDatabase.getData()

@router.post("/products/")
async def create_product(product: productItem):
    data = product.dict()
    data.update({"time":str(datetime.now())})

    productDatabase.addData(data)
    return data