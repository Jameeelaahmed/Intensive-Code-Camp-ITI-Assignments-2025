import React from 'react';
import styles from './Button.module.css';

const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    fullWidth = false,
    ...props
}) => {
    const className = `${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''}`;

    return (
        <button type={type} className={className} {...props}>
            {children}
        </button>
    );
};

export default Button;