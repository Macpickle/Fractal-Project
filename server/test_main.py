from main import app
from fastapi.testclient import TestClient
from datetime import datetime
from database.test_database import *

# create test client
client = TestClient(app)

# sample database
products = client.get("/products").json()
users = client.get("/users").json()

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

# sample user
sampleUser = {
    "username": "test_user",
    "password": "test_password",
}

'''
TEST PRODUCTS
'''

# test get all products
def test_read_products():
    response = client.get("/products")
    assert response.status_code == 200
    assert response.json() == products

# test create product
def test_create_product():
    response = client.post("/products/", json=sampleProduct)
    assert response.status_code == 200
    assert response.json()["ok"] == True
    for key in sampleProduct:
        assert response.json()["data"][key] == sampleProduct[key]


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

'''
TEST USER
'''

# test get all users
def test_get_users():
    response = client.get("/users/")
    assert response.status_code == 200
    assert response.json() != None
        
# test create user
def test_create_user():
    response = client.post("/users/register", json=sampleUser)
    assert response.status_code == 200
    assert response.json()["ok"] == True
    assert response.json()["message"] == "User created"

def test_create_user_already_exists():
    response = client.post("/users/register", json=sampleUser)
    assert response.status_code == 200
    assert response.json()["ok"] == False
    assert response.json()["message"] == "User already exists"

def test_login_user():
    response = client.post("/users/login", json=sampleUser)
    assert response.status_code == 200
    assert response.json()["ok"] == True
    assert response.json()["message"] == "Login successful"

def test_login_user_not_found():
    response = client.post("/users/login", json={"username": "non_existent_user", "password": "test_password"})
    assert response.status_code == 200
    assert response.json()["ok"] == False
    assert response.json()["message"] == "User not found"

def test_delete_user():
    response = client.delete(f"/users/{len(users)+1}")
    assert response.status_code == 200
    assert response.json()["message"] == "User deleted"
    
# should not change database content at the end