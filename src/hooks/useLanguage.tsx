import { createContext, useContext, useState, type ReactNode } from 'react';
import { translations, type Locale, type Translations } from '../i18n';

interface LanguageContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    const stored = localStorage.getItem('locale');
    return stored === 'th' ? 'th' : 'en';
  });

  const handleSetLocale = (next: Locale) => {
    setLocale(next);
    localStorage.setItem('locale', next);
    document.documentElement.lang = next;
  };

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], setLocale: handleSetLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
