from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import json
import os

# Gmail API scopes needed
SCOPES = ['https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/gmail.compose']

def generate_credentials():
    # Path to your downloaded client secrets file
    CLIENT_SECRETS_FILE = 'client_secret.json'  # Rename to match your downloaded file
    
    # Create the flow using the client secrets file
    flow = InstalledAppFlow.from_client_secrets_file(
        CLIENT_SECRETS_FILE, 
        SCOPES,
        redirect_uri='http://localhost:3001/',
    )
    
    # Run the OAuth flow to get credentials
    credentials = flow.run_local_server(
        port=3001,
        success_message='The authentication flow has completed. You may close this window.',
        open_browser=True
    )
    
    # Save the credentials to a file
    creds_data = {
        'token': credentials.token,
        'refresh_token': credentials.refresh_token,
        'token_uri': credentials.token_uri,
        'client_id': credentials.client_id,
        'client_secret': credentials.client_secret,
        'scopes': credentials.scopes
    }
    
    with open('user_credentials.json', 'w') as f:
        json.dump(creds_data, f)
    
    print("Credentials successfully saved to user_credentials.json")

if __name__ == '__main__':
    generate_credentials()