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
    def getData(self):
        return self.data
    
    def getDataSize(self):
        return self.dataSize

    def getEntry(self,entry_name):
        if(self.dataSize == 0):
            return
        list = []
        for i in self.data:
            list.append(i[entry_name])
        return list
    
    def getUser(self,user):
        if(self.dataSize == 0):
            return {}
        for i in self.data:
            if(user == i['user_name']):
                return i

# ERROR CLASSES
from models.user.userModel import *

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