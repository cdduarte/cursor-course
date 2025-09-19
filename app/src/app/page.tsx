"use client";
import React, { useState } from "react";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import { validateChatInput, validateImagePrompt } from "../lib/security";
import { useStableId } from "../hooks/useStableId";

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
  const generateId = useStableId();

  const handleSendMessage = async (content: string, mode: 'text' | 'image') => {
    // Validate input on the frontend (additional validation after MessageInput)
    const validation = mode === 'image' 
      ? validateImagePrompt(content)
      : validateChatInput(content);
    
    if (!validation.isValid) {
      console.error('Input validation failed:', validation.errors);
      // Add validation error message
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: `Input validation failed: ${validation.errors.join('. ')}`,
        type: 'text',
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    // Create new user message with sanitized content
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: validation.sanitized,
      type: mode,
    };

    // Add user message
    setMessages(prev => [...prev, userMessage]);

    try {
      if (mode === 'text') {
        await handleTextMessage(validation.sanitized);
      } else {
        await handleImageMessage(validation.sanitized);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request. Please try again.',
        type: 'text',
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleTextMessage = async (content: string) => {
    // Prepare message history for context (last 10 messages)
    const history = messages.slice(-10).map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    try {
      const response = await fetch('http://127.0.0.1:54321/functions/v1/chat-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
        },
        body: JSON.stringify({ message: content, history }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      // Create initial assistant message
      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: '',
        type: 'text',
      };
      
      setMessages(prev => [...prev, assistantMessage]);

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (reader) {
        let buffer = '';
        
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            if (line.trim()) {
              try {
                const data = JSON.parse(line);
                if (data.content) {
                  // React will handle text escaping automatically when rendering
                  setMessages(prev => prev.map(msg => 
                    msg.id === assistantMessage.id 
                      ? { ...msg, content: msg.content + data.content }
                      : msg
                  ));
                } else if (data.error) {
                  throw new Error(data.error);
                }
              } catch (parseError) {
                console.warn('Failed to parse streaming data:', line);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Text message error:', error);
      throw error;
    }
  };

  const handleImageMessage = async (content: string) => {
    try {
      const response = await fetch('http://127.0.0.1:54321/functions/v1/chat-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
        },
        body: JSON.stringify({ prompt: content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const data = await response.json();
      
      // Use the response content directly - React will handle text escaping
      const responseNote = data.note || `Here's the image you requested: "${content}"`;
      
      // Add assistant message with image
      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: responseNote,
        type: 'image',
        image_url: data.image_url, // URL validation happens in MessageList component
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Image message error:', error);
      throw error;
    }
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
