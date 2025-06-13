import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <p>© 2025 Gallery App. All rights reserved.</p>
                <div className={styles.links}>
                    <a href="/privacy" className={styles.footerLink}>Privacy Policy</a>
                    <a href="/terms" className={styles.footerLink}>Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}