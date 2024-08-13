import React from "react";
import PlaylistAdd from "./PlaylistAdd";
import Tracklist from "./Tracklist";

function Playlist(props) {
  return (
    <div className="box">
      <Tracklist songs={props.added} addSong={props.addSong} isPlus={false} />
      {props.added.length > 0 && (
        <PlaylistAdd added={props.added} remove={props.removeSongs} />
      )}
    </div>
  );
}

export default Playlist;
