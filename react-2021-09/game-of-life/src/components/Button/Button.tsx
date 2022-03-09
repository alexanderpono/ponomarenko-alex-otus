import React from 'react';
import cn from 'classnames';
import styles from './Button.scss';

export interface ButtonProps {
    active?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    id?: string;
    type?: 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
    active,
    disabled,
    children,
    onClick,
    id,
    type,
}) => {
    return (
        <button
            className={cn(styles.but, { disabled: disabled, active: active })}
            disabled={disabled}
            onClick={onClick}
            id={id}
            type={type}
        >
            {children}
        </button>
    );
};
