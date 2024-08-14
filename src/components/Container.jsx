import React, { useState } from "react";
import Songs from "./Songs";
import Playlist from "./Playlist";
import styles from "../css/Container.module.css";

function Container() {
  const [addedSongs, setAddedSongs] = useState([]);

  const addSong = (song) => {
    if (addedSongs.some((added) => added.id === song.id)) {
      return;
    }
    setAddedSongs((prev) => [...prev, song]);
  };

  const removeSongs = () => {
    setAddedSongs([]);
  };

  return (
    <div className={styles.container}>
      <Songs addSong={addSong} />
      <Playlist
        added={addedSongs}
        removeSongs={removeSongs}
        setAdded={setAddedSongs}
      />
    </div>
  );
}

export default Container;
