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


    def addToDatabase(self):
        items = read_data_from_db()
        print(items)
        data = {
            "make": self.make,
            "model":self.model,
            "year":self.year,
            "price":self.price,
            "color":self.color,
            "mileage":self.mileage,
            "description":self.description
            }
        items.append(data)
        print(items)
        write_data_to_db(items)

    def checkFor(self, items):
        for i in range(len(items)):
            if (items[i]["make"] == self.make and items[i]["model"] == self.model):
                return i
            
        return -1

    def updateProduct(self):
        items = read_data_from_db()
        index = self.checkFor(items)

        if (index >= 0):
            data = {
                "make": self.make,
                "model":self.model,
                "year":self.year,
                "price":self.price,
                "color":self.color,
                "mileage":self.mileage,
                "description":self.description
            }

        items[index] = data
        write_data_to_db(items)


