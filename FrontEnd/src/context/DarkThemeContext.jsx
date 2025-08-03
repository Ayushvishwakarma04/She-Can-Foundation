import React, { createContext, useState, useEffect } from 'react';

export const DarkThemeContext = createContext();

export const DarkThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('isDarkMode');
    if (storedMode !== null) {
      return storedMode === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <DarkThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkThemeContext.Provider>
  );
};