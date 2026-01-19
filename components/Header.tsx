import Link from 'next/link';
import styles from '@/styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
          Smart Floor Plan Generator
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
          <Link href="/tutorial" className={styles.navLink}>
            Tutorial
          </Link>
          <Link href="/app" className={styles.navLink}>
            Generate
          </Link>
        </nav>
      </div>
    </header>
  );
}
