from pydantic import BaseModel

class productItem(BaseModel):
    brand: str | None = None
    name: str | None = None
    price: float | None = 0.0
    description: str | None = None
    time: str | None = None