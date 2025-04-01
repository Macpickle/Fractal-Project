from fastapi import APIRouter
from models.catalog.productModel import productItem
from datetime import datetime
from database.database import *
from fastapi import UploadFile

router = APIRouter()
productDatabase = database("database/productData.json")

@router.get("/products/")
async def read_products():
    """
    Retrieves all products from the database.

    Returns:
    list: A list of dictionaries representing the products.
    """
    return productDatabase.getData()

@router.get("/products/{id}")
async def read_product(id: int):
    """
    Retrieves a specific product from the database based on the provided ID.

    Parameters:
    id (int): The ID of the product to retrieve.

    Returns:
    dict: A dictionary representing the product if found, or a message indicating that the product was not found.
    """
    return productDatabase.getData(id=id) or {"message":"Product not found"}

@router.post("/products/")
async def create_product(product: productItem):
    """
    Creates a new product in the database.

    Parameters:
    product (productItem): An instance of the productItem class representing the new product.

    Returns:
    dict: A dictionary containing the created product data and a success message,
          or a dictionary containing a failure message if the product already exists.
    """
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
    """
    Deletes a specific product from the database based on the provided ID.

    Parameters:
    id (int): The ID of the product to delete.

    Returns:
    dict: A dictionary containing a success message if the product was deleted,
          or a message indicating that the product was not found.
    """
    found = productDatabase.deleteData({"id":id})
    
    if found:
        return {"message":"Product deleted"}
    else:
        return {"message":"Product not found"}
    
@router.put("/products/{id}")
async def update_product(id: int, product: productItem):
    """
    Updates a specific product in the database based on the provided ID.

    Parameters:
    id (int): The ID of the product to update.
    product (productItem): An instance of the productItem class representing the updated product.

    Returns:
    dict: A dictionary containing the updated product data and a success message,
          or a message indicating that the product was not found.
    """
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
    """
    Sorts the products in the database based on the provided sort type.

    Parameters:
    sort (dict): A dictionary containing the sort type.

    Returns:
    dict: A dictionary containing a success message if the products were sorted,
          or a message indicating that the sort type was invalid.
    """
    sort_type = sort.get("sort")
    if sort_type:
        return productDatabase.sortData(sort_type)
    else:
        return {"message": "Invalid sort type"}

@router.post("/products/upload")
async def upload_csv(file: UploadFile):
    """
    Uploads a CSV file containing product data and adds the products to the database.

    Parameters:
    file (UploadFile): The uploaded CSV file.

    Returns:
    dict: A dictionary containing a success message and the added products if the file was valid,
          or a failure message if the file was invalid or the products were not added.
    """
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
    