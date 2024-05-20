// DarkModeContext.js
import React, { createContext, useState } from 'react';

const DarkModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

export default function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export {DarkModeContext};
