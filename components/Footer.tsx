import Link from 'next/link';
import styles from '@/styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Smart Floor Plan Generator</h3>
          <p>AI-powered floor plan generation using deep learning technology.</p>
        </div>
        <div className={styles.footerSection}>
          <h3>Quick Links</h3>
          <div className={styles.footerLinks}>
            <Link href="/">Home</Link>
            <Link href="/tutorial">Tutorial</Link>
            <Link href="/app">Generate Plan</Link>
          </div>
        </div>
        <div className={styles.footerSection}>
          <h3>Contact</h3>
          <div className={styles.footerLinks}>
            <a href="mailto:info@floorplangen.com">info@floorplangen.com</a>
            <a href="#">Documentation</a>
            <a href="#">Support</a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2026 Smart Floor Plan Generator. All rights reserved.</p>
      </div>
    </footer>
  );
}
