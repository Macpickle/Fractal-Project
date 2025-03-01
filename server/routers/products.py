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
    data.update({"id":productDatabase.getDataSize() + 1})

    productDatabase.addData(data)
    return data

@router.delete("/products/{id}")
async def delete_product(id: int):
    found = productDatabase.deleteData({"id":id})
    
    if found:
        return {"message":"Product deleted"}
    else:
        return {"message":"Product not found"}