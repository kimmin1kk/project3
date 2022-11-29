import React from "react";
import styles from "../styles/Header.module.css";
function Header(props) {
  return (
    <div>
      <h3 className={styles.header}>과제 관리 시스템</h3>
    </div>
  );
}

export default Header;
