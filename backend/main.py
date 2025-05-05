from fastapi import FastAPI
from pydantic import BaseModel, UUID4

app = FastAPI()

@app.get("/fetch_profile")
async def read_root():
    return {"message": "Hello, World!"}


@app.post("/send_email_message")
async def read_root():
    return {"message": "Hello, World!"}
