import { type ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';
import styles from './RevealSection.module.css';

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function RevealSection({ children, className = '', delay = 0 }: RevealSectionProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${isVisible ? styles.visible : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
