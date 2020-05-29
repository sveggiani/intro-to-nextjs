import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.homepageLink}>
          <span role="img" aria-label="Homepage link">
            🏠
          </span>
        </a>
      </Link>

      <h1 className={styles.title}>Welcome to Next.js Introduction</h1>

      <p className={`${styles.appName} text-small`}>
        Running: <code>{process.env.NEXT_PUBLIC_APP_NAME}</code>
      </p>
    </div>
  );
}
