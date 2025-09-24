import { useState } from "react";
import robotWhite from "../assets/robot-white.svg";
import cross from "../assets/cross.svg";


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

    setSuggestions([]);

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
        <img 
          src={isOpen ? cross : robotWhite}
          alt={isOpen ? "Close chat" : "Open chat"}
          style={{
            width: '26px',
            height: '26px',
            display: 'block',
          }}
        />
      </button>

      {/* Chat window */}
      <div className={`chat-ai ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
          AI Chatbot
          <button className="chat-min" onClick={toggleChat}>
            {/* Replace the span with a simple × symbol or use the cross image */}
            ×
            {/* OR use: <img src={cross} alt="close" style={{width: '16px', height: '16px'}} /> */}
          </button>
        </div>

        {/* Messages */}
        <div className="chat-container">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-message ${
                msg.type === "user" ? "user-message" : "bot-message"
              }`}
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