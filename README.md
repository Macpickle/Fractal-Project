# Automotive Management System

CSCI 2040U - Software Design and Analysis

Allows users to manage a list of automotive vehicles and tools stored in a database.

**General Functionalities**:
- Database Interaction:
  - Read dataset from a simple database (such as a text or CSV file).
  - Save updates back to this database.
  - Sort and filter items by make, components, etc.
- Front-End Interface:
  - Display list of catalog items.
  - Allow administrator to view, add, edit/modify, and remove items.
- Back-End Logic:
  - Validate user inputs for adding or editing items.
  - Handle the interaction between the database and the front-end interface.
**Optional Functionalities**:
- User Login; add a basic login system where users must enter a username and password.
- Relevancy search (sort results by relevant keywords)

The goal is to create a functional application demonstrating these core features, with the potential to expand or refine it in future iterations.

**Data Flow**:
- Database (CSV file): Source of data.
- Back end: Logic for reading, editing, validating, and saving data.
- Front end: Displays the catalog and enables user interaction.
