import React, { FC } from 'react';
import cn from 'clsx';
import { sum } from './sum';
import './button.css';

interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string | null;
  size?: string;
  label: string;
}
/**
 * Primary UI component for user interaction
 */

export const Button: FC<ButtonProps> = ({ primary, backgroundColor, size, label, ...props }) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';

  const onClick = () => {
    sum(4, 5);
  };

  return (
    <button
      type="button"
      className={cn('storybook-button', `storybook-button--${size}`, mode)}
      style={{ backgroundColor: backgroundColor || 'green' }}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};
