import React from "react";
import styles from "../css/Tracklist.module.css";
import Track from "./Track";

const h3Styles = {
  fontSize: 30,
  textAlign: "center",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  fontStyle: "italic",
  color: "black",
  opacity: "0.5",
};

function Tracklist(props) {
  return (
    <div className={styles.tracklist}>
      {props.songs.length == 0 && <h3 style={h3Styles}>{props.text}</h3>}
      {props.songs.map((song) => (
        <Track
          name={song.name}
          artist={song.artist}
          album={song.album}
          addSong={props.addSong}
          track={song}
          plusIcon={props.isPlus}
          key={song.id}
          setAdded={props.setAdded}
          songs={props.songs}
        />
      ))}
    </div>
  );
}

export default Tracklist;
