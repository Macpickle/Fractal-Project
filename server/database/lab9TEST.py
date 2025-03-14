import database as db
sampleDatabase = db.database("productData.json")
sampleDatabase.getData()

print(sampleDatabase.getData())

sampleDatabase.sortData("model")
print("\n")
print(sampleDatabase.getData())
sampleDatabase.sortData("price")
print(sampleDatabase.getData())

