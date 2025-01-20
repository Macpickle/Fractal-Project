# Catalog Management System

CSCI 2040U - Software Design and Analysis

Allows users to manage a list of items stored in a database.

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

The goal is to create a functional prototype demonstrating these core features, with the potential to expand or refine it in future iterations.

**Data Flow**:
- Database (CSV file): Source of data.
- Back end: Logic for reading, editing, validating, and saving data.
- Front end: Displays the catalog and enables user interaction.

**To-Do**:
Add back-end functionality to:
- Edit existing items (e.g., update fields like name or description).
- Add new items (prompt user for inputs, validate them).
- Validate inputs (e.g., check for non-empty fields).
- Write logic to save any updates back to the original database file. 
- Stretch Goal: User Login; add a basic login system where users must enter a username and password.
