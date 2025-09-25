'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 group
                 w-14 h-14 rounded-full
                 glassmorphism border border-white/20
                 hover:bg-white/20 hover:border-white/30
                 transition-all duration-300 ease-out
                 hover:scale-110 active:scale-95
                 shadow-lg hover:shadow-xl
                 backdrop-blur-sm"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Sun Icon (Light Mode) */}
        <svg
          className={`absolute w-6 h-6 text-amber-400 transition-all duration-500 ease-out transform
                     ${theme === 'light' 
                       ? 'opacity-100 rotate-0 scale-100' 
                       : 'opacity-0 rotate-180 scale-75'
                     }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>

        {/* Moon Icon (Dark Mode) */}
        <svg
          className={`absolute w-6 h-6 text-blue-300 transition-all duration-500 ease-out transform
                     ${theme === 'dark' 
                       ? 'opacity-100 rotate-0 scale-100' 
                       : 'opacity-0 -rotate-180 scale-75'
                     }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>

        {/* Glow effect on hover */}
        <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        ${theme === 'dark' 
                          ? 'bg-blue-500/20 shadow-lg shadow-blue-500/25' 
                          : 'bg-amber-500/20 shadow-lg shadow-amber-500/25'
                        }`} />
      </div>

      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent 
                      opacity-0 group-active:opacity-100 transition-opacity duration-150" />
    </button>
  );
}
