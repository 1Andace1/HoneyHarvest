import React from 'react';
import styles from './Page404.module.css'; // Импорт стилей из CSS-модуля

const Page404 = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 Not Found</h1>
      <p className={styles.message}>Страница, которую вы ищете, не существует.</p>
    </div>
  );
};

export default Page404;