import os
import json
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import uvicorn
from google.genai import Client
from google.genai import types # Corrected import line 

# Class to act as the data model for chats to the AI.
class ChatMessage(BaseModel):
    # This is how the data will be sent to the API
    prompt: str
    instruction: str
    history: list

# Initialize FastAPI app
app = FastAPI()

# Serve static files like imgs from the directory "imgs"
app.mount("/static", StaticFiles(directory="."), name="static")

try:
    # Initialize Gemini Client with API key from environment variable
    client = Client()
    print("Gemini Client initialized successfully.")
except Exception as e:
    print(f"Error initializing Gemini Client: {e}")
    client = None

@app.get("/", response_class=HTMLResponse)
async def serve_UI():
    """Serve the UI HTML file."""
    try:
        with open("index.html", "r") as file:
            return file.read()
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="UI file not found.")
    
@app.post("/chat")
async def chat_endpoint(data: ChatMessage):
    """Handles the chat request, calls the Gemini API, and returns the response."""
    
    if client is None:
        raise HTTPException(
            status_code=500, 
            detail="Gemini Client is not initialized. Check your GEMINI_API_KEY."
        )

    try:
        chat_history = data.history
        user_prompt = data.prompt
        system_instruction = data.instruction
        
        # 1. Convert chat history into the required Gemini format (types.Content)
        contents = []
        for message in chat_history:
            role = message.get("role")
            text = message.get("text", "")
            
            # Map roles: 'ai' -> 'model', 'user' -> 'user'
            gemini_role = "model" if role == "ai" else "user"
            
            contents.append(
                types.Content(
                    role=gemini_role,
                    # FIX: Use types.Part directly with the 'text' keyword argument
                    parts=[types.Part(text=text)] 
                )
            )

        # 2. Append the current user prompt
        contents.append(
            types.Content(
                role="user",
                # FIX: Use types.Part directly with the 'text' keyword argument
                parts=[types.Part(text=user_prompt)] 
            )
        )

        # 3. Configure the model (including the System Instruction)
        config = types.GenerateContentConfig(
            system_instruction=system_instruction
        )
        
        # 4. Call the Gemini API
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=contents,
            config=config
        )

        # 5. Return the response text
        return {"response": response.text}

    except Exception as e:
        print(f"API Error: {e}")
        # Return a 500 status code with a descriptive error message
        raise HTTPException(
            status_code=500,
            detail=f"Error processing chat request. Please check API key and network connection. Details: {e}"
        )

# --- Server Startup ---

if __name__ == "__main__":
    # Ensure uvicorn is running the app object
    # The default port 8000 is used for uvicorn run
    uvicorn.run(app, host="0.0.0.0", port=8000)
