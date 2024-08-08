import React, { useState, useEffect } from 'react';
import PasswordGenerator from './components/PasswordGenerator';
import ThemeToggle from './components/ThemeToggle';
import './styles/globals.scss';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <>
      <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="app-container">
        <PasswordGenerator />
      </div>
    </>
  );
}

export default App;