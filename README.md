# Catalog Management System

CSCI 2040U - Software Design and Analysis

A simple catalog management system that allows users to manage a list of items stored in a CSV database.



**Completed Features (MVP)**
View Catalog – Display a list of catalog items from a CSV database.
Add Items – Users can add new items to the catalog.
Edit Items – Modify existing item details (e.g,name,description,stock).
Remove Items – Delete items from the catalog.
Save Updates – Changes persist in the CSV database.


**In-progress Features**
 Sort Catalog  
 Users can sort items by
 -Brand
 -Price
 -Time Added
Search Functionality 
-Users can search for products by relevance.

**Setup Instructions**
1. Install Required Software
-Ensure you have Node.js and Python installed.
-Download Node.js
-Download Python

2. Clone the Repository:
 -git clone https://github.com/Macpickle/Fractal-Project.git

3. Install Dependencies
Since we use concurrently, dependencies must be installed in the frontend:
-npm install

4. Run the Application:
-npm start

5. Access the Application
Frontend: http://localhost:3000/
Backend: http://localhost:8000/

**General Functionalities**:
- Database Interaction:
  - Read an initial dataset from a simple database (such as a text or CSV file).
  - Save updates back to this database.
- Front-End Interface:
  - Display a list of catalog items.
  - Allow users to view, add, and edit items.
- Back-End Logic:
  - Validate user inputs for adding or editing items.
  - Handle the interaction between the database and the front-end interface.
- User Login; add a basic login system where users must enter a username and password.

The goal is to create a functional prototype demonstrating these core features, with the potential to expand or refine it in future iterations.

**Data Flow**:
- Database (CSV file): Source of data.
- Back end: Logic for reading, editing, validating, and saving data.
- Front end: Displays the catalog and enables user interaction.

**To-Do**:
Add back-end functionality to:
- Edit existing items (e.g., update fields like name, description or stock).
- Add new items (prompt user for inputs, validate them).
- Validate inputs (e.g., check for non-empty fields).
- Write logic to save any updates back to the original database file. 
