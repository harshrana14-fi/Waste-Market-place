'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, ChevronUp, ChevronDown } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AI_RESPONSES = {
  greeting: [
    "Hello! I'm your AI assistant for the Waste→Resource Marketplace. How can I help you today?",
    "Hi there! I'm here to guide you through our waste management platform. What would you like to know?",
    "Welcome! I can help you understand how our marketplace works, find the right services, or answer any questions you have."
  ],
  platform_overview: [
    "Our platform connects waste producers, recyclers, and corporates to transform industrial waste into valuable resources. We use AI-powered matching to find the best partnerships and track environmental impact through green credits.",
    "The Waste→Resource Marketplace is a comprehensive solution for sustainable waste management. We facilitate waste trading, provide AI-driven matching services, and reward environmental impact with green credits.",
    "Think of us as the 'Uber for waste management' - we connect those who have waste with those who can process it sustainably, all while tracking and rewarding environmental benefits."
  ],
  how_it_works: [
    "Here's how it works: 1) Producers list their waste materials, 2) Our AI matches them with suitable recyclers, 3) Transactions are completed with full tracking, 4) Green credits are earned for environmental impact, 5) Analytics help optimize your sustainability goals.",
    "The process is simple: List → Match → Trade → Earn Credits → Track Impact. Our AI handles the complex matching while you focus on your business.",
    "Producers post waste listings, recyclers browse and connect, AI ensures optimal matches, transactions are tracked, and everyone earns green credits for their environmental contribution."
  ],
  services: [
    "We offer: Waste Trading (buy/sell waste materials), AI Matching (smart partner recommendations), Green Credits (environmental rewards), Analytics & Reporting (sustainability insights), and Compliance Tracking (regulatory support).",
    "Our services include marketplace trading, intelligent matching algorithms, green credit system, comprehensive analytics, and compliance management tools.",
    "Key services: Marketplace for waste trading, AI-powered matching, green credit rewards, detailed analytics, and compliance tracking for all your sustainability needs."
  ],
  pricing: [
    "We offer flexible pricing plans for different user types: Free tier for basic features, Professional for small businesses, Enterprise for large corporations. Each plan includes different levels of AI matching and analytics.",
    "Our pricing is designed to scale with your business: Free for getting started, Professional for growing companies, Enterprise for large-scale operations. All plans include our core marketplace features.",
    "Pricing varies by plan: Free (basic features), Professional (advanced matching), Enterprise (full suite). Contact us for custom enterprise solutions."
  ],
  green_credits: [
    "Green credits are earned for environmental impact - diverting waste from landfills, reducing carbon footprint, and promoting circular economy. They can be traded, used for compliance, or redeemed for rewards.",
    "Think of green credits as 'environmental currency' - you earn them for sustainable practices and can use them for various benefits within our ecosystem.",
    "Green credits reward your environmental contributions. Earn them through waste diversion, carbon reduction, and sustainable practices. Use them for trading, compliance, or platform benefits."
  ],
  default: [
    "I'd be happy to help! Could you be more specific about what you'd like to know about our waste management platform?",
    "That's an interesting question! Let me know more details so I can provide the best guidance for your needs.",
    "I'm here to help with questions about our platform, services, pricing, or how to get started. What specific information are you looking for?"
  ]
};

const SUGGESTED_QUESTIONS = [
  "How does the platform work?",
  "What services do you offer?",
  "How do green credits work?",
  "What are your pricing plans?",
  "How do I get started?"
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return AI_RESPONSES.greeting[Math.floor(Math.random() * AI_RESPONSES.greeting.length)];
    }
    
    if (message.includes('how') && message.includes('work')) {
      return AI_RESPONSES.how_it_works[Math.floor(Math.random() * AI_RESPONSES.how_it_works.length)];
    }
    
    if (message.includes('service') || message.includes('offer')) {
      return AI_RESPONSES.services[Math.floor(Math.random() * AI_RESPONSES.services.length)];
    }
    
    if (message.includes('price') || message.includes('cost')) {
      return AI_RESPONSES.pricing[Math.floor(Math.random() * AI_RESPONSES.pricing.length)];
    }
    
    if (message.includes('green credit') || message.includes('credit')) {
      return AI_RESPONSES.green_credits[Math.floor(Math.random() * AI_RESPONSES.green_credits.length)];
    }
    
    if (message.includes('platform') || message.includes('overview')) {
      return AI_RESPONSES.platform_overview[Math.floor(Math.random() * AI_RESPONSES.platform_overview.length)];
    }
    
    return AI_RESPONSES.default[Math.floor(Math.random() * AI_RESPONSES.default.length)];
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(text),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const toggleChat = () => {
    if (isOpen) {
      setIsMinimized(!isMinimized);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-green-500 to-blue-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></div>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'h-16' : 'h-96'
    } w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 p-4 text-white relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-xs text-green-100">Waste→Resource Guide</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button
              onClick={closeChat}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 h-64 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-4">
                <Bot className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-sm mb-4">Hi! I'm your AI assistant. How can I help you today?</p>
                <div className="space-y-2">
                  {SUGGESTED_QUESTIONS.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="block w-full text-left px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[80%] ${
                  message.isUser ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    message.isUser 
                      ? 'bg-blue-500' 
                      : 'bg-gradient-to-r from-green-500 to-blue-600'
                  }`}>
                    {message.isUser ? (
                      <User className="w-3 h-3 text-white" />
                    ) : (
                      <Bot className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div className={`px-3 py-2 rounded-2xl ${
                    message.isUser
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isUser ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="px-3 py-2 rounded-2xl bg-gray-100">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about our platform..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
