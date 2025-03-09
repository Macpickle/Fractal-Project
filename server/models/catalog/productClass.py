#USED FOR INTERACTING WITH THE API
from productModel import *

class productClass:
    def __init__(self, make, model, price, description, time, quantity):
        self.id = 0
        self.make = make
        self.model = model
        self.price = price
        self.description = description
        self.time = time
        self.quantity = quantity

