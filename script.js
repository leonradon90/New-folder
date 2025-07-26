
/* JavaScript for adding the OpenAI API key and get answers from OpenAI */

document.addEventListener('DOMContentLoaded', function(){

    // --- Navigation & Button Active State Logic ---
    const navLinks = document.querySelectorAll('a.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Set active class for naviation links

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');

        if((linkPath === 'index.html' || linkPath === '/') && (currentPath === '')){

        
          link.classList.add('active');            
        } else if(linkPath !== 'index.html' && linkPath !== '/' && linkPath === currentPath){ 
          link.classList.add('active');
        }
    });

        const ctaButtons = document.querySelectorAll('.explore-services');

        ctaButtons.forEach(button => {
            button.addEventListener('click', function(){
                ctaButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });

    const chatToggleButton = document.getElementById('chat-toggle-button');
    const chatWindow = document.getElementById('chat-window');
    const closeChatWindowButton = document.getElementById('close-chat-window-button');
    const chatIconOpen = document.getElementById('chat-icon-open');
    const chatIconClose = document.getElementById('chat-icon-close');

    const chatMessagesContainer = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSendButton = document.getElementById('chat-send-button');



    const OPENAI_API_KEY = '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';

    const OPEN_API_URL = 'https://api.openai.com/v1/chat/completions';
    const OPENAI_MODEL = 'gpt-3.5-turbo'

    let conversationHistory = [];
    
    function toggleChatWindow() {
        const isOpen = chatWindow.classList.toggle('open');
            if (isOpen) {
                chatIconOpen.style.display = 'none';
            
                chatIconClose.style.display = 'block';

                chatWindow.style.zIndex = '1001';

                if(chatMessagesContainer.children.length === 0 && conversationHistory.length === 0){
                    addMessageToChat('assistant', "Hello! How can I help you today using OpenAi?");
                } 
            }else {
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

                    if(isLoading) {
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
                        if(!userInput)
                            return;
                        
                        if (!OPENAI_API_KEY || OPENAI_API_KEY === 'you-api-key'){
                            addMessageToChat('assistant', "Please set your OpenAI API key in the script.js file.");
                            return;
                        }

                        addMessageToChat('user', userInput);
                        chatInput.value = '';

                        conversationHistory.push ({role: 'user', content: userInput});
                     const loadingMessageDiv =   addMessageToChat('assistant', '', true);

                        try {
                            const response = await fetch(OPEN_API_URL,
                                {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type':
                                        'application/json',

                                        'Authorization': `Bearer ${OPENAI_API_KEY}`
                                    },
                                    body:
                                    JSON.stringify({
                                        model: OPENAI_MODEL,

                                        messages: conversationHistory,
                                    }),
                                });

                                if(loadingMessageDiv){
                                    loadingMessageDiv.remove();
                                }
                                    if(!response.ok){
                                        const errorData = await response.json().catch(()=>({error:{ message: 'Filed to parse error from OpenAI API'}}));

                                        console.error('OpenAI API Error:', response.status,errorData);

                                        addMessageToChat('assistant', `Error: ${errorData.error?.message || 'Could not get a response from OpenAI.'}`);

                                        conversationHistory.pop();

                                        return;
                                    }

                                    const data = await response.json();
                                    if(data.choices && data.choices.length > 0 && data.choices[0].message)
                                    {
                                        const assistantResponse = data.choices[0].message.content;
                                        addMessageToChat('assistant', assistantResponse);
                                        conversationHistory.push({
                                            role:'assistant', content: assistantResponse });
                                    } else {
                                        addMessageToChat('assistant', 'Sorry, I received an unexpected resposne from OpenAI.');

                                    } 
                        } catch (error) {
                            console.error('Network or other error:', error);

                            const loadingMessageDiv = chatMessagesContainer.querySelector('.bot-message .loading-dots');
                            if (loadingMessageDiv && loadingMessageDiv.parentElement){
                                loadingMessageDiv.parentElement.remove();
                            }

                            addMessageToChat('assistant', 'Sorry, there was an issue connecting to OpenAI. Please check your connection or API key.');

                            conversationHistory.pop();
                        }
                        if(conversationHistory.length > 20) {
                            conversationHistory = conversationHistory.slice(-20);
                        }
                    }

                    if(chatToggleButton) {
                        chatToggleButton.addEventListener('click', toggleChatWindow);
                    }
                    if(closeChatWindowButton) {
                        closeChatWindowButton.addEventListener('click', toggleChatWindow);
                    }
                    if (chatSendButton && chatInput) {
                        chatSendButton.addEventListener('click', handleSendMessage);

                        chatInput.addEventListener('keypress', function(e) {
                            if(e.key === 'Enter'){
                                handleSendMessage();
                            }
                        });
                    }

                     
    
});
