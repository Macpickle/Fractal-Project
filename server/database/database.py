import json
import os

# Helper functions for reading and writing data to/from a JSON file
def read_data_from_db(filename):
    """
    Reads data from a JSON file.

    Parameters:
    filename (str): The name of the JSON file to read from.

    Returns:
    list: A list of dictionaries representing the data in the JSON file.
    """
    try:
        with open(filename, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Error reading {filename}")
        return []

def write_data_to_db(data,filename):
    """
    Writes data to a JSON file.

    Parameters:
    data (list): A list of dictionaries representing the data to write to the JSON file.
    filename (str): The name of the JSON file to write to.

    Returns:
    bool: True if the data was successfully written to the JSON file, False otherwise.
    """
    try:
        with open(filename, "w") as file:
            json.dump(data, file, indent=4)
    except FileNotFoundError:
        print(f"Error writing to {filename}")
        return False
    return True


# Database class representing a simple JSON-based database
class database:
    def __init__(self, filename):
        """
        Initializes the database object.

        Parameters:
        filename (str): The name of the JSON file to use as the database.
        """
        self.filename = filename
        self.data = read_data_from_db(self.filename)
        self.dataSize = len(self.data)

    def getData(self, id=None, username=None):
        """
        Retrieves data from the database based on the provided ID or username.

        Parameters:
        id (int, optional): The ID of the data entry to retrieve.
        username (str, optional): The username of the data entry to retrieve.

        Returns:
        dict or list: A dictionary representing the data entry if an ID or username is provided,
                      a list of all data entries if no ID or username is provided.
        """
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
        """
        Retrieves data from the database based on the provided ID.

        Parameters:
        id (int): The ID of the data entry to retrieve.

        Returns:
        dict: A dictionary representing the data entry if an ID is provided.
        """
        for i in self.data:
            if i["id"] == id:
                return i
        return None

    def addData(self, entry):
        """
        Adds a new data entry to the database.

        Parameters:
        entry (dict): A dictionary representing the new data entry to add.

        Returns:
        bool: True if the data entry was successfully added, False otherwise.
        """
        self.data.append(entry)
        self.dataSize += 1
        write_data_to_db(self.data, self.filename)
        return True
    
    def modifyData(self, entry):
        """
        Modifies an existing data entry in the database.

        Parameters:
        entry (dict): A dictionary representing the updated data entry.

        Returns:
        bool: True if the data entry was successfully modified, False otherwise.
        """
        for i in self.data:
            if i["id"] == entry["id"]:
                i.update(entry)
                write_data_to_db(self.data, self.filename)
                return True
            
        return False
    
    def deleteData(self, entry):
        """
        Deletes a data entry from the database.

        Parameters:
        entry (dict): A dictionary representing the data entry to delete.

        Returns:
        bool: True if the data entry was successfully deleted, False otherwise.
        """
        for i in self.data:
            if i["id"] == entry["id"]:
                self.data.remove(i)
                self.dataSize -= 1
                write_data_to_db(self.data, self.filename)
                return True
            
        return False    

    def sortData(self,id):
        """
        Sorts the data entries in the database based on the provided ID.

        Parameters:
        id (str): The key to sort the data entries by.

        Returns:
        bool: True if the data entries were successfully sorted, False otherwise.
        """
        data = self.getData()
        data.sort(key=lambda x: x[id])
        write_data_to_db(data, self.filename)
        return True

    def filterData(self, filter, type):
        """
        Filters the data entries in the database based on the provided filter and type.

        Parameters:
        filter (str): The key to filter the data entries by.
        type (any): The value to filter the data entries by.

        Returns:
        list: A list of dictionaries representing the filtered data entries.
        """
        data = self.getData()
        filteredData = []
        dataSize =self.getDataSize()
        for x in range(dataSize):
            if(data[x][filter] == type):
                filteredData.append(data[x])
        return filteredData

    
    def getDataSize(self):
        """
        Retrieves the number of data entries in the database.

        Returns:
        int: The number of data entries in the database.
        """
        return self.dataSize
    
    

