document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const messageContainer = document.getElementById('message-container');
    const personalitySelect = document.getElementById('personality');
    const partnerName = document.getElementById('partner-name');
    const partnerDescription = document.getElementById('partner-description');
    const kaynPersonality = document.getElementById('kayn-personality');
    const formSelect = document.getElementById('form');

    // Update partner name and description based on personality selection
    personalitySelect.addEventListener('change', () => {
        const personality = personalitySelect.value;
        const newName = personality.charAt(0).toUpperCase() + personality.slice(1);
        kaynPersonality.textContent = `${newName}`;
    });

    formSelect.addEventListener('change', () => {
        const form = formSelect.value;
        const newForm = form
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        partnerName.textContent = `${newForm}`;

        if (form === 'kayn') {
            partnerDescription.textContent = "Just a zesty guy.";
        } else if (form === 'shadow-assassin') {
            partnerDescription.textContent = "Still zesty, but at least he's a champ.";
        } else if (form === 'rhaast') {
            partnerDescription.textContent = "Alpha as heck.";
        }

        // Update theme based on form selection
        const body = document.body;
        // Remove both theme classes first to avoid conflicts
        body.classList.remove('crimson-red-theme', 'ocean-blue-theme');
        if (form === 'shadow-assassin') {
            body.classList.add('ocean-blue-theme');
        } else if (form === 'rhaast') {
            body.classList.add('crimson-red-theme');
        }

        // Update avatar image based on form selection
        const avatarImg = document.querySelector('#avatar-bg img');
        if (avatarImg) {
            if (form === 'kayn') {
                avatarImg.src = 'static/imgs/default_kayn.jpg';
            } else if (form === 'shadow-assassin') {
                avatarImg.src = 'static/imgs/shadow_assassin.jpg';
            } else if (form === 'rhaast') {
                avatarImg.src = 'static/imgs/rhaast.jpg';
            }
        }

        // Update avatar container background gradient/color
        const avatarBg = document.getElementById('avatar-bg');
        if (avatarBg) {
            if (form === 'kayn') {
                avatarBg.style.background = "linear-gradient(to right, #3b82f6 50%, #ef4444 50%)";
            } else if (form === 'shadow-assassin') {
                avatarBg.style.background = "#5c9affff"; // Fully blue
            } else if (form === 'rhaast') {
                avatarBg.style.background = "#ff0000ff"; // Fully red
            }
        }
    });

    const chatHistory = []; // Track chat history

    // Handle sending a message
    const sendMessage = async () => {
        const userMessageText = chatInput.value.trim();
        if (userMessageText === "") return;

        // Add user message to the chat
        const userMsgDiv = document.createElement('div');
        userMsgDiv.textContent = userMessageText;
        userMsgDiv.classList.add('chat-message', 'user-message');
        messageContainer.prepend(userMsgDiv);

        // Add to chat history
        chatHistory.push({ role: "user", text: userMessageText });

        chatInput.value = '';

        // Show loading indicator
        const aiMsgDiv = document.createElement('div');
        aiMsgDiv.textContent = "Thinking...";
        aiMsgDiv.classList.add('chat-message', 'ai-message');
        messageContainer.prepend(aiMsgDiv);

        // Prepare system instruction
        const systemInstruction = `You are Kayn from league of legends currently in the form ${formSelect.value}, responding in a ${personalitySelect.value} manner.`;

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: userMessageText,
                    instruction: systemInstruction,
                    history: chatHistory
                })
            });
            const data = await response.json();
            aiMsgDiv.textContent = data.response || "No response from AI.";

            // Add AI response to chat history
            chatHistory.push({ role: "ai", text: data.response });
        } catch (error) {
            aiMsgDiv.textContent = "Error: Could not reach AI backend.";
        }
    };

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
