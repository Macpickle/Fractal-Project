from pydantic import BaseModel

class userItem(BaseModel):
    username: str | None = ""
    password: str | None = ""
