document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation & Button Active State Logic ---
    const navLinks = document.querySelectorAll('a.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (linkPath === 'index.html' && currentPath === '')) {
            link.classList.add('active');
        }
    });

    const ctaButtons = document.querySelectorAll('.explore-services');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            ctaButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- Chatbot Logic ---
    const chatToggleButton = document.getElementById('chat-toggle-button');
    const chatWindow = document.getElementById('chat-window');
    const closeChatWindowButton = document.getElementById('close-chat-window-button');
    const chatIconOpen = document.getElementById('chat-icon-open');
    const chatIconClose = document.getElementById('chat-icon-close');
    const chatMessagesContainer = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSendButton = document.getElementById('chat-send-button');
    const chatSuggestionsContainer = document.getElementById('chat-suggestions');

    // YOUR OpenAI API key and Assistant ID — replace these with your actual values
    const OPENAI_API_KEY = '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';
    const ASSISTANT_ID = 'asst_kK39U12s2342yrSKsUO8y7GQ';

    const OPENAI_ASSISTANTS_URL = `https://api.openai.com/v1/assistants/${ASSISTANT_ID}/responses`;

    let conversationHistory = [];

    const suggestionPrompts = [
        "What services do you offer?",
        "Tell me about your pricing.",
        "How can AI help my business?",
        "Do you build custom software?"
    ];

    function displaySuggestions() {
        if (!chatSuggestionsContainer) return;
        chatSuggestionsContainer.innerHTML = '';
        suggestionPrompts.forEach(promptText => {
            const button = document.createElement('button');
            button.classList.add('chat-suggestion-chip');
            button.textContent = promptText;
            button.addEventListener('click', () => {
                chatInput.value = promptText;
                handleSendMessage();
            });
            chatSuggestionsContainer.appendChild(button);
        });
        chatSuggestionsContainer.style.display = 'flex';  // show suggestions
    }

    function hideSuggestions() {
        if (chatSuggestionsContainer) {
            chatSuggestionsContainer.style.display = 'none';
        }
    }

    function toggleChatWindow() {
        const isOpen = chatWindow.classList.toggle('open');
        if (isOpen) {
            chatIconOpen.style.display = 'none';
            chatIconClose.style.display = 'block';
            chatWindow.style.zIndex = '1001';
            if (chatMessagesContainer.children.length === 0 && conversationHistory.length === 0) {
                addMessageToChat('assistant', "Hello! How can I help you today?");
                displaySuggestions();
            }
        } else {
            chatIconOpen.style.display = 'block';
            chatIconClose.style.display = 'none';
            chatWindow.style.zIndex = '999';
        }
    }

    function addMessageToChat(role, text, isLoading = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        const roleClass = role.toLowerCase() === 'user' ? 'user-message' : 'bot-message';
        messageDiv.classList.add(role.toLowerCase() === 'assistant' ? 'bot-message' : roleClass);

        if (isLoading) {
            const loaderSpan = document.createElement('span');
            loaderSpan.classList.add('loading-dots');
            loaderSpan.innerHTML = '<span>&bullet;</span><span>&bullet;</span><span>&bullet;</span>';
            messageDiv.appendChild(loaderSpan);
        } else {
            messageDiv.textContent = text;
        }

        chatMessagesContainer.appendChild(messageDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        return messageDiv;
    }

    async function handleSendMessage() {
        const userInput = chatInput.value.trim();
        if (!userInput) return;

        hideSuggestions();

        addMessageToChat('user', userInput);
        chatInput.value = '';

        const loadingMessageDiv = addMessageToChat('assistant', '', true);

        try {
            const response = await fetch('/openai.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userInput })
            });

            if (loadingMessageDiv) loadingMessageDiv.remove();

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: { message: 'Failed to parse error' } }));
                addMessageToChat('assistant', `Error: ${errorData.error?.message || 'No response'}`);
                return;
            }

            const data = await response.json();
            console.log('API response:', data);
            if (data.answer) {
                addMessageToChat('assistant', data.answer);
            } else {
                addMessageToChat('assistant', 'Sorry, no valid response from assistant.');
            }
        } catch (error) {
            if (loadingMessageDiv) loadingMessageDiv.remove();
            addMessageToChat('assistant', 'Error connecting to the server.');
        }
    }

    if (window.location.pathname.split('/').pop() === 'chatbot.html') {
        if (chatMessagesContainer && chatMessagesContainer.children.length === 0 && conversationHistory.length === 0) {
            addMessageToChat('assistant', "Hello! How can I help you today?");
            displaySuggestions();
        }
    }

    if (chatToggleButton) {
        chatToggleButton.addEventListener('click', toggleChatWindow);
    }
    if (closeChatWindowButton) {
        closeChatWindowButton.addEventListener('click', toggleChatWindow);
    }
    if (chatSendButton && chatInput) {
        chatSendButton.addEventListener('click', handleSendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
    }
});
