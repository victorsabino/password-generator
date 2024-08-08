import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PasswordGenerator from '../PasswordGenerator';

jest.mock('../DisplayField', () => ({ value, onCopy }: any) => (
  <div data-testid="display-field">
    <input type="text" value={value} readOnly />
    <button onClick={onCopy}>Copy</button>
  </div>
));
jest.mock('../Slider', () => ({ value, onChange }: any) => (
  <input
    type="range"
    data-testid="length-slider"
    value={value}
    onChange={(e) => onChange(parseInt(e.target.value))}
  />
));
jest.mock('../Toggle', () => ({ id, isChecked, onToggle, label }: any) => (
  <label>
    <input
      type="checkbox"
      data-testid={`toggle-${id}`}
      checked={isChecked}
      onChange={() => onToggle(id)}
    />
    {label}
  </label>
));
jest.mock('../Button', () => ({ label, onTrigger }: any) => (
  <button onClick={onTrigger}>{label}</button>
));

describe('PasswordGenerator Component', () => {
  beforeEach(() => {
    render(<PasswordGenerator />);
  });

  test('renders all child components', () => {
    expect(screen.getByTestId('display-field')).toBeInTheDocument();
    expect(screen.getByTestId('length-slider')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-lowercase')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-uppercase')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-numbers')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-symbols')).toBeInTheDocument();
    expect(screen.getByText('Generate')).toBeInTheDocument();
  });

  test('generates password when button is clicked', async () => {
    const generateButton = screen.getByText('Generate');
    fireEvent.click(generateButton);
  
    await waitFor(() => {
      const displayField = screen.getByTestId('display-field').querySelector('input');
      if (displayField && displayField instanceof HTMLInputElement) {
        const inputValue = displayField.value;
        expect(inputValue).not.toEqual('');
      } else {
        throw new Error('Input field not found or incorrect element type');
      }
    });
  });
  

  test('updates password length when slider is changed', async () => {
    const lengthSlider = screen.getByTestId('length-slider');
    fireEvent.change(lengthSlider, { target: { value: '20' } });

    fireEvent.click(screen.getByText('Generate'));

    await waitFor(() => {
      const displayField = screen.getByTestId('display-field').querySelector('input');
      if (displayField && displayField instanceof HTMLInputElement) {
        expect(displayField.value).toMatch(/^.{20}$/);
      } else {
        throw new Error('Input field not found or incorrect element type');
      }
    });
  });

  test('updates password options when toggles are clicked', async () => {
    fireEvent.click(screen.getByTestId('toggle-uppercase'));
    fireEvent.click(screen.getByTestId('toggle-numbers'));
    fireEvent.click(screen.getByText('Generate'));

    await waitFor(() => {
      const displayField = screen.getByTestId('display-field').querySelector('input');
      if (displayField && displayField instanceof HTMLInputElement) {
        expect(displayField.value).toMatch(/^[A-Za-z0-9]{10}$/);
      } else {
        throw new Error('Input field not found or incorrect element type');
      }
    });
  });

  test('copies password to clipboard when copy button is clicked', () => {
    const mockClipboard = {
      writeText: jest.fn(),
    };
    Object.assign(navigator, {
      clipboard: mockClipboard,
    });

    fireEvent.click(screen.getByText('Generate'));
    fireEvent.click(screen.getByText('Copy'));

    expect(mockClipboard.writeText).toHaveBeenCalledWith(expect.any(String));
  });
});
