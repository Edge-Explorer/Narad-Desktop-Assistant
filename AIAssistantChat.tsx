import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    
    try {
      // Send message to backend
      const response = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: newMessage })
      });
      
      const data = await response.json();
      
      // Check for error
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }
      
      // Add AI response to chat
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: data.answer || 'Sorry, I couldn\'t process your request.',
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      // Add error message
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: `Sorry, there was an error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="ai-assistant">
      <div className="chat-header">
        <h3>AI Assistant</h3>
        <p>Ask me anything! I can help with information, suggestions, or help you use the agents.</p>
      </div>
      
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
            >
              <div className="message-content">
                <span className="message-text">{message.text}</span>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message ai-message">
            <div className="message-content">
              <span className="message-text typing">AI is typing<span>.</span><span>.</span><span>.</span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !newMessage.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};

export default AIAssistant;