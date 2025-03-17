import unittest
from database.database import database

sampleDatabase = database("database/productData.json")

class TestDatabaseMethods(unittest.TestCase):
    def setUp(self):
        self.sampleData = {
            "id": 0,
            "make": "test_make",
            "model": "test_model",
            "price": 0.0,
            "description": "test_description",
            "quantity": 0,
            "color": "test_color",
            "carType": "test_type"
        }

    def test_getData(self):
        self.assertEqual(sampleDatabase.getData(), sampleDatabase.data)

    def test_addData(self):
        sampleDatabase.addData(self.sampleData)
        self.assertEqual(sampleDatabase.getDatabyID(0), self.sampleData)

    def test_modifyData(self):
        self.sampleData["make"] = "test_make_updated"
        sampleDatabase.modifyData(self.sampleData)
        if sampleDatabase.getDatabyID(0) is not None:
            self.assertEqual(sampleDatabase.getDatabyID(0)["make"], "test_make_updated")
        
    def test_deleteData(self):  
        sampleDatabase.deleteData(self.sampleData)
        self.assertNotIn(self.sampleData, sampleDatabase.getData())

    def test_getDataSize(self):
        self.assertEqual(sampleDatabase.getDataSize(), len(sampleDatabase.getData()))