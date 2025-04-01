#USED FOR INTERACTING WITH THE API
from productModel import *

# Product class to represent a product in the catalog.
class productClass:
    def __init__(self, make, model, price, description, time, quantity, color, carType):
        """
        Initializes a new instance of the productClass.

        Parameters:
        make (str): The make of the product.
        model (str): The model of the product.
        price (float): The price of the product.
        description (str): The description of the product.
        time (str): The time when the product was added to the catalog.
        quantity (int): The quantity of the product available.
        color (str): The color of the product.
        carType (str): The type of car the product is suitable for.
        """
        self.id = 0
        self.make = make
        self.model = model
        self.price = price
        self.description = description
        self.time = time
        self.quantity = quantity
        self.color = color
        self.carType = carType

