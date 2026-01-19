import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/register');
  };

  return (
    <>
      <Head>
        <title>Smart Floor Plan Generator | AI-Powered Design</title>
        <meta name="description" content="Generate optimized floor plans using deep learning technology" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.geometricDesign}>
            <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="50" y="50" width="200" height="200" stroke="black" strokeWidth="2" />
              <rect x="300" y="50" width="250" height="250" stroke="black" strokeWidth="2" />
              <rect x="50" y="300" width="150" height="250" stroke="black" strokeWidth="2" />
              <rect x="250" y="350" width="300" height="200" stroke="black" strokeWidth="2" />
              <line x1="150" y1="150" x2="425" y2="175" stroke="black" strokeWidth="1" />
              <line x1="125" y1="425" x2="400" y2="450" stroke="black" strokeWidth="1" />
            </svg>
          </div>
          
          <h1 className={styles.heroTitle}>Smart Floor Plan Generator</h1>
          <p className={styles.heroTagline}>
            AI-powered floor plan generation using deep learning for efficient space utilization
          </p>
          <button className="btn-primary" onClick={handleGetStarted}>
            Get Started
          </button>
        </section>

        {/* What It Does Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What It Does</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>□</div>
              <h3 className={styles.cardTitle}>Input Dimensions</h3>
              <p className={styles.cardText}>
                Simply enter your plot dimensions and room requirements
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>◈</div>
              <h3 className={styles.cardTitle}>AI Processing</h3>
              <p className={styles.cardText}>
                Deep learning algorithms analyze and optimize space layout
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>▦</div>
              <h3 className={styles.cardTitle}>Generate Plan</h3>
              <p className={styles.cardText}>
                Receive a professional, optimized floor plan instantly
              </p>
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <h2 className={styles.sectionTitle}>Key Benefits</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>⊡</div>
              <h3 className={styles.cardTitle}>Efficient Space Utilization</h3>
              <p className={styles.cardText}>
                Maximize every square foot with intelligent space planning
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>◉</div>
              <h3 className={styles.cardTitle}>AI-Powered Intelligence</h3>
              <p className={styles.cardText}>
                Leverages advanced deep learning for optimal design decisions
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>⊞</div>
              <h3 className={styles.cardTitle}>Fast Design Process</h3>
              <p className={styles.cardText}>
                Generate professional floor plans in seconds, not hours
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <p className={styles.ctaText}>
            Ready to create your perfect floor plan?
          </p>
          <button className="btn-primary" onClick={handleGetStarted}>
            Get Started Now
          </button>
        </section>
      </div>
    </>
  );
}
