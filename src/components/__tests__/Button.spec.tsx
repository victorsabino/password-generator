import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../Button';

describe('Button Component', () => {
  test('renders button with correct label', () => {
    render(<Button label="Click me" onTrigger={() => {}} />);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onTrigger function when clicked', () => {
    const mockOnTrigger = jest.fn();
    render(<Button label="Test Button" onTrigger={mockOnTrigger} />);
    const buttonElement = screen.getByRole('button', { name: /test button/i });
    
    fireEvent.click(buttonElement);
    expect(mockOnTrigger).toHaveBeenCalledTimes(1);
  });

  test('has correct CSS class', () => {
    render(<Button label="Styled Button" onTrigger={() => {}} />);
    const buttonElement = screen.getByRole('button', { name: /styled button/i });
    expect(buttonElement).toHaveClass('button');
  });
});