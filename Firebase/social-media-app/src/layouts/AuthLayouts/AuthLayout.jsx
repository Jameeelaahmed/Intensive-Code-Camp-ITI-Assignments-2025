import React from 'react';
import styles from './AuthLayout.module.css';

const AuthLayout = ({ children }) => {
    return (
        <div className={styles.authLayout}>
            <div className={styles.background}></div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;