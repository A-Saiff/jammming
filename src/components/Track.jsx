import React from "react";
import styles from "../css/Track.module.css";

function Track(props) {
  const handleClick = (e) => {
    props.addSong(props.track);
  };
  const removeClick = (e) => {
    props.setAdded((prev) =>
      props.songs.filter((song) => song !== props.track)
    );
  };

  return (
    <div className={styles.track}>
      <div className={styles.item}>
        <h4>{props.name}</h4>
        <p style={{ fontSize: 10 }}>{props.artist}</p>
      </div>
      <div className={styles.item}>
        <p style={{ fontWeight: 700, fontSize: 13 }}>Album:</p>
        <p style={{ fontSize: 11 }}>{props.album}</p>
      </div>
      {props.plusIcon ? (
        <div className="iconDiv" onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            height="40"
            viewBox="0 0 50 50"
          >
            <path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M37,26H26v11h-2V26H13v-2h11V13h2v11h11V26z"></path>
          </svg>
        </div>
      ) : (
        <div className="iconDiv" onClick={removeClick}>
          <img src="../../minus-svgrepo-com.svg" alt="remove" />
        </div>
      )}
    </div>
  );
}

export default Track;
