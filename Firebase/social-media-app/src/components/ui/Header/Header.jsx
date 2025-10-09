import React from 'react';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const Header = () => {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/auth/login');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    const handleLogin = () => {
        navigate('/auth/login');
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo} onClick={() => navigate('/')}>
                Socialize
            </div>

            <div className={styles.authSection}>
                {currentUser ? (
                    <div className={styles.userSection}>
                        <span className={styles.welcomeText}>
                            Welcome, {currentUser.displayName || currentUser.email}
                        </span>
                        <button
                            className={styles.logoutButton}
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        className={styles.loginButton}
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;