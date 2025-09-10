import React from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type: 'text' | 'image';
  image_url?: string;
}

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  // Mock messages for display
  const mockMessages: Message[] = [
    {
      id: '1',
      role: 'user',
      content: 'Hello! How can I assist you today?',
      type: 'text'
    },
    {
      id: '2',
      role: 'assistant',
      content: 'Hello! I\'m here to help you with any questions or tasks you might have. I can assist with writing, analysis, math, coding, creative projects, and much more. What would you like to work on today?',
      type: 'text'
    },
    {
      id: '3',
      role: 'user',
      content: 'Create an image for a garden-themed birthday party invitation',
      type: 'text'
    },
    {
      id: '4',
      role: 'assistant',
      content: 'Here\'s the image you requested based on: "Create an image for a garden-themed birthday party invitation".',
      type: 'text'
    }
  ];

  // Use mock messages if no messages provided
  const displayMessages = messages.length > 0 ? messages : mockMessages;

  if (displayMessages.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <p className="text-lg font-medium mb-2">How can I help you today?</p>
        <p className="text-sm">Try asking a question to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {displayMessages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`flex max-w-[85%] sm:max-w-[75%] md:max-w-[70%] ${
            message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
          }`}>
            {/* Avatar */}
            <div className={`flex-shrink-0 ${message.role === 'user' ? 'ml-2 sm:ml-3' : 'mr-2 sm:mr-3'}`}>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                message.role === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-800 text-white'
              }`}>
                {message.role === 'user' ? (
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-sm flex items-center justify-center">
                    <span className="text-gray-800 text-xs font-bold">AI</span>
                  </div>
                )}
              </div>
            </div>

            {/* Message Bubble */}
            <div className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${
              message.role === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-900 border border-gray-200'
            }`}>
              <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
              
              {/* Image display for image messages */}
              {message.type === 'image' && message.image_url && (
                <div className="mt-2 sm:mt-3">
                  <img
                    src={message.image_url}
                    alt="Generated image"
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
