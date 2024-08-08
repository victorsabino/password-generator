import React from 'react';
import * as Slider from '@radix-ui/react-slider';

interface LengthSliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (newValue: number) => void;
}

const LengthSlider: React.FC<LengthSliderProps> = ({ value, min, max, onChange }) => (
  <div className="range-slider">
    <label htmlFor="value-length">Length: {value}</label>
    <Slider.Root
        className="SliderRoot"
        defaultValue={[value]}
        min={min}
        max={max}
        step={1}
        onValueChange={(newValue) => onChange(newValue[0])}
    >
    <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
    </Slider.Track>
    <Slider.Thumb className="SliderThumb" aria-label="Adjust Length" />
    </Slider.Root>
  </div>
);

export default LengthSlider;
