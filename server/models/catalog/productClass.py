#USED FOR INTERACTING WITH THE API
from productModel import *

class productClass:
    def __init__(self,make,model,year,price,color,mileage,description):
        self.make = make
        self.model = model
        self.year = year
        self.price = price
        self.color = color
        self.mileage = mileage
        self.description = description

