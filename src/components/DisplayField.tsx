import React from 'react';

interface DisplayFieldProps {
  value: string;
  onCopy: () => void;
}

const DisplayField: React.FC<DisplayFieldProps> = ({ value, onCopy }) => (
  <div className="password-display">
    <input type="text" value={value} readOnly />
    <button onClick={onCopy}>Copy</button>
  </div>
);

export default DisplayField;
