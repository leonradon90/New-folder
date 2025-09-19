import { useState } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { type: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Fake bot reply
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { type: "bot", text: "This is a demo bot reply." },
      ]);
      setLoading(false);
    }, 1200);
  };

  const suggestions = ["What services do you offer?", "Contact support", "Pricing"];

  return (
    <>
      {/* Toggle button */}
      <button className="chat-toggle" onClick={toggleChat}>
        {isOpen ? <span className="chat-icon-close"></span> : <span className="chat-icon-open"></span>}
      </button>

      {/* Floating chat window */}
      <div className={`chat-ai ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
          Chat with us
          <button className="chat-min" onClick={toggleChat}>
            <span className="chat-icon-close"></span>
          </button>
        </div>

        {/* Suggestions */}
        <div className="chat-suggestions-container">
          {suggestions.map((s, idx) => (
            <div
              key={idx}
              className="chat-suggestion-chip"
              onClick={() => setInput(s)}
            >
              {s}
            </div>
          ))}
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

        {/* Input area (fixed at bottom) */}
        <div className="chat-input-area">
          <input
            id="chat-input"
            type="text"
            value={input}
            placeholder="Type a message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button id="chat-send-button" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}
