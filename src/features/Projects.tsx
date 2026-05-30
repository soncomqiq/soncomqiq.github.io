import { useLanguage } from '../hooks/useLanguage';
import { RevealSection } from '../components/RevealSection';
import styles from './Projects.module.css';

interface CaseStudy {
  name: string;
  problem: string;
  build: string;
  stack: string;
  role: string;
  outcome: string;
  link?: string;
}

export function Projects() {
  const { t } = useLanguage();

  const projects: CaseStudy[] = [
    { ...t.projects.ev },
    { ...t.projects.strategy, link: 'https://github.com/cucpbioinfo/STRategy' },
    { ...t.projects.trading },
  ];

  return (
    <section className={styles.section}>
      <RevealSection>
        <h2 className={styles.title}>{t.projects.title}</h2>
      </RevealSection>
      <div className={styles.grid}>
        {projects.map((p, i) => (
          <RevealSection key={p.name} delay={i * 100}>
            <article className={styles.card}>
              <h3 className={styles.cardTitle}>{p.name}</h3>
              <dl className={styles.details}>
                <dt>Problem</dt>
                <dd>{p.problem}</dd>
                <dt>What I Built</dt>
                <dd>{p.build}</dd>
                <dt>Stack</dt>
                <dd>{p.stack}</dd>
                <dt>My Role</dt>
                <dd>{p.role}</dd>
                <dt>Outcome</dt>
                <dd>{p.outcome}</dd>
              </dl>
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  View on GitHub →
                </a>
              )}
            </article>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}
