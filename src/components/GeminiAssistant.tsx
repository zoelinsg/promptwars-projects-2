import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Mock Gemini Response for MVP
    setTimeout(() => {
      const lowerInput = userMessage.text.toLowerCase();
      let botResponse = "I'm a demo assistant. In a production environment, I would use the Gemini API to provide specific answers. For now, I recommend checking the FAQ section or the official election website for your state.";
      
      if ((lowerInput.includes('miss') || lowerInput.includes('missed')) && lowerInput.includes('registration deadline')) {
        botResponse = "If you miss the registration deadline, some states allow you to register and vote on the same day during early voting or on Election Day. Alternatively, you might be able to cast a provisional ballot. Always check your specific state's rules.";
      } else if (lowerInput.includes('registration deadline') || (lowerInput.includes('register') && lowerInput.includes('deadline'))) {
        botResponse = "The voter registration deadline is October 7, 2024. Make sure to register before then to participate in the general election.";
      } else if (lowerInput.includes('bring') || lowerInput.includes('what to bring')) {
        botResponse = "In most states, you should bring a valid, unexpired photo ID such as a driver's license or passport. If your state doesn't require a photo ID, a utility bill or bank statement might suffice.";
      } else if (lowerInput.includes('first-time') || lowerInput.includes('first time')) {
        botResponse = "As a first-time voter, your first step is to check your eligibility (U.S. citizen, 18+ by Election Day) and register to vote. Check the 'First-Time Voter' section of our app for a full guide!";
      } else if (lowerInput.includes('check') && (lowerInput.includes('status') || lowerInput.includes('registered'))) {
        botResponse = "You can check your voter registration status online through your state's official election website or at national sites like Vote.org. It usually only takes a few minutes using your name and date of birth.";
      } else if (lowerInput.includes('early voting')) {
        botResponse = "Early voting begins on October 22, 2024. In-person early voting will be available at select locations depending on your district.";
      } else if (lowerInput.includes('register') || lowerInput.includes('registration')) {
        botResponse = "To register to vote, you typically need to be a U.S. citizen, meet your state's residency requirements, and be 18 years old. Check the 'First-Time Voter' flow for step-by-step guidance!";
      } else if (lowerInput.includes('deadline') || lowerInput.includes('date')) {
        botResponse = "Key deadlines: Voter registration deadline (Oct 7), early voting starts (Oct 22), mail-in ballot request deadline (Oct 29), and Election Day (Nov 5).";
      } else if (lowerInput.includes('id') || lowerInput.includes('identification')) {
        botResponse = "Voter ID laws vary by state. About two-thirds of states require ID at the polls. It's safe to bring a valid photo ID like a driver's license.";
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 1500);
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
