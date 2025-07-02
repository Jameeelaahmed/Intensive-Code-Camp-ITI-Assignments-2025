import React from 'react';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <div className={styles.logo} onClick={() => navigate('/')}>
                Socialize
            </div>

            <nav className={styles.nav}>
                <Link to="/" className={styles.navItem}>Home</Link>
                <Link to="/profile" className={styles.navItem}>Profile</Link>
                <Link to="/friends" className={styles.navItem}>Friends</Link>
            </nav>

            <div className={styles.searchBar}>
                <input type="text" placeholder="Search..." />
            </div>

            <div className={styles.userActions}>
                <button className={styles.notificationBtn}>🔔</button>
                <div className={styles.userAvatar}>U</div>
            </div>
        </header>
    );
};

export default Header;