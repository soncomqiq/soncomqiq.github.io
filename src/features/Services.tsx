import { useLanguage } from '../hooks/useLanguage';
import { RevealSection } from '../components/RevealSection';
import styles from './Services.module.css';

export function Services() {
  const { t } = useLanguage();

  const services = [t.services.website, t.services.webapp, t.services.training];

  return (
    <section className={styles.section}>
      <RevealSection>
        <h2 className={styles.title}>{t.services.title}</h2>
      </RevealSection>
      <div className={styles.grid}>
        {services.map((s, index) => (
          <RevealSection key={s.name} delay={index * 100}>
            <article className={styles.card}>
              <h3 className={styles.cardTitle}>{s.name}</h3>
              <p className={styles.description}>{s.description}</p>
              {index === 2 && (
                <p className={styles.trainingHighlight}>{t.services.training.trainingHighlight}</p>
              )}
              <ul className={styles.deliverables}>
                {s.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <p className={styles.pricing}>{s.pricing}</p>
            </article>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}
