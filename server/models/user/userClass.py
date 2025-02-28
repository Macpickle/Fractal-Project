#USED FOR INTERACTING WITH THE API
from server.models.user.userModel import *

class userClass:
    def __init__(self,user_name,user_pass):
        self.user_name = user_name
        self.user_pass = user_pass
