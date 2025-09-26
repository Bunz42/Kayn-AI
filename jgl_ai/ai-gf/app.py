import os
import json
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import uvicorn

# Gemini SDK Imports
from google.genai import Client
from google.genai import types

# Class to act as the data model for chats to the AI.
class ChatMessage(BaseModel):
    prompt: str
    instruction: str
    history: str # History variable 

# Initialize FastAPI app
app = FastAPI()

try:
    # Initialize Gemini Client with API key from environment variable
    client = Client()
    model = client.get_model("gemini-2.5-flash-lite")
    print("Gemini Client initialized successfully.")
except Exception as e:
    print(f"Error initializing Gemini Client: {e}")
    model = None
