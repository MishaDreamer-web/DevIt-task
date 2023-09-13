import styles from './Container.module.scss';

// Site container

export default function Container({ children }) {
  return <div className={styles.container}>{children}</div>;
}
