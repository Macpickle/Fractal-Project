# Fractal Catalogue System
A simple, easy-to-use catalog management system for managing a list of items stored in a JSON database. It allows users to view, add, edit, remove, and search for items. The catalog also supports sorting by various attributes such as brand, price, and time added.

# Features
- View Catalog: Displays a list of items from the JSON database.
- Add Items: Allows users to add new items to the catalog.
- Edit Items: Modify existing item details (e.g., brand, description, stock).
- Remove Items: Delete items from the catalog.
- Save Updates: Changes persist in the JSON database.
- Sort Catalog: Sort items by brand, price, or time added.
- Search Functionality: Search items based on relevance.

# Technologies Used
[![Technologies](https://skillicons.dev/icons?i=react,js,bootstrap,html,css,python,fastapi)](https://skillicons.dev)

# How to Run
### 1. Start by cloning the repository to your local machine:
```
git clone https://github.com/Macpickle/Fractal-Project.git <project-name>
cd <project-name>
npm install
```

### 2. Set Up the Server (Backend)
Make sure you have [Python](https://www.python.org/downloads/) and [Uvicorn](https://www.uvicorn.org/) installed on your machine.
Navigate to the server directory and install the necessary dependencies:
```
cd server
./run.bat
```

### 3. Set Up the Client (Frontend)
Navigate to the client directory and install the necessary dependencies
```
cd ../client
./run.bat
```

### 4. Start the Application
Once both the server and client are set up, you can start the application in the root of the directory:
```
cd ..
./start.bat
```

## Alternative Running
To run on your local machine without needing to install all the dependencies, we created a executable to run on any `windows` machine. The link to this can be found [here](https://drive.google.com/file/d/1JbKIR2R9KPJMFcNO1Nf1kEV-g6R7Ce2M/view?usp=sharing). Simply download this, extract it, then run the main.exe executable. Then, access http://localhost:8000 in any browser.

We also packaged it into a live website. You can access it [here](https://fractal-project.vercel.app/). Please note, this website may take a few minutes to startup, as the backend is a bit slow.

A demo video was created to show all the functionallity if you wish to not downlaod anything, the link can be found [here](https://drive.google.com/file/d/1cfn6dSI-4A9kzxVDyLtxmcx_TGLzoLly/view?usp=drive_link).
