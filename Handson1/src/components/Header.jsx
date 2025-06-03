import styles from "./Header.module.css";

const Header = ({ title, navLinks }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {navLinks && navLinks.length > 0 && (
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navLinks.map(({ label, href }) => (
              <li key={href} className={styles.navItem}>
                <a href={href} className={styles.navLink}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
