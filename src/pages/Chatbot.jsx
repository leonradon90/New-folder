import { useState, useEffect, useRef } from 'react';

export default function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestionPrompts = [
    "What services do you offer?",
    "Tell me about your pricing.",
    "How can AI help my business?",
    "Do you build custom software?"
  ];

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      setMessages([
        { role: 'assistant', text: 'Hello! How can I help you today?' }
      ]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSuggestionClick = (promptText) => {
    setInput(promptText);
    handleSendMessage(promptText);
  };

  const handleSendMessage = async (messageText = input) => {
    const userInput = messageText.trim();
    if (!userInput) return;

    setShowSuggestions(false);
    const newMessages = [...messages, { role: 'user', text: userInput }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/openai.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
      });

      setIsLoading(false);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error' }));
        setMessages([...newMessages, { 
          role: 'assistant', 
          text: `Error: ${errorData.error?.message || 'No response'}` 
        }]);
        return;
      }

      const data = await response.json();
      
      if (data.answer) {
        setMessages([...newMessages, { role: 'assistant', text: data.answer }]);
      } else {
        setMessages([...newMessages, { 
          role: 'assistant', 
          text: 'Sorry, no valid response from assistant.' 
        }]);
      }
    } catch (error) {
      setIsLoading(false);
      setMessages([...newMessages, { 
        role: 'assistant', 
        text: 'Error connecting to the server.' 
      }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div>
      <div className="chatbot-page-container">
        <h1 className="chatbot-page-title">AI Chatbot Assistant</h1>
        <p className="chatbot-page-description">
          Interact with our intelligent chatbot assistant. Ask questions, get information, 
          and see how AI can streamline business communication.
        </p>
        
        <div id="chat-window" className="chat-ai-fullscreen">
          <div className="chat-header">AI Chatbot</div>
          
          <div id="chat-messages" className="chat-container">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`chat-message ${message.role === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {message.text}
              </div>
            ))}
            
            {isLoading && (
              <div className="chat-message bot-message">
                <span className="loading-dots">
                  <span>•</span><span>•</span><span>•</span>
                </span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {showSuggestions && (
            <div className="chat-suggestions-container" id="chat-suggestions">
              {suggestionPrompts.map((prompt, index) => (
                <button
                  key={index}
                  className="chat-suggestion-chip"
                  onClick={() => handleSuggestionClick(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <div className="chat-input-area">
            <input 
              type="text" 
              id="chat-input" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message"
            />
            <button 
              id="chat-send-button"
              onClick={() => handleSendMessage()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      
      <footer>
        <p>© 2025 Lekronis. All rights reserved.</p>
      </footer>
    </div>
  );
}