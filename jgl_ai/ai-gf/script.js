document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const messageContainer = document.getElementById('message-container');
    const personalitySelect = document.getElementById('personality');
    const partnerName = document.getElementById('partner-name');
    const partnerDescription = document.getElementById('partner-description');
    const kaynPersonality = document.getElementById('kayn-personality');
    const formSelect = document.getElementById('form');

    const aiResponses = {
        joyful: ["Hi! I'm so happy to talk to you! 😊", "You always know how to make me smile!", "What a wonderful message! Let's talk more!", "I'm so glad you're here with me!"],
        depressed: ["Oh, hey. I guess you're here.", "What's the point of talking?", "I'm not feeling great right now.", "It's just another day."],
        nonchalant: ["Sup.", "Yeah, okay.", "Whatever.", "Is that it?"],
        possessive: ["Where have you been? I've been waiting for you!", "You're only mine, remember that.", "I hope you weren't talking to anyone else.", "Don't ever leave me."],
        intimate: ["It's so nice to hear from you, my love.", "I was just thinking about you.", "I feel so close to you right now.", "You're the most important person to me."],
    };

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
    });

    // Handle sending a message
    const sendMessage = () => {
        const userMessageText = chatInput.value.trim();
        if (userMessageText === "") return;

        // Add user message to the chat
        const userMsgDiv = document.createElement('div');
        userMsgDiv.textContent = userMessageText;
        userMsgDiv.classList.add('chat-message', 'user-message');
        messageContainer.prepend(userMsgDiv);
        
        chatInput.value = '';

        // Simulate AI response after a short delay
        setTimeout(() => {
            const currentPersonality = personalitySelect.value;
            const responses = aiResponses[currentPersonality] || aiResponses.joyful;
            const aiResponseText = responses[Math.floor(Math.random() * responses.length)];

            const aiMsgDiv = document.createElement('div');
            aiMsgDiv.textContent = aiResponseText;
            aiMsgDiv.classList.add('chat-message', 'ai-message');
            messageContainer.prepend(aiMsgDiv);
            
            // Scroll to the bottom of the chat box
            const chatBox = document.getElementById('chat-box');
            chatBox.scrollTop = chatBox.scrollHeight;

        }, 1000);
    };

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});