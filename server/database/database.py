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
    def getData(self, id=None, username=None):
        if id is not None:
            for i in self.data:
                if i["id"] == id:
                    return i
            return None
        
        if username is not None:
            for i in self.data:
                if i["username"] == username:
                    return i
            return None
        
        return self.data
    
    def getDatabyID(self, id):
        for i in self.data:
            if i["id"] == id:
                return i
        return None
    
    
    # Function adds a dictionary entry to the database
    def addData(self, entry):
        filter_data = [(item["make"], item["model"]) for item in self.data]

        if (entry["make"], entry["model"]) in filter_data:
            return False
        
        self.data.append(entry)
        self.dataSize += 1
        write_data_to_db(self.data, self.filename)
        return True
    
    # Function modifies a dictionary entry in the database
    def modifyData(self, entry):
        for i in self.data:
            if i["id"] == entry["id"]:
                i.update(entry)
                write_data_to_db(self.data, self.filename)
                return True
            
        return False
    
    # Function deletes a dictionary entry from the database
    def deleteData(self, entry):
        for i in self.data:
            if i["id"] == entry["id"]:
                self.data.remove(i)
                self.dataSize -= 1
                write_data_to_db(self.data, self.filename)
                return True
            
        return False    

    # Function to sort data by id
    def sortData(self,id):
        data = self.getData()
        data.sort(key=lambda x: x[id])
        write_data_to_db(data, self.filename)
        return True

    #takes in parameter and type
    def filterData(self, filter, type):
        data = self.getData()
        filteredData = []
        dataSize =self.getDataSize()
        for x in range(dataSize):
            if(data[x][filter] == type):
                filteredData.append(data[x])
        return filteredData

    
    def getDataSize(self):
        return self.dataSize
    
    

