from typing import Optional
from pydantic import BaseModel
import json

# Example JSON database file
DATABASE_FILE = "userData.json"

class userItem(BaseModel):
    user_name: str
    user_pass: str
    user_email: str
    

# Helper function to read data from the JSON database
def read_data_from_db():
    try:
        with open(DATABASE_FILE, "r") as file:
            data = json.load(file)
    except FileNotFoundError:
        data = []
    return data

# Helper function to write data to the JSON database
def write_data_to_db(data):
    try:
        with open(DATABASE_FILE, "w") as file:
            json.dump(data, file, indent=2)
    except FileNotFoundError:
        print("Error")
    return 




# Extras For CLI interaction:

