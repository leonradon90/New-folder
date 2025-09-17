import {Link} from "react-router-dom";

export default function Chatbot () { 
return (
    <div>
         <div class="chatbot-page-container">
            <h1 class="chatbot-page-title">AI Chatbot Assistant</h1>
            <p class="chatbot-page-description">Interact with our intelligent chatbot assistant. Ask questions, get information, and see how AI can streamline business communication.</p>
            <div id="chat-window" class="chat-ai-fullscreen">
                <div class="chat-header">Ai Chatbot</div>
                <div id="chat-messages" class="chat-container">
                </div>
                <div class="chat-suggestions-container" id="chat-suggestions">

                </div>

                <div class="chat-input-area">
                    <input type="text" id="chat-input" placeholder="Type your message"/>
                    <button id="chat-send-button">Send</button>
                </div>
            </div>
        </div>
        <footer><p>© 2025 Lekronis. All rights reserved.</p></footer>
    </div>
);
}