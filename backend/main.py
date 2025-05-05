from fastapi import FastAPI
from pydantic import BaseModel, UUID4
import subprocess

subprocess.run("""figlet -f big L u m a r i | sed 's/^/\x1b[38;5;61m/'""", shell=True)

app = FastAPI()

@app.get("/fetch_profile")
async def read_root():
    return {"message": "Hello, World!"}


@app.post("/send_email_message")
async def read_root_2():
    return {"message": "Hello, World!"}


@app.post("/send_linkedin_message")
async def read_root_4():
    return {"message": "Hello, World!"}

@app.post("/generate")
async def read_root_3():
    print("Generating...")
    return {"message": "Hello, World!"}