#USED FOR INTERACTING WITH THE API
from userModel import *


class userClass:
    def __init__(self,user_name,user_pass):
        self.user_name = user_name
        self.user_pass = user_pass
        
    def addToDatabase(self):
        items = read_data_from_db()
        print(items)
        data = {"user_name": self.user_name,"user_pass":self.user_pass}
        items.append(data)
        print(items)
        write_data_to_db(items)
