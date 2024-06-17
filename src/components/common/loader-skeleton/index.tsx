// components/Loader.tsx
import React from 'react';
import styles from './Loader.module.scss';

type LoaderProps = {
  width?: string;
  height?: string;
};

const Loader: React.FC<LoaderProps> = ({ width = '100px', height = '100px' }) => {
  return (
    <div
      className={styles.loader}
      style={{ '--loader-width': width, '--loader-height': height } as React.CSSProperties}
    ></div>
  );
};

export default Loader;
