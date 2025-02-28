from pydantic import BaseModel

class productItem(BaseModel):
    brand: str | None = None
    name: str | None = None
    price: float | None = None
    description: str | None = None
    time: str | None = None