'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// Theme types following our design system
export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
});

// Custom hook for using theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const initializeTheme = () => {
      try {
        // Check localStorage first
        const storedTheme = localStorage.getItem('theme') as Theme | null;
        
        if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
          setThemeState(storedTheme);
        } else {
          // Fall back to system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const systemTheme: Theme = prefersDark ? 'dark' : 'light';
          setThemeState(systemTheme);
          localStorage.setItem('theme', systemTheme);
        }
      } catch (error) {
        // Fallback if localStorage is not available
        console.warn('Theme initialization failed, using dark theme:', error);
        setThemeState('dark');
      }
      
      setIsInitialized(true);
    };

    initializeTheme();
  }, []);

  // Apply theme to document root
  useEffect(() => {
    if (!isInitialized) return;

    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(theme);
    
    // Update CSS custom properties for smooth transitions
    if (theme === 'light') {
      root.style.setProperty('--bg-primary', '#F5F7FA');
      root.style.setProperty('--bg-secondary', '#FFFFFF');
      root.style.setProperty('--text-primary', '#1A1A1A');
      root.style.setProperty('--text-secondary', '#666666');
    } else {
      root.style.setProperty('--bg-primary', '#1A1A1A');
      root.style.setProperty('--bg-secondary', '#2D2D2D');
      root.style.setProperty('--text-primary', '#FFFFFF');
      root.style.setProperty('--text-secondary', '#CCCCCC');
    }
  }, [theme, isInitialized]);

  // Theme management functions
  const toggleTheme = () => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  };

  // Provide context value
  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  };

  // Prevent flash of unstyled content
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={value}>
      <div className={`min-h-screen transition-colors duration-300 ${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
