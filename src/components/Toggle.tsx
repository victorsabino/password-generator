import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Label from '@radix-ui/react-label';
import { PasswordOptions } from '../types.d';

interface ToggleOptionProps {
  id: keyof PasswordOptions;
  isChecked: boolean;
  onToggle: (id: keyof PasswordOptions) => void;
  label: string;
}

const ToggleOption: React.FC<ToggleOptionProps> = ({ id, isChecked, onToggle, label }) => (
  <div className="toggle-option">
    <Checkbox.Root
      id={id}
      checked={isChecked}
      onCheckedChange={() => onToggle(id)}
    >
      <Checkbox.Indicator />
    </Checkbox.Root>
    <Label.Root htmlFor={id}>{label}</Label.Root>
  </div>
);

export default ToggleOption;
