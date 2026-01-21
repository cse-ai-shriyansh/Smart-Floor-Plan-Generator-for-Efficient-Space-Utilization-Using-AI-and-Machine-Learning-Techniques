import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/Tutorial.module.css';

export default function Tutorial() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/app');
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Tutorial | Smart Floor Plan Generator</title>
        <meta name="description" content="Learn how to generate floor plans with AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>How It Works</h1>
          <p className={styles.subtitle}>
            Follow these simple steps to generate your AI-powered floor plan
          </p>
        </div>

        <div className={styles.stepsContainer}>
          {/* Step 1 */}
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <div className={styles.iconBox}>□</div>
              <h2 className={styles.stepTitle}>Input Plot Dimensions</h2>
              <p className={styles.stepDescription}>
                Start by entering the dimensions of your plot. Specify the width and height in Feet.
              </p>
              <div className={styles.stepDetails}>
                <ul>
                  <li>Enter plot width (e.g., 30 feet)</li>
                  <li>Enter plot depth (e.g., 40 feet)</li>
                  <li>Ensure measurements are accurate for best results</li>
                  <li>Both dimensions must be positive numbers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <div className={styles.iconBox}>◈</div>
              <h2 className={styles.stepTitle}>Select Number of Rooms</h2>
              <p className={styles.stepDescription}>
                Choose how many rooms you want in your floor plan. You can also specify room types and preferences.
              </p>
              <div className={styles.stepDetails}>
                <ul>
                  <li>Specify number of bedrooms (e.g., 3)</li>
                  <li>Specify number of living rooms (e.g., 1)</li>
                  <li>Specify number of kitchen</li>
                  <li>specify number of toilets</li>
                  <li> Additional requirements (Parking area, Poarch)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <div className={styles.iconBox}>◉</div>
              <h2 className={styles.stepTitle}>AI Generates Optimized Plan</h2>
              <p className={styles.stepDescription}>
                Our deep learning algorithm analyzes your requirements and generates an optimized floor plan layout.
              </p>
              <div className={styles.stepDetails}>
                <ul>
                  <li>AI considers space utilization efficiency</li>
                  <li>Optimizes room placement and flow</li>
                  <li>Ensures proper circulation and accessibility</li>
                  <li>Follows architectural best practices</li>
                  <li>Generation typically takes 5-10 seconds</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepContent}>
              <div className={styles.iconBox}>▦</div>
              <h2 className={styles.stepTitle}>View and Download Results</h2>
              <p className={styles.stepDescription}>
                Review your generated floor plan, make adjustments if needed, and download the final design.
              </p>
              <div className={styles.stepDetails}>
                <ul>
                  <li>Preview the generated floor plan</li>
                  <li>Check room dimensions and layout</li>
                  <li>Download in various formats (PDF, PNG, DWG)</li>
                  <li>Regenerate with different parameters if needed</li>
                  <li>Save to your account for future reference</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to Create Your Floor Plan?</h2>
          <div className={styles.buttonGroup}>
            <button className="btn-secondary" onClick={handleBack}>
              Back to Home
            </button>
            <button className="btn-primary" onClick={handleContinue}>
              Continue to App
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
