import React from 'react';

interface ButtonProps {
  label: string;
  onTrigger: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onTrigger }) => (
  <button onClick={onTrigger} className="button">
    {label}
  </button>
);

export default Button;
