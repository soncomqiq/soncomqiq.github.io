import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PageTransition } from './PageTransition';
import { useScrollToTop } from '../hooks/useScrollToTop';
import styles from './Layout.module.css';

export function Layout() {
  useScrollToTop();

  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
