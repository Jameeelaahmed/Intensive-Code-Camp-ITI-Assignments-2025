import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <nav className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">GalleryApp</Link>
            </div>
            <div className={styles.navLinks}>
                <Link href="/" className={styles.navLink}>Home</Link>
                <Link href="/photos" className={styles.navLink}>Gallery</Link>
                <Link href='/uploadphoto' className={styles.navLink}>
                    Upload Photo
                    <span className={styles.linkGlow}></span>
                </Link>
            </div>
        </nav>
    );
}