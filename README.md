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

# Setup Instructions
### Install Required Software
We used React and FastAPI for our techstack, so there is some required software. Please install the following onto your machine to run it:
- Node.JS
- Python

###  Clone the Repository
```
git clone https://github.com/Macpickle/Fractal-Project.git
```

###  Install Dependencies
We are using Concurrently, which means the whole site can be ran by a single command. Run the following in the root directory to install all dependencies:
```
npm install
```

### Run the Application
```
npm start
```

### Access the Application
The application runs off 2 ports, you can find them here:
- Frontend: http://localhost:3000/
- Backend: http://localhost:8000/

