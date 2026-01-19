import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/About.module.css';

export default function About() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>About | Smart Floor Plan Generator</title>
        <meta name="description" content="Learn about the Smart Floor Plan Generator and its impact on AI-powered architectural design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <h1 className={styles.title}>About the Project</h1>
          <p className={styles.subtitle}>
            Smart Floor Plan Generator is an AI-powered platform designed to create efficient, functional, 
            and optimized floor plans with minimal human effort. By combining deep learning techniques with 
            architectural logic, the system automatically generates layouts that make the best possible use 
            of available space.
          </p>
        </div>

        {/* Main Content */}
        <div className={styles.content}>
          {/* Introduction */}
          <section className={styles.section}>
            <p className={styles.sectionContent}>
              The platform transforms basic user inputs—such as plot dimensions and room requirements—into 
              intelligent floor plans that follow spatial efficiency principles. Instead of manually drafting 
              layouts, users can explore AI-generated designs that balance usability, structure, and practicality.
            </p>
            <p className={styles.sectionContent}>
              This project focuses on <strong>simplicity</strong>, <strong>clarity</strong>, and <strong>performance</strong>. 
              The interface is intentionally minimal, allowing users to concentrate on design decisions while the AI 
              handles complex spatial reasoning in the background.
            </p>
          </section>

          {/* What Makes It Different */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What Makes It Different</h2>
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>◉</div>
                <h3 className={styles.featureTitle}>AI-Driven Design</h3>
                <p className={styles.featureDescription}>
                  Uses deep learning models to understand spatial relationships
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>▦</div>
                <h3 className={styles.featureTitle}>Space Optimization</h3>
                <p className={styles.featureDescription}>
                  Reduces unused areas and improves layout efficiency
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>⊡</div>
                <h3 className={styles.featureTitle}>User-Guided Control</h3>
                <p className={styles.featureDescription}>
                  Designs adapt to user-defined constraints
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>◈</div>
                <h3 className={styles.featureTitle}>Fast & Scalable</h3>
                <p className={styles.featureDescription}>
                  Generates multiple layout possibilities in seconds
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>□</div>
                <h3 className={styles.featureTitle}>Minimalist Experience</h3>
                <p className={styles.featureDescription}>
                  Clean black-and-white interface with no distractions
                </p>
              </div>
            </div>
          </section>

          {/* Who It's For */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Who It&apos;s For</h2>
            <div className={styles.audienceList}>
              <div className={styles.audienceItem}>
                Students exploring AI in architecture
              </div>
              <div className={styles.audienceItem}>
                Architects seeking rapid layout concepts
              </div>
              <div className={styles.audienceItem}>
                Developers experimenting with generative design
              </div>
              <div className={styles.audienceItem}>
                Anyone interested in intelligent space planning
              </div>
            </div>
          </section>

          {/* Vision */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Vision</h2>
            <div className={styles.visionBox}>
              <p className={styles.visionText}>
                The long-term goal of this project is to bridge the gap between artificial intelligence 
                and architectural design, enabling smarter, faster, and more accessible space planning 
                solutions for real-world applications.
              </p>
            </div>
          </section>

          {/* Impact Section */}
          <div className={styles.impactSection}>
            <h2 className={styles.sectionTitle}>Impact</h2>
            <p className={styles.sectionContent}>
              The Smart Floor Plan Generator introduces a new way of approaching spatial design by combining 
              artificial intelligence with practical architectural planning. Its impact lies in reducing complexity, 
              saving time, and improving how space is utilized across different environments.
            </p>

            <div className={styles.impactGrid}>
              <div className={styles.impactCard}>
                <h3 className={styles.impactCardTitle}>Transforming the Design Process</h3>
                <p className={styles.impactCardContent}>
                  By automating early-stage floor plan generation, the platform significantly reduces the time 
                  required to move from an idea to a functional layout. Designers and users no longer need to 
                  start from scratch—AI-generated plans provide a strong, optimized foundation that can be 
                  refined further.
                </p>
              </div>

              <div className={styles.impactCard}>
                <h3 className={styles.impactCardTitle}>Improving Space Efficiency</h3>
                <p className={styles.impactCardContent}>
                  Poor space utilization leads to wasted area, higher costs, and inefficient living or working 
                  environments. This system focuses on minimizing unused or dead space, creating compact, 
                  well-connected room layouts, and encouraging functional design decisions.
                </p>
              </div>

              <div className={styles.impactCard}>
                <h3 className={styles.impactCardTitle}>Increasing Accessibility</h3>
                <p className={styles.impactCardContent}>
                  Floor planning traditionally requires technical expertise or professional tools. This platform 
                  lowers that barrier by offering simple inputs instead of complex drafting, instant visual results, 
                  and an intuitive, minimal interface.
                </p>
              </div>

              <div className={styles.impactCard}>
                <h3 className={styles.impactCardTitle}>Supporting Sustainable Design</h3>
                <p className={styles.impactCardContent}>
                  Efficient space planning contributes directly to sustainability. Optimized layouts can reduce 
                  material usage, construction waste, and energy consumption through better spatial organization.
                </p>
              </div>

              <div className={styles.impactCard}>
                <h3 className={styles.impactCardTitle}>Educational and Technological Value</h3>
                <p className={styles.impactCardContent}>
                  The project demonstrates real-world applications of deep learning, the role of AI in generative 
                  design, and the intersection of technology and architecture—providing a practical example of how 
                  AI can solve complex spatial problems.
                </p>
              </div>

              <div className={styles.impactCard}>
                <h3 className={styles.impactCardTitle}>Long-Term Impact</h3>
                <p className={styles.impactCardContent}>
                  As the system evolves, it has the potential to influence residential and commercial building 
                  design, urban planning tools, smart construction workflows, and AI-assisted architectural 
                  decision-making.
                </p>
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <section className={styles.section}>
            <p className={styles.sectionContent} style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 500 }}>
              The Smart Floor Plan Generator represents a step toward intelligent, efficient, and human-centered 
              design powered by AI.
            </p>
          </section>

          {/* CTA */}
          <div className={styles.ctaSection}>
            <p className={styles.ctaText}>Ready to experience AI-powered floor planning?</p>
            <button className="btn-primary" onClick={() => router.push('/register')}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
