import styles from './index.less';
import React from 'react';
import HomeTopFloor from "./top-floor";

export default function HomePage() {
  return (
    <div className={styles.home}>
      <HomeTopFloor />
    </div>
  );
}
