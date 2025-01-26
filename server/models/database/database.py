import json

def read_data_from_db(filename):
    try:
        with open(filename, "r") as file:
            data = json.load(file)
    except FileNotFoundError:
        print(f'{filename} not found, database.py')
        data = []
    return data

class database:
    def __init__(self,filename):
        self.filename = filename
        self.data = read_data_from_db(filename)
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
    
 






