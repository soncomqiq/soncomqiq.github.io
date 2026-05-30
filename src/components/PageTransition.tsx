import { type ReactNode, useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './PageTransition.module.css';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const { pathname } = useLocation();
  const [show, setShow] = useState(true);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPath.current) {
      setShow(false);
      const timer = setTimeout(() => {
        setShow(true);
        prevPath.current = pathname;
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <div className={`${styles.page} ${show ? styles.enter : styles.exit}`}>
      {children}
    </div>
  );
}
