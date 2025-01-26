from fastapi import FastAPI, HTTPException
from models.userModel import *
from fastapi.middleware.cors import CORSMiddleware
from routers.users import router

app = FastAPI()

# origins to allow CORS
origins = [
    "http://localhost",
    "http://localhost:4000",
]

# allow app to recieve requests from the origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# add user specific routes
app.include_router(router)



