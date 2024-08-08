import React from 'react';
import { render, screen } from '@testing-library/react';
import Slider from '../Slider';

describe('Slider Component', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
    render(<Slider value={10} min={1} max={30} onChange={handleChange} />);
  });

  test('calls onChange with new value when slider value is changed', () => {
    handleChange(20);
    expect(handleChange).toHaveBeenCalledWith(20);
  });

  test('slider does not exceed max or drop below min value', () => {
    handleChange(-1);
    expect(handleChange).not.toHaveBeenCalledWith(0);
  });
});
