# Kayn.AI - League of Legends AI Dating Simulator 💙❤️

An AI-powered chatbot dating simulator featuring Kayn from League of Legends. Chat with Kayn in his three different forms (Base Kayn, Shadow Assassin, and Rhaast) with customizable personalities powered by Google's Gemini AI.

## 🌟 Features

- **Three Character Forms**: Switch between Base Kayn, Shadow Assassin (blue theme), and Rhaast (red theme)
- **Dynamic Personalities**: Choose from 5 different personality types:
  - Joyful
  - Depressed
  - Nonchalant
  - Possessive
  - Intimate
- **AI-Powered Conversations**: Powered by Google's Gemini 2.5 Flash model for natural, context-aware responses
- **Beautiful UI**: Modern, responsive design with dynamic theming based on selected form
- **Persistent Chat History**: Maintains conversation context throughout your session
- **Real-time Responses**: Fast, streaming responses from the AI

## 🖼️ Screenshots

The application features a split-screen interface:
- **Left Panel**: Character customization sidebar with avatar, form selection, and personality options
- **Right Panel**: Chat interface with message history and input field

Dynamic themes change based on the selected form:
- **Base Kayn**: Split blue/red gradient theme
- **Shadow Assassin**: Ocean blue theme
- **Rhaast**: Crimson red theme

## 🛠️ Technology Stack

### Backend
- **FastAPI**: Modern Python web framework for building the API
- **Google Gemini AI**: Latest generative AI model (gemini-2.5-flash)
- **Uvicorn**: ASGI server for running the FastAPI application
- **Pydantic**: Data validation and settings management

### Frontend
- **HTML5**: Semantic markup structure
- **TailwindCSS**: Utility-first CSS framework for styling
- **Vanilla JavaScript**: Client-side interactivity and API communication
- **Custom CSS**: Additional styling for themes and animations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8 or higher
- pip (Python package installer)
- A Google AI API key (get one from [Google AI Studio](https://aistudio.google.com/app/apikey))

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bunz42/Kayn-AI.git
   cd Kayn-AI
   ```

2. **Navigate to the application directory**
   ```bash
   cd jgl_ai/ai-gf
   ```

3. **Install Python dependencies**
   ```bash
   pip install fastapi uvicorn google-generativeai pydantic
   ```

   Or if you have a requirements.txt file:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up your Google Gemini API key**
   
   The application uses the Google Gemini API. You need to set up your API key as an environment variable:

   **On Linux/Mac:**
   ```bash
   export GEMINI_API_KEY='your-api-key-here'
   ```

   **On Windows (Command Prompt):**
   ```cmd
   set GEMINI_API_KEY=your-api-key-here
   ```

   **On Windows (PowerShell):**
   ```powershell
   $env:GEMINI_API_KEY='your-api-key-here'
   ```

## 🎮 Usage

1. **Start the application**
   ```bash
   python app.py
   ```

   The server will start on `http://0.0.0.0:8000`

2. **Open your web browser**
   Navigate to `http://localhost:8000`

3. **Customize your character**
   - Select a form (Kayn, Shadow Assassin, or Rhaast)
   - Choose a personality type
   - Watch the theme and avatar change dynamically

4. **Start chatting**
   - Type your message in the input field at the bottom
   - Press Enter or click the send button
   - Wait for Kayn to respond based on his selected form and personality

## 📁 Project Structure

```
Kayn-AI/
├── README.md
└── jgl_ai/
    └── ai-gf/
        ├── app.py              # FastAPI backend server
        ├── index.html          # Main HTML structure
        ├── script.js           # Frontend JavaScript logic
        ├── styles.css          # Custom CSS styles and themes
        └── imgs/               # Character images
            ├── default_kayn.jpg
            ├── shadow_assassin.jpg
            └── rhaast.jpg
```

## 🔧 How It Works

### Backend Flow
1. **FastAPI Server**: The `app.py` file creates a FastAPI server that serves the HTML UI and handles chat requests
2. **Chat Endpoint**: The `/chat` endpoint receives user messages along with personality and form preferences
3. **Gemini Integration**: Messages are sent to Google's Gemini API with:
   - System instructions defining the character's form and personality
   - Full chat history for context
   - User's current message
4. **Response Handling**: AI responses are sent back to the frontend and displayed in the chat

### Frontend Flow
1. **UI Initialization**: JavaScript loads and sets up event listeners
2. **Form/Personality Selection**: Changes update the UI theme and avatar image
3. **Message Sending**: User input is captured and sent to the backend via POST request
4. **Response Display**: AI responses are appended to the chat history and displayed
5. **History Management**: Conversation context is maintained client-side

### System Instructions
The AI receives dynamic system instructions like:
```
You are Kayn from league of legends currently in the form {form}, 
responding in a {personality} manner.
```

This ensures the AI responds appropriately based on your selections.

## 🎨 Customization Options

### Forms
- **Kayn**: The base form with balanced characteristics
- **Shadow Assassin**: The blue-tinted, agile assassin form
- **Rhaast**: The red-tinted, darkin warrior form

### Personalities
- **Joyful**: Upbeat and cheerful responses
- **Depressed**: Melancholic and introspective
- **Nonchalant**: Cool and indifferent attitude
- **Possessive**: Intense and protective
- **Intimate**: Romantic and affectionate

### Currently Working On
- Adding more personality types
- Implementing user authentication for saving preferences
- Adding AI voice
- Creating additional League of Legends jungler options
- Improving mobile responsiveness
- Adding conversation export functionality

## ⚠️ Troubleshooting

### "Gemini Client is not initialized" Error
- Make sure you've set the `GEMINI_API_KEY` environment variable
- Verify your API key is valid and active
- Check that you have internet connectivity

### Server won't start
- Ensure all dependencies are installed: `pip install fastapi uvicorn google-generativeai pydantic`
- Check if port 8000 is already in use
- Try running with a different port: modify the `uvicorn.run()` line in `app.py`

### AI responses are slow or timeout
- This is normal for the first request as the model initializes
- Subsequent requests should be faster
- Check your internet connection speed

## 📝 License

This project is created for entertainment and educational purposes. League of Legends and Kayn are trademarks of Riot Games.

## 🙏 Acknowledgments

- **Riot Games**: For creating League of Legends and the character Kayn
- **Google**: For the Gemini AI API
- **FastAPI**: For the excellent web framework
- **TailwindCSS**: For the utility-first CSS framework
- All contributors and users of this project
---

**Disclaimer**: This is a fan-made project and is not affiliated with or endorsed by Riot Games. Created for fun and learning purposes. I'm sorry (but not really).
