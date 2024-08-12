import React, { useEffect, useState } from "react";
import Track from "./Track";
import { search, savePlaylist } from "../utilities/Spotify";

function Songs(props) {
  const [songName, setSongName] = useState("");

  const handleChange = (e) => {
    setSongName(e.target.value);
  };

  useEffect(() => {
    search(songName).then(props.setSongs);
  }, [songName]);

  return (
    <div className="box">
      <div className="search-box">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="30"
          height="30"
          viewBox="0 0 50 50"
        >
          <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
        </svg>
        <input
          type="text"
          value={songName}
          placeholder="Search for a song"
          onChange={handleChange}
        />
      </div>
      {props.songs.map((song) => (
        <Track
          name={song.name}
          artist={song.artist}
          album={song.album}
          id={song.id}
          key={song.id}
          addSong={props.addSong}
          track={song}
          plusIcon={true}
        />
      ))}
    </div>
  );
}

export default Songs;
