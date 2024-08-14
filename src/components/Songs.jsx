import React, { useState } from "react";
import Search from "./Search";
import Tracklist from "./Tracklist";

function Songs(props) {
  const [songs, setSongs] = useState([]);

  return (
    <div className="box">
      <Search setSongs={setSongs} />
      <Tracklist
        songs={songs}
        addSong={props.addSong}
        isPlus={true}
        text="Songs will appear here once you search."
      />
    </div>
  );
}

export default Songs;
