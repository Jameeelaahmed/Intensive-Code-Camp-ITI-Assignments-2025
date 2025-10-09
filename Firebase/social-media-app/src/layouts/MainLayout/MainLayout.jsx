import styles from './MainLayout.module.css';
import Header from '../../components/ui/Header/Header';
import { Outlet } from 'react-router-dom';
const MainLayout = () => {
    return (
        <div className={styles.mainLayout}>
            <Header />
            <main className={styles.content}>
                <Outlet />
            </main>
            <footer className={styles.footer}>
                © {new Date().getFullYear()} Socialize. All rights reserved.
            </footer>
        </div>
    );
};

export default MainLayout;