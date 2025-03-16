
# Catalog Management System

CSCI 2040U - Software Design and Analysis

A simple catalog management system that allows users to manage a list of items stored in a JSON database.

**Completed Features (MVP)**
- View Catalog: Display a list of catalog items from a JSON database.
- Add Items: Users can add new items to the catalog.
- Edit Items: Modify existing item details (e.g, brand, description, stock).
- Remove Items: Delete items from the catalog.
- Save Updates: Changes persist in the JSON database.

**In-progress Features**
- Sort Catalog, Users can sort items by:
    - Brand
    - Price
    - Time Added

- Search Functionality 
    - Users can search for products by relevance.

# How to run - BUILD
These running instructions are specific to the build branch, for Windows systems to allow new developers to run our application. Please follow the steps to begin the application:

### Clone the Repository
```
git clone https://github.com/Macpickle/Fractal-Project.git <project name>
cd <project name>
```

## Setup
We are using React and Fast.api as our techstack, so please install and run the following commands on your machine to set up the server

### Download dependencies for server
Please install [Python](https://www.python.org/downloads/) & [Uvicorn](https://www.uvicorn.org/) to your local machine if it hasn't been installed already
```
cd server
./run.bat
```

### Download dependencies for client
Please install [Node.JS](https://nodejs.org/en) to your local machine if it hasn't been installed already
```
cd ../client
./run.bat
```

## Running the application
The application should be ready to load, please run and wait to start the application:
```
cd ..
./start.bat
```



