import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import * as Label from '@radix-ui/react-label';

interface ThemeToggleProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <div className="theme-switch">
      <Label.Root htmlFor="theme-mode">Dark Mode</Label.Root>
      <Switch.Root
        id="theme-mode"
        checked={isDarkMode}
        onCheckedChange={setIsDarkMode}
        className="switch-root"
      >
        <Switch.Thumb className="switch-thumb" />
      </Switch.Root>
    </div>
  );
};

export default ThemeToggle;