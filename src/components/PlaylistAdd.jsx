import React from "react";
import styles from "../css/PlaylistAdd.module.css";

function PlaylistAdd(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.submit();
  }

  return (
    <div className={styles.addPlaylist}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          value={props.name}
          type="text"
          onChange={(e) => {
            props.setName(e.target.value);
          }}
          placeholder="Enter the name of the playlist"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default PlaylistAdd;
