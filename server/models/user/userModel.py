from pydantic import BaseModel

class userItem(BaseModel):
    user_name: str
    user_pass: str
