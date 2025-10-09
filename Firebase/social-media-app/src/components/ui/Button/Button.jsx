import styles from './Button.module.css';

const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    fullWidth = false,
    disabled = false,
    isLoading = false,
    ...props
}) => {
    const className = `${styles.button} ${styles[variant]}  ${fullWidth ? styles.fullWidth : ''} ${disabled ? styles.disabled : ''} ${isLoading ? styles.loading : ''} `;

    return (
        <button
            type={type}
            className={className}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className={styles.spinner}></span>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;