import React from "react";
import styles from "../css/Header.module.css";

function Header() {
  return (
    <div className={styles.title}>
      <h1 className={styles.h1}>Jammming</h1>
      <p className={styles.p}>
        An app that allows users to search for songs and seamlessly add them
        directly to their Spotify playlists.
      </p>
    </div>
  );
}

export default Header;
