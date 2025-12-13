import React from 'react';
import s from './button.module.sass';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export function Button({ primary = false, size = 'medium', backgroundColor, label, ...props }: ButtonProps) {
  const mode = primary ? s.primary : s.secondary;
  return (
    <button
      type="button"
      className={[s.button, s[size], mode].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
}
