import React, { useState } from "react";
import PlaylistAdd from "./PlaylistAdd";
import Tracklist from "./Tracklist";
import { savePlaylist } from "../utilities/Spotify";

function Playlist(props) {
  const [text, setText] = useState(
    "Your playlist will light up here once you start adding songs!"
  );
  const [name, setName] = useState("");
  const [load, setLoad] = useState(false);

  function submit() {
    props.removeSongs();
    setText("");
    setName("");
    setLoad(true);
    savePlaylist(name ? name : "New Playlist", props.added).then((res) => {
      setText("Playlist created! Ready to play!");
      setLoad(false);
      setTimeout(() => {
        setText(
          "Your playlist will light up here once you start adding songs!"
        );
      }, 2000);
    });
  }

  return (
    <div className="box">
      {load && <div className="element"></div>}
      <Tracklist
        songs={props.added}
        addSong={props.addSong}
        isPlus={false}
        text={text}
        setAdded={props.setAdded}
      />
      {props.added.length > 0 && (
        <PlaylistAdd
          added={props.added}
          name={name}
          setName={setName}
          submit={submit}
        />
      )}
    </div>
  );
}

export default Playlist;
