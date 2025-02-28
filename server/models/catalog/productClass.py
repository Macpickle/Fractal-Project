#USED FOR INTERACTING WITH THE API
from productModel import *

class productClass:
    def __init__(self, brand, name, price, description, time):
        self.id = 0
        self.brand = brand
        self.name = name
        self.price = price
        self.description = description
        self.time = time

