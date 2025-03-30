from fastapi import APIRouter
from models.catalog.productModel import productItem
from datetime import datetime
from database.database import *
from fastapi import UploadFile

router = APIRouter()
productDatabase = database("database/productData.json")

@router.get("/products/")
async def read_products():
    return productDatabase.getData()

@router.get("/products/{id}")
async def read_product(id: int):
    return productDatabase.getData(id=id) or {"message":"Product not found"}

@router.post("/products/")
async def create_product(product: productItem):
    data = product.model_dump()
    data.update({"time":str(datetime.now())})
    data.update({"id":productDatabase.getDataSize() + 1})

    filter_data = [(item["make"], item["model"]) for item in productDatabase.data]
    if (data["make"], data["model"]) in filter_data:
        return {"ok": False, "message":"Product already exists"}

    success = productDatabase.addData(data)
    if not success:
        return {"ok": False, "message":"Product already exists"}

    return {"data": data, "ok": True}

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

@router.post("/products/upload")
async def upload_csv(file: UploadFile):
    # check file type
    if not file.content_type == "text/csv":
        return {"message":"Invalid file type", "ok": False}
    
    # read file
    contents = await file.read()
    contents = contents.decode("utf-8")
    contents = contents.split("\n")

    # get headers and data
    headers = contents[0].split(",")
    contents = contents[1:]

    # add data to database
    for content in contents:
        content = [item.strip() for item in content.split(",")]
        data = dict(zip(headers, content))
        data.update({"time":str(datetime.now())})
        data.update({"id":productDatabase.getDataSize() + 1})

        filter_data = [(item["make"], item["model"]) for item in productDatabase.data]
        if (data["make"], data["model"]) in filter_data:
            continue
        else:
            productDatabase.addData(data)
    # return the new items
    return {"ok": True, "message":"Products added"}
    