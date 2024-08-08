import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PasswordGenerator from '../PasswordGenerator';

// Mock child components
jest.mock('../DisplayField', () => ({ value, onCopy }: { value: string; onCopy: () => void }) => (
  <div data-testid="display-field">
    <span>{value}</span>
    <button onClick={onCopy}>Copy</button>
  </div>
));

jest.mock('../Slider', () => ({ value, onChange }: { value: number; onChange: (value: number) => void }) => (
  <input
    type="range"
    data-testid="length-slider"
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
  />
));

jest.mock('../Toggle', () => ({ id, isChecked, onToggle, label }: { id: string; isChecked: boolean; onToggle: () => void; label: string }) => (
  <label>
    <input
      type="checkbox"
      data-testid={`toggle-${id}`}
      checked={isChecked}
      onChange={onToggle}
    />
    {label}
  </label>
));

jest.mock('../Button', () => ({ label, onTrigger }: { label: string; onTrigger: () => void }) => (
  <button onClick={onTrigger}>{label}</button>
));

// Mock clipboard API
const mockClipboard = {
  writeText: jest.fn(),
};
Object.assign(navigator, { clipboard: mockClipboard });

describe('PasswordGenerator Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders password generator with default state', () => {
    render(<PasswordGenerator />);
    expect(screen.getByText('Password Generator')).toBeInTheDocument();
    expect(screen.getByTestId('display-field')).toBeInTheDocument();
    expect(screen.getByTestId('length-slider')).toHaveValue('10');
    expect(screen.getByTestId('toggle-lowercase')).toBeChecked();
    expect(screen.getByTestId('toggle-uppercase')).not.toBeChecked();
    expect(screen.getByTestId('toggle-numbers')).not.toBeChecked();
    expect(screen.getByTestId('toggle-symbols')).not.toBeChecked();
    expect(screen.getByText('Generate Password')).toBeInTheDocument();
  });

  test('generates password when button is clicked', () => {
    render(<PasswordGenerator />);
    const generateButton = screen.getByText('Generate Password');
    fireEvent.click(generateButton);
    const passwordDisplay = screen.getByTestId('display-field');
    expect(passwordDisplay.textContent).not.toBe('');
  });

  test('updates password length when slider is changed', () => {
    render(<PasswordGenerator />);
    const lengthSlider = screen.getByTestId('length-slider');
    fireEvent.change(lengthSlider, { target: { value: '20' } });
    expect(lengthSlider).toHaveValue('20');
  });

  test('toggles password options', () => {
    render(<PasswordGenerator />);
    const uppercaseToggle = screen.getByTestId('toggle-uppercase');
    fireEvent.click(uppercaseToggle);
    expect(uppercaseToggle).toBeChecked();
  });

  test('copies password to clipboard when copy button is clicked', () => {
    render(<PasswordGenerator />);
    const generateButton = screen.getByText('Generate Password');
    fireEvent.click(generateButton);
    const copyButton = screen.getByText('Copy');
    fireEvent.click(copyButton);
    expect(mockClipboard.writeText).toHaveBeenCalled();
  });
});