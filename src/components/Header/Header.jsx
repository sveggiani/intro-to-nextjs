import React from 'react';

import styles from './Header.module.scss';

export default function Header() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bienviendo a la Introducción a Next.js</h1>
    </div>
  );
}
