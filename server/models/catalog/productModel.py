from pydantic import BaseModel

class productItem(BaseModel):
    make: str | None = None
    model: str | None = None
    price: float | None = 0.0
    description: str | None = None
    time: str | None = None
    quantity: int | None = 0
    color: str | None = None
    carType: str | None = None