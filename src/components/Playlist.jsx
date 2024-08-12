import React, { useState } from "react";
import Track from "./Track";
import { savePlaylist } from "../utilities/Spotify";

function Playlist(props) {
  const [playlistName, setPlaylistName] = useState("");

  const handleChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const handleClick = (e) => {
    savePlaylist(
      playlistName ? playlistName : "New Playlist",
      props.added
    ).then((res) => setPlaylistName(""));
    props.removeSongs();
  };

  return (
    <div className="box">
      <div className="playlist">
        {props.added.length > 0 && (
          <div className="search-box name-playlist">
            <input
              value={playlistName}
              type="text"
              placeholder="Enter the name of the playlist"
              onChange={handleChange}
            />
          </div>
        )}
        {props.added.map((song) => (
          <Track
            name={song.name}
            artist={song.artist}
            album={song.album}
            id={song.id}
            key={song.id}
            addSong={props.addSong}
            plusIcon={false}
          />
        ))}
      </div>
      {props.added.length > 0 && (
        <div
          className="create"
          style={{
            height: 50,
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <button onClick={handleClick}>Create</button>
        </div>
      )}
    </div>
  );
}

export default Playlist;
