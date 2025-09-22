import { useState } from "react";



export default function Chatbot() {
    
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([
    "What services do you offer?",
    "Contact support",
    "Pricing",
  ]);

  const toggleChat = () => setIsOpen(!isOpen);

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
    <>
      {/* Toggle button */}
      <button className="chat-toggle" onClick={toggleChat}>
        {isOpen ? <span className="chat-icon-close"></span> : <span className="chat-icon-open"></span>}
      </button>

      {/* Chat window */}
      <div className={`chat-ai ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
          Chat with us
          <button className="chat-min" onClick={toggleChat}>
            <span className="chat-icon-close"></span>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-container">
          {messages.map((msg, i) => (
            <div
              key={i}
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
            <div className="chat-suggestions-container">
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
              id="chat-input"
              type="text"
              value={input}
              placeholder="Type a message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button id="chat-send-button" onClick={() => handleSend()}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
