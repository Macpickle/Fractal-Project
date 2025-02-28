from pydantic import BaseModel

class productItem(BaseModel):
    make: str
    model: str
    year: str
    price: str
    color: str
    mileage: str
    description: str
