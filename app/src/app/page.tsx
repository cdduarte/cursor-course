"use client";
import React, { useState } from "react";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type: 'text' | 'image';
  image_url?: string;
}

export default function ChatDemoPage() {
  // Mock state for messages
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (content: string, mode: 'text' | 'image') => {
    // Create new user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      type: mode,
    };

    // Add user message
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: mode === 'image' 
          ? `I'd be happy to help you generate an image based on: "${content}". However, image generation is not yet connected to the backend.`
          : `Thanks for your message: "${content}". This is a mock response - the AI backend is not yet connected.`,
        type: 'text',
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">ChatGPT</h1>
            <button className="hidden sm:flex px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              New Chat
            </button>
            {/* Mobile menu button - placeholder for future */}
            <button className="sm:hidden p-2 text-gray-500 hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
            <MessageList messages={messages} />
          </div>
        </div>

        {/* Input Area */}
        <MessageInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
