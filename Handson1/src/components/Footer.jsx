import React from "react";

import styles from "./Footer.module.css";
/**
 * Footer component with year, optional text, and children support.
 */
const Footer = ({ year, text, children }) => {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; {year} {text}
      </p>
      {children}
    </footer>
  );
};
// Provide default props for year (current year) and empty text
Footer.defaultProps = {
  year: new Date().getFullYear(),
  text: "",
};

export default Footer;
