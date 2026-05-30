import { useLanguage } from '../hooks/useLanguage';
import { RevealSection } from '../components/RevealSection';
import styles from './Contact.module.css';

export function Contact() {
  const { t } = useLanguage();

  return (
    <section className={styles.section}>
      <RevealSection>
        <h2 className={styles.title}>{t.contact.title}</h2>
        <p className={styles.subtitle}>{t.contact.subtitle}</p>
      </RevealSection>

      <RevealSection delay={80}>
        <div className={styles.details}>
          <p>
            <strong>{t.contact.emailLabel}:</strong> {t.contact.emailValue}
          </p>
          <p>
            <strong>{t.contact.phoneLabel}:</strong> {t.contact.phoneValue}
          </p>
        </div>
      </RevealSection>

      <RevealSection delay={160}>
        <div className={styles.actions}>
          <a
            href="mailto:nuttachai.ku@hotmail.com?subject=Project%20Inquiry"
            className={styles.primary}
          >
            {t.contact.email}
          </a>
          <a
            href="https://linkedin.com/in/nuttachai-kulthammanit"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            {t.contact.linkedin}
          </a>
        </div>
      </RevealSection>

      <RevealSection delay={240}>
        <p className={styles.response}>{t.contact.response}</p>
      </RevealSection>
    </section>
  );
}
