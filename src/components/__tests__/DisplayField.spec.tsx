import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DisplayField from '../DisplayField';

describe('DisplayField Component', () => {
  const mockValue = 'Test Value';
  const mockOnCopy = jest.fn();

  beforeEach(() => {
    render(<DisplayField value={mockValue} onCopy={mockOnCopy} />);
  });

  test('renders input field with correct value', () => {
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe(mockValue);
    expect(inputElement).toHaveAttribute('readonly');
  });

  test('renders copy button', () => {
    const buttonElement = screen.getByRole('button', { name: /copy/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onCopy function when copy button is clicked', () => {
    const buttonElement = screen.getByRole('button', { name: /copy/i });
    fireEvent.click(buttonElement);
    expect(mockOnCopy).toHaveBeenCalledTimes(1);
  });

  test('has correct CSS class', () => {
    const displayFieldElement = screen.getByRole('textbox').closest('div');
    expect(displayFieldElement).toHaveClass('display-field');
  });
});