from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, UUID4, EmailStr
import subprocess
import os
import base64
from email.message import EmailMessage
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
import json
from typing import Dict, Any, Optional

subprocess.run("""figlet -f big L u m a r i | sed 's/^/\x1b[38;5;61m/'""", shell=True)

app = FastAPI()

# Define credential storage path
CREDENTIALS_FILE = "user_credentials.json"

class EmailRequest(BaseModel):
    recipient: EmailStr
    subject: str
    body: str

async def get_google_credentials() -> Dict[str, Any]:
    """Get stored Google credentials or raise an error if not found."""
    try:
        if os.path.exists(CREDENTIALS_FILE):
            with open(CREDENTIALS_FILE, "r") as f:
                return json.load(f)
        else:
            raise HTTPException(
                status_code=401, 
                detail="No Google credentials found. Please authenticate first."
            )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Error retrieving credentials: {str(e)}"
        )

async def send_gmail_message(to: str, subject: str, body: str):
    """Send an email directly through Gmail API."""
    try:
        credentials = await get_google_credentials()
        
        # Create Gmail service
        creds = Credentials.from_authorized_user_info(credentials)
        service = build('gmail', 'v1', credentials=creds)

        # Create message
        message = EmailMessage()
        message.set_content(body)
        message["To"] = to
        message["Subject"] = subject

        # Encode message
        encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

        # Send message
        sent_message = service.users().messages().send(
            userId="me",
            body={"raw": encoded_message}
        ).execute()

        return sent_message
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")

@app.get("/fetch_profile")
async def read_root():
    return {"message": "Hello, World!"}

@app.post("/send_email_message")
async def send_email(email_data: EmailRequest):
    """Endpoint to send an email using Gmail."""
    return await send_gmail_message(
        to="samlamba12@gmail.com",
        subject=email_data.subject,
        body=email_data.body
    )

@app.post("/send_linkedin_message")
async def read_root_4():
    return {"message": "Hello, World!"}

@app.post("/generate")
async def read_root_3():
    print("Generating...")
    return {"message": "Hello, World!"}