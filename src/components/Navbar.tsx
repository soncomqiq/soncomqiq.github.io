import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { LanguageSwitcher } from './LanguageSwitcher';
import styles from './Navbar.module.css';

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          NK
        </NavLink>
        <ul className={styles.links}>
          <li><NavLink to="/" end>{t.nav.home}</NavLink></li>
          <li><NavLink to="/projects">{t.nav.projects}</NavLink></li>
          <li><NavLink to="/services">{t.nav.services}</NavLink></li>
          <li><NavLink to="/contact">{t.nav.contact}</NavLink></li>
        </ul>
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
