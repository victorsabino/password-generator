import React, { useState, useEffect } from 'react';
import PasswordGenerator from './components/PasswordGenerator';
import ThemeToggle from './components/ThemeToggle';
import './styles/globals.scss';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="app-container">
      <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <PasswordGenerator />
    </div>
  );
}

export default App;