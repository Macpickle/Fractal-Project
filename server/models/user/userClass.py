#USED FOR INTERACTING WITH THE API
from userModel import *

class userClass:
    def __init__(self,username,password):
        """
        Initializes a new instance of the userClass.

        Parameters:
        username (str): The username of the user.
        password (str): The password of the user.
        """
        self.username = username
        self.password = password
