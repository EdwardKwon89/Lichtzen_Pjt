'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'deep-navy' | 'ocean-depth' | 'industrial-graphite' | 'frosty-crystal';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('deep-navy');
  const [mounted, setMounted] = useState(false);

  // Apply theme to document element
  useEffect(() => {
    const savedTheme = localStorage.getItem('lichtzen-theme') as Theme || 'deep-navy';
    setThemeState(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('lichtzen-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* 
          We use a data-theme on a wrapper or rely on the html attribute. 
          To prevent hydration mismatch, we ensure the content is only visible after mount
          if it depends on the theme state for initial layout.
      */}
      <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.2s ease-in' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
