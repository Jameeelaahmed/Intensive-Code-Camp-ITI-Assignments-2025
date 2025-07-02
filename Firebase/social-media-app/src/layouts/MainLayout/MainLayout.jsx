import React from 'react';
import styles from './MainLayout.module.css';
import Header from '../../components/ui/Header/Header';

const MainLayout = ({ children }) => {
    return (
        <div className={styles.mainLayout}>
            <Header />
            <main className={styles.content}>
                {children}
            </main>
            <footer className={styles.footer}>
                © {new Date().getFullYear()} Socialize. All rights reserved.
            </footer>
        </div>
    );
};

export default MainLayout;