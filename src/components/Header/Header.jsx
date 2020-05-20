import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles['homepage-link']}>
          <span role="img" aria-label="Homepage link">
            🏠
          </span>
        </a>
      </Link>
      <h1 className={styles.title}>Bienviendo a la Introducción a Next.js</h1>
    </div>
  );
}
