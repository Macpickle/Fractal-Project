from fastapi import FastAPI, HTTPException
from models.user.userModel import *
from fastapi.middleware.cors import CORSMiddleware
from routers.users import router as userRouter
from routers.products import router as productRouter

app = FastAPI()

# origins to allow CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
]

# allow app to recieve requests from the origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(productRouter)