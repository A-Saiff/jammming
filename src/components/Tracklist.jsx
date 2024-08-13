import React from "react";
import styles from "../css/Tracklist.module.css";
import Track from "./Track";

function Tracklist(props) {
  return (
    <div className={styles.tracklist}>
      {props.songs.map((song) => (
        <Track
          name={song.name}
          artist={song.artist}
          album={song.album}
          addSong={props.addSong}
          track={song}
          plusIcon={props.isPlus}
          key={song.id}
        />
      ))}
    </div>
  );
}

export default Tracklist;
