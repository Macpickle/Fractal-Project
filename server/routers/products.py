from fastapi import APIRouter
from models.catalog.productModel import productItem
from datetime import datetime
from database.database import *

router = APIRouter()
productDatabase = database("database/productData.json")

@router.get("/products/")
async def read_products():
    return productDatabase.getData()

@router.get("/products/{id}")
async def read_product(id: int):
    return productDatabase.getData(id)

@router.post("/products/")
async def create_product(product: productItem):
    data = product.model_dump()
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
    
@router.put("/products/{id}")
async def update_product(id: int, product: productItem):
    data = product.model_dump()
    data.update({"time":str(datetime.now())})
    data.update({"id":id})

    found = productDatabase.modifyData(data)

    if found:
        return {"message":"Product updated", "data":data}
    else:
        return {"message":"Product not found"}
    
@router.post("/products/sort")
async def update_Sort(sort: dict):
    sort_type = sort.get("sort")
    if sort_type:
        return productDatabase.sortData(sort_type)
    else:
        return {"message": "Invalid sort type"}
