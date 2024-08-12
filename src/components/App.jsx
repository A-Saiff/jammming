import React, { useState } from "react";
import "../css/App.css";
import Header from "./Header";
import Songs from "./Songs";
import Playlist from "./Playlist";

function App() {
  const [addedSongs, setAddedSongs] = useState([]);
  const [songs, setSongs] = useState([]);

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
    <>
      <Header />
      <div className="container">
        <Songs songs={songs} setSongs={setSongs} addSong={addSong} />
        <Playlist added={addedSongs} removeSongs={removeSongs} />
      </div>
    </>
  );
}

export default App;
