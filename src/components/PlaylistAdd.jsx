import React, { useState } from "react";
import styles from "../css/PlaylistAdd.module.css";
import { savePlaylist } from "../utilities/Spotify";

function PlaylistAdd(props) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    savePlaylist(name ? name : "New Playlist", props.added).then((res) =>
      setName("")
    );
    props.remove();
  }

  return (
    <div className={styles.addPlaylist}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          value={name}
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter the name of the playlist"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default PlaylistAdd;
