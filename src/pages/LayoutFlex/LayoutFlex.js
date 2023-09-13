import styles from './LayoutFlex.module.scss';

// Layout Flex Page

const LayoutFlex = () => (
  <>
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={`${styles.headerContent} ${styles.container}`}>
          <p className={styles.headerText}>header</p>
        </div>
      </div>
      <nav className={`${styles.navigation} ${styles.container}`}>
        <p className={styles.navigationText}>navigation</p>
      </nav>
    </header>

    <main>
      <section className={styles.mainSection}>
        <div className={styles.mainContainer}>
          <div className={styles.mainContent}>
            <h1 className={styles.mainHeading}>content</h1>
          </div>
          <div className={styles.sidebarWrapper}>
            <aside className={styles.sidebar}>
              <p className={styles.sidebarText}>sidebar</p>
            </aside>
          </div>
        </div>
      </section>
    </main>

    <footer className={styles.footer}>
      <div className={`${styles.footerContainer} ${styles.container}`}>
        <p className={styles.footerText}>footer</p>
      </div>
    </footer>
  </>
);

export default LayoutFlex;
