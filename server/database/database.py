import json

def read_data_from_db(filename):
    try:
        with open(filename, "r") as file:
            data = json.load(file)
    except FileNotFoundError:
        print(f"Error reading {filename}")
        return []
    return data

def write_data_to_db(data,filename):
    try:
        with open(filename, "w") as file:
            json.dump(data, file, indent=2)
    except FileNotFoundError:
        print(f"Error writing to {filename}")
        return False
    return True

class database:
    def __init__(self, filename):
        self.filename = filename
        self.data = read_data_from_db(self.filename)
        self.dataSize = len(self.data)

    # Function returns a list of dictionary entries
    def getData(self, id=None):
        if id:
            for i in self.data:
                if i["id"] == id:
                    return i
        return self.data
    
    # Function adds a dictionary entry to the database
    def addData(self, entry):
        self.data.append(entry)
        self.dataSize += 1
        write_data_to_db(self.data, self.filename)
        return True
    
    # Function deletes a dictionary entry from the database
    def deleteData(self, entry):
        for i in self.data:
            if i["id"] == entry["id"]:
                self.data.remove(i)
                self.dataSize -= 1
                write_data_to_db(self.data, self.filename)
                return True
            
        return False    
    
    # Function modifies a dictionary entry in the database
    def modifyData(self, entry):
        for i in self.data:
            if i["id"] == entry["id"]:
                i.update(entry)
                write_data_to_db(self.data, self.filename)
                return True
            
        return False

    def getDataSize(self):
        return self.dataSize

# ERROR CLASSES
from ..models.user.userModel import *

class InvalidUsername(Exception):
    def __init__(self,user_name):
        self.user_name = user_name
        self.message = f'Username {user_name} is not valid (Duplicate)'
        super().__init__(self.message)
        
class LoginSuccess(Exception):
    def __init__(self, user: userItem):
        self.user_name = user.user_name
        self.message = f'Success login {self.user_name}'
        super().__init__(self.message)

class LoginFail(Exception):
    def __init__(self, user: userItem):
        self.user_name = user.user_name
        self.message = f'Failed login {self.user_name}'
        super().__init__(self.message)