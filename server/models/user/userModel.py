from typing import Optional
from pydantic import BaseModel
import json


class userItem(BaseModel):
    username: str
    password: str
    email: str
    




# Extras For CLI interaction:

