from main import app
from fastapi.testclient import TestClient
from datetime import datetime
from database.test_database import *

# create test client
client = TestClient(app)

# sample database
products = client.get("/products").json()

# sample test product
sampleProduct = {
    "make": "test_make",
    "model": "test_model",
    "color": "test_color",
    "carType": "test_carType",
    "price": 0.0,
    "description": "test_description",
    "quantity": 0,
}

# test get all products
def test_read_products():
    response = client.get("/products")
    assert response.status_code == 200
    assert response.json() == products

# test create product
def test_create_product():
    response = client.post("/products/", json=sampleProduct)
    assert response.status_code == 200
    for key in sampleProduct:
        assert response.json()[key] == sampleProduct[key]

# test read product by ID
def test_read_product():
    response = client.get(f"/products/{len(products)}")
    assert response.status_code == 200
    assert response.json() != None

# test update product
def test_update_product():
    sampleProduct["make"] = "test_make_updated"
    response = client.put(f"/products/{len(products)+1}", json=sampleProduct)
    
    assert response.status_code == 200
    assert response.json()["message"] == "Product updated"
    for key in sampleProduct:
        assert response.json()["data"][key] == sampleProduct[key]

# test delete product
def test_delete_product():
    response = client.delete(f"/products/{len(products)+1}")
    assert response.status_code == 200

# should not change database content at the end