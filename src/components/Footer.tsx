import { useLanguage } from '../hooks/useLanguage';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <p>{t.footer.copyright}</p>
    </footer>
  );
}
