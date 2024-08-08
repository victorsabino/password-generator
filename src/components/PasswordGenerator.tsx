import React, { useState } from 'react';
import DisplayField from './DisplayField';
import Slider from './Slider';
import Toggle from './Toggle';
import Button from './Button';
import { PasswordCharset, PasswordOptions } from '../types.d';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [length, setLength] = useState<number>(10);
  const [options, setOptions] = useState<PasswordOptions>({
    lowercase: true,
    uppercase: false,
    numbers: false,
    symbols: false,
  });

  const handleOptionChange = (option: keyof PasswordOptions) => {
    setOptions((prevOptions) => {
      const newOptions = { ...prevOptions, [option]: !prevOptions[option] };
      if (Object.values(newOptions).every((v) => !v)) {
        newOptions.lowercase = true;
      }
      return newOptions;
    });
  };

  const generatePassword = () => {
    const charset: PasswordCharset = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    };

    let chars = '';
    Object.keys(options).forEach((option) => {
      if (options[option as keyof PasswordOptions]) {
        chars += charset[option as keyof PasswordOptions];
      }
    });

    const newPassword = Array(length)
      .fill(null)
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join('');

    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="password-generator">
      <h2>Generator</h2>
      <DisplayField value={password} onCopy={copyToClipboard} />
      <Slider value={length} min={1} max={30} onChange={setLength} />
      <div className="options">
        {Object.entries(options).map(([key, value]) => (
          <Toggle
            key={key}
            id={key as keyof PasswordOptions}
            isChecked={value}
            onToggle={handleOptionChange}
            label={`Include ${key}`}
          />
        ))}
      </div>
      <Button label="Generate" onTrigger={generatePassword} />
    </div>
  );
};

export default PasswordGenerator;
