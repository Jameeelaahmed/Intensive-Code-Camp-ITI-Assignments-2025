import React from 'react';
import styles from './AuthLayout.module.css';
import { Outlet } from 'react-router-dom';
const AuthLayout = () => {
    return (
        <div className={styles.authLayout}>
            <div className={styles.background}></div>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;