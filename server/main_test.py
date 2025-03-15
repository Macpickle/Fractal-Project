from fastapi.testclient import TestClient
from main import app  # Adjust import based on your project structure
from fastapi import APIRouter

client = TestClient(app)

def test_read_product():
    response = client.get("/products/1") 
    print(response.json())  
    assert response.json() == [
  {
    "brand": "Pagani",
    "name": "Zonda F",
    "price": 9899.23,
    "description": "awesome",
    "time": "2025-03-09 17:44:43.976918",
    "id": 0
  },
  {
    "brand": "Lambo",
    "name": "Lambo2",
    "price": 3242934429.23,
    "description": "awesome",
    "time": "2025-03-09 17:44:43.976918",
    "id": 0
  }
]
    


