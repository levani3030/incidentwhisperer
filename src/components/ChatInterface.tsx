
import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, User, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import IncidentForm from './IncidentForm';

// Initial chat messages
const initialMessages = [
  {
    id: '1',
    sender: 'bot',
    content: 'Hello! I\'m your IT support assistant. How can I help you today?',
    timestamp: new Date(),
  },
  {
    id: '2',
    sender: 'bot',
    content: 'Would you like to report a new IT issue?',
    timestamp: new Date(),
  },
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Simulated bot responses
  const botResponses: Record<string, string[]> = {
    greeting: [
      "Hello! I'm here to help with your IT issues. Would you like to submit a new incident?",
      "Hi there! Need help with an IT problem? I can assist you with that.",
    ],
    issue: [
      "I understand you're experiencing an issue. Let's get that resolved. Would you like to submit a formal incident report?",
      "Sorry to hear you're having problems. I can help you submit an IT support request.",
    ],
    confirmation: [
      "Great! I'll guide you through the incident submission process.",
      "Perfect! Let's get your IT issue documented and resolved.",
    ],
    form: [
      "Please fill out the incident form with all the necessary details.",
      "I'll need some information to properly route your IT issue to the right team.",
    ],
    thanks: [
      "You're welcome! Your IT issue has been submitted. The IT team will be in touch soon.",
      "Happy to help! Your incident has been logged and our IT team will work on it promptly.",
    ],
    fallback: [
      "I'm not sure I understand. Would you like to submit an IT support incident?",
      "I'm here to help with IT issues. Would you like to report a problem?",
    ],
  };

  // Scroll to bottom of chat when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Function to add a new message
  const addMessage = (content: string, sender: 'user' | 'bot') => {
    const newId = (messages.length + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: newId,
        sender,
        content,
        timestamp: new Date(),
      },
    ]);
  };

  // Simulated bot thinking and response
  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);
    
    // Determine which type of response to use based on message content
    const lowerCaseMessage = userMessage.toLowerCase();
    let responseType: keyof typeof botResponses = 'fallback';
    
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
      responseType = 'greeting';
    } else if (lowerCaseMessage.includes('issue') || lowerCaseMessage.includes('problem') || lowerCaseMessage.includes('broken')) {
      responseType = 'issue';
    } else if (lowerCaseMessage.includes('yes') || lowerCaseMessage.includes('sure') || lowerCaseMessage.includes('ok')) {
      responseType = 'confirmation';
    } else if (lowerCaseMessage.includes('form') || lowerCaseMessage.includes('submit')) {
      responseType = 'form';
    } else if (lowerCaseMessage.includes('thanks') || lowerCaseMessage.includes('thank you')) {
      responseType = 'thanks';
    }
    
    // Get random response from the selected category
    const responses = botResponses[responseType];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Simulate typing delay (between 1-2 seconds)
    setTimeout(() => {
      addMessage(randomResponse, 'bot');
      setIsTyping(false);
      
      // If user has confirmed, show the form after a brief delay
      if (responseType === 'confirmation' || responseType === 'form') {
        setTimeout(() => {
          setShowForm(true);
        }, 500);
      }
    }, Math.random() * 1000 + 1000);
  };

  // Handle sending a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    addMessage(newMessage, 'user');
    setNewMessage('');
    
    // Simulate bot response
    simulateBotResponse(newMessage);
  };

  // Handle form submission success
  const handleFormSubmitSuccess = () => {
    setShowForm(false);
    
    // Add success message from bot
    setTimeout(() => {
      addMessage("Your incident has been successfully submitted! The IT team will contact you soon.", 'bot');
      
      toast({
        title: "Incident Submitted",
        description: "Your IT support request has been recorded.",
      });
    }, 500);
  };

  // Handle form cancellation
  const handleFormCancel = () => {
    setShowForm(false);
    
    // Add message from bot
    setTimeout(() => {
      addMessage("No problem. Is there anything else I can help you with?", 'bot');
    }, 500);
  };

  // Handle quick response buttons
  const handleQuickResponse = (response: string) => {
    addMessage(response, 'user');
    
    if (response.toLowerCase().includes('yes')) {
      simulateBotResponse('yes');
    } else {
      simulateBotResponse(response);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto glass-panel h-[600px] flex flex-col">
      {/* Chat header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-medical-blue flex items-center justify-center">
            <Bot size={20} className="text-medical-accent" />
          </div>
          <div>
            <h3 className="font-medium">IT Support Assistant</h3>
            <p className="text-xs text-muted-foreground">
              {isTyping ? 'Typing...' : 'Online'}
            </p>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {showForm ? (
          <div className="py-4">
            <IncidentForm 
              onSubmitSuccess={handleFormSubmitSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex items-start max-w-[80%] ${
                      message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <Bot size={18} className="mr-2 mt-1 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs text-muted-foreground mt-1 block">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    {message.sender === 'user' && (
                      <User size={18} className="ml-2 mt-1 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="chat-bubble-bot">
                    <div className="flex items-center space-x-2">
                      <Bot size={18} />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-medical-accent/60 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-medical-accent/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-medical-accent/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Scrolling anchor */}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Quick response buttons (if not too many messages yet) */}
            {messages.length < 5 && (
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => handleQuickResponse("Yes, I'd like to report an IT issue")}
                  className="btn-secondary text-sm py-2"
                >
                  Report IT Issue
                </button>
                <button
                  onClick={() => handleQuickResponse("What can you help me with?")}
                  className="btn-secondary text-sm py-2"
                >
                  More Info
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Chat input */}
      {!showForm && (
        <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="input-field"
              disabled={isTyping}
            />
            <button
              type="submit"
              className={`btn-accent px-4 flex items-center justify-center ${
                !newMessage.trim() || isTyping ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!newMessage.trim() || isTyping}
            >
              {isTyping ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChatInterface;
