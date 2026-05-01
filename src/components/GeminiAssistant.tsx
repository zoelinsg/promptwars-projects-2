import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { vertexAI, isFirebaseConfigured } from '../firebase';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hi! I'm your VoteReady assistant. I can help explain election steps, deadlines, and requirements. How can I help you today?", sender: 'bot' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current && typeof messagesEndRef.current.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      if (!isFirebaseConfigured || !vertexAI) {
        throw new Error('Firebase is not configured.');
      }

      const { getGenerativeModel } = await import('firebase/ai');
      
      const model = getGenerativeModel(vertexAI, {
        model: 'gemini-2.5-flash-lite',
        systemInstruction: "You are VoteReady Assistant, a helpful, polite guide for election process education. Your purpose is to help users understand voting steps, key election dates, registration requirements, what to bring on election day, how to check registration status, and early voting basics. Do NOT answer questions about unrelated topics. If a user asks something unrelated to elections or voting, politely decline and steer them back to voting preparation. IMPORTANT: Provide careful, state-aware guidance. Avoid absolute legal or procedural claims, as rules vary by state. Use phrases like 'In many states...', 'Rules vary by state...', or 'Some states may allow exceptions...'. Always advise users to check their official state election website for current rules. Keep responses concise, practical, and easy to understand. You must ONLY output plain text. Do NOT use any Markdown formatting, symbols, or special characters such as **, *, #, or backticks. Format your answers clearly using short paragraphs. For lists, use simple numbered steps like '1. 2. 3.' or use a simple hyphen '-' for bullets only if necessary.",
      });

      // Format previous messages for context
      const history = messages
        // Skip the initial hardcoded greeting if needed, or map it. Gemini requires alternating user/model turns, 
        // starting with 'user'. Since our first message is 'bot', we can either skip it or just pass the latest query.
        // For simplicity and to avoid invalid history errors, we'll just send the latest query with context of the immediate conversation.
        .filter(m => m.id !== '1') // skip the initial bot greeting to avoid role sequence errors
        .map(msg => ({
          role: (msg.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
          parts: [{ text: msg.text }]
        }));

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(userMessage.text);
      const botResponse = result.response.text();

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      let errorMessage = "I am currently unable to connect to my AI systems. For immediate help, please check the FAQ section or the official election website for your state.";
      
      // Preserve fallback behavior only for true misconfiguration or runtime failure, but expose the error message
      // so the user knows if it's a configuration issue (e.g., API not enabled, invalid model, invalid provider).
      const e = error as { message?: string };
      if (e && e.message) {
        errorMessage = `I am currently unable to connect to my AI systems. Error: ${e.message}`;
      }

      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        text: errorMessage, 
        sender: 'bot' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-window ${!isOpen ? 'hidden' : ''}`}>
        <div className="chatbot-header">
          <div className="flex items-center gap-1">
            <Bot size={20} />
            <h3>VoteReady Assistant</h3>
          </div>
          <button className="btn-icon" style={{ color: 'white' }} onClick={() => setIsOpen(false)} aria-label="Close chat">
            <X size={20} />
          </button>
        </div>
        
        <div className="chatbot-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-bubble ${msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}`}>
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="chat-bubble chat-bubble-bot">
              <span className="typing-indicator">...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            aria-label="Chat input"
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem' }} disabled={isTyping || !input.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>

      <button 
        className={`chatbot-toggle ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat assistant"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
};
