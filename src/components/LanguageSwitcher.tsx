import { useLanguage } from '../hooks/useLanguage';
import styles from './LanguageSwitcher.module.css';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <button
      className={styles.switcher}
      onClick={() => setLocale(locale === 'en' ? 'th' : 'en')}
      aria-label="Switch language"
    >
      {locale === 'en' ? 'TH' : 'EN'}
    </button>
  );
}
