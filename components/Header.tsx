import Link from 'next/link';
import styles from '@/styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
          Fleet Dashboard
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Dashboard
          </Link>
          <Link href="/orders" className={styles.navLink}>
            Orders
          </Link>
          <div className={styles.liveIndicator}>
            <div className={styles.liveDot}></div>
            <span>Live</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
