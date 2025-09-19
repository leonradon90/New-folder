export default function ChatbotPage() {
  return (
    <div className="chatbot-page-container">
      <h1 className="chatbot-page-title">AI Chatbot Assistant</h1>
      <p className="chatbot-page-description">
        Interact with our intelligent chatbot assistant. Ask questions, get information, and see how AI can streamline business communication.
      </p>

      <div id="chat-window" className="chat-ai-fullscreen">
        <div className="chat-header">Ai Chatbot</div>
        <div id="chat-messages" className="chat-container"></div>
        <div className="chat-suggestions-container" id="chat-suggestions"></div>

        <div className="chat-input-area">
          <input type="text" id="chat-input" placeholder="Type your message" />
          <button id="chat-send-button">Send</button>
        </div>
      </div>
    </div>
  );
}
