import { useState } from "react";
import robotWhite from "../assets/robot-white.svg";
import cross from "../assets/cross.svg";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([
    "What services do you offer?",
    "Contact support",
    "Pricing",
  ]);

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { type: "user", text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Clear all suggestions when a message is sent
    setSuggestions([]);

    // Fake bot reply
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { type: "bot", text: "This is a demo bot reply." },
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="chatbot-page-container">
      <h1 className="chatbot-page-title">AI Chatbot Assistant</h1>
      <p className="chatbot-page-description">
        Interact with our intelligent chatbot assistant. Ask questions, get information, and see how AI can streamline business communication.
      </p>

      <div id="chat-window" className="chat-ai-fullscreen">
        <div className="chat-header">AI Chatbot</div>

        {/* Messages */}
        <div id="chat-messages" className="chat-container">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-message ${msg.type === "user" ? "user-message" : "bot-message"}`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="chat-message bot-message">
              <div className="loading-dots">
                <span>•</span>
                <span>•</span>
                <span>•</span>
              </div>
            </div>
          )}
        </div>

        {/* Input area + suggestions */}
        <div className="chat-input-wrapper">
          {/* Suggestions just above input */}
          {suggestions.length > 0 && (
            <div className="chat-suggestions-container" id="chat-suggestions">
              {suggestions.map((s, idx) => (
                <div
                  key={idx}
                  className="chat-suggestion-chip"
                  onClick={() => handleSend(s)}
                >
                  {s}
                </div>
              ))}
            </div>
          )}

          <div className="chat-input-area">
            <input
              type="text"
              id="chat-input"
              placeholder="Type your message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button id="chat-send-button" onClick={() => handleSend()}>
              Send
            </button>
          </div>
        </div>
      </div>
             <footer>
        <p>© 2025 Lekronis. All rights reserved.</p>
        <button id="chat-toggle-button" className="chat-toggle">
          <img id="chat-icon-open" src={robotWhite} alt="chat open" hidden />
          <img id="chat-icon-close" src={cross} alt="chat close" hidden />
        </button>
        {/* Chatbot will later be handled with React state/hooks */}
      </footer>
    </div>
  );
}
