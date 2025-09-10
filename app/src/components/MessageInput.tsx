import React, { useState, useRef, useEffect } from 'react';

interface MessageInputProps {
  onSend: (message: string, mode: 'text' | 'image') => void;
  disabled?: boolean;
}

export default function MessageInput({ onSend, disabled = false }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState<'text' | 'image'>('text');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim(), mode);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'text' ? 'image' : 'text');
  };

  const placeholder = mode === 'text' 
    ? 'Message ChatGPT...' 
    : 'Describe the image you want to generate...';

  const canSend = message.trim().length > 0 && !disabled;

  return (
    <div className="border-t border-gray-200 bg-white px-3 sm:px-4 py-3 sm:py-4 flex-shrink-0">
      <div className="max-w-3xl mx-auto">
        {/* Mode indicator */}
        {mode === 'image' && (
          <div className="mb-2 flex items-center text-xs sm:text-sm text-gray-600">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z" />
            </svg>
            <span>Image generation mode</span>
            <button
              onClick={toggleMode}
              className="ml-2 text-blue-500 hover:text-blue-600 text-xs underline"
            >
              Switch to text
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex items-end space-x-2 sm:space-x-3">
            {/* Text Input */}
            <div className={`flex-1 min-h-[44px] max-h-32 border rounded-xl sm:rounded-2xl flex items-center transition-all duration-200 shadow-sm ${
              mode === 'image' 
                ? 'bg-purple-50 border-purple-200 focus-within:border-purple-300 focus-within:shadow-purple-100' 
                : 'bg-gray-50 border-gray-300 focus-within:border-gray-400 focus-within:shadow-gray-100'
            } focus-within:shadow-md`}>
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-transparent border-none resize-none focus:outline-none text-sm sm:text-base ${
                  disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                rows={1}
                style={{ maxHeight: '120px', minHeight: '40px' }}
              />
              
              {/* Image Toggle Button */}
              <button
                type="button"
                onClick={toggleMode}
                disabled={disabled}
                className={`p-1.5 sm:p-2 transition-colors rounded-md ${
                  mode === 'image'
                    ? 'text-purple-600 hover:text-purple-700 hover:bg-purple-100'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={mode === 'image' ? 'Switch to text mode' : 'Switch to image generation'}
              >
                {mode === 'image' ? (
                  // Image mode - filled icon
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                ) : (
                  // Text mode - outline icon
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Send Button */}
            <button
              type="submit"
              disabled={!canSend}
              className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md ${
                canSend
                  ? mode === 'image'
                    ? 'bg-purple-500 hover:bg-purple-600 text-white shadow-purple-200'
                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-200'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              title={mode === 'image' ? 'Generate image' : 'Send message'}
            >
              {mode === 'image' ? (
                // Generate icon for image mode
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ) : (
                // Send icon for text mode
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
