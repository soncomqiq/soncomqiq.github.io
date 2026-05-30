import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { RevealSection } from '../components/RevealSection';
import styles from './Home.module.css';

export function Home() {
  const { t } = useLanguage();

  return (
    <>
      <RevealSection>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.headline}>{t.hero.headline}</h1>
            <p className={styles.subtext}>{t.hero.subtext}</p>
            <div className={styles.ctas}>
              <a
                href="mailto:nuttachai.ku@hotmail.com?subject=Website%20Quote%20Request"
                className={styles.ctaPrimary}
              >
                {t.hero.cta}
              </a>
              <Link to="/projects" className={styles.ctaSecondary}>
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          <aside className={styles.credibility}>
            <div className={styles.credItem}>{t.credibility.years}</div>
            <div className={styles.credItem}>{t.credibility.stack}</div>
            <div className={styles.credItem}>{t.credibility.arch}</div>
            <div className={styles.credItem}>{t.credibility.teaching}</div>
          </aside>
        </section>
      </RevealSection>

      <RevealSection delay={80}>
        <section className={styles.experienceSection}>
          <h2 className={styles.sectionTitle}>{t.experience.title}</h2>
          <div className={styles.timeline}>
            {t.experience.roles.map((role) => (
              <div key={role.title + role.company} className={styles.timelineItem}>
                <span className={styles.period}>{role.period}</span>
                <div>
                  <h3 className={styles.roleTitle}>{role.title}</h3>
                  <p className={styles.company}>{role.company}</p>
                  {role.highlight && <p className={styles.highlight}>{role.highlight}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </RevealSection>

      <RevealSection delay={80}>
        <section className={styles.teachingSection}>
          <h2 className={styles.sectionTitle}>{t.teaching.title}</h2>
          <p className={styles.teachingSummary}>{t.teaching.summary}</p>

          <div className={styles.teachingGrid}>
            <div className={styles.teachingCard}>
              <h3 className={styles.teachingCardTitle}>{t.teaching.highlightsTitle}</h3>
              <ul className={styles.teachingList}>
                {t.teaching.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.teachingCard}>
              <h3 className={styles.teachingCardTitle}>{t.teaching.topicsTitle}</h3>
              <div className={styles.topicChips}>
                {t.teaching.topics.map((topic) => (
                  <span key={topic} className={styles.topicChip}>
                    {topic}
                  </span>
                ))}
              </div>
              <p className={styles.bootcampLabel}>{t.teaching.bootcampTitle}</p>
              <p className={styles.bootcampValue}>{t.teaching.bootcampValue}</p>
            </div>
          </div>

          <div className={styles.metricsBlock}>
            <h3 className={styles.teachingCardTitle}>{t.teaching.metricsTitle}</h3>
            <div className={styles.metricsGrid}>
              {t.teaching.metrics.map((metric) => (
                <div key={metric.label} className={styles.metricCard}>
                  <p className={styles.metricLabel}>{metric.label}</p>
                  <p className={styles.metricValue}>{metric.value}</p>
                </div>
              ))}
            </div>
            <a
              href="mailto:nuttachai.ku@hotmail.com?subject=Technical%20Training%20Inquiry"
              className={styles.trainingCta}
            >
              {t.teaching.cta}
            </a>
          </div>
        </section>
      </RevealSection>

      <RevealSection delay={80}>
        <section className={styles.educationSection}>
          <h2 className={styles.sectionTitle}>{t.education.title}</h2>
          <div className={styles.eduGrid}>
            {t.education.degrees.map((deg) => (
              <div key={deg.degree} className={styles.eduCard}>
                <h3 className={styles.degreeTitle}>{deg.degree}</h3>
                <p className={styles.school}>{deg.school}</p>
                <p className={styles.period}>{deg.period}</p>
                {deg.note && <p className={styles.note}>{deg.note}</p>}
              </div>
            ))}
          </div>
        </section>
      </RevealSection>
    </>
  );
}
