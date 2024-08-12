import React from "react";
import styles from "../css/Header.module.css";

function Header() {
  return (
    <div className={styles.title}>
      <h1 style={{ fontSize: 50 }}>
        Ja<span style={{ color: "red" }}>m</span>
        <span style={{ color: "blue" }}>m</span>
        <span style={{ color: "green" }}>m</span>ing
      </h1>
      <p style={{ width: "60%", margin: "20px auto" }}>
        An app that allows users to search for songs and seamlessly add them
        directly to their Spotify playlists.
      </p>
    </div>
  );
}

export default Header;
