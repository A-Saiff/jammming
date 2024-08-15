const baseUrl = "https://api.spotify.com/v1";

const getAuthAccessToken = () => {
  let access_token = sessionStorage.getItem("authorized_access_token");
  let expires_in = sessionStorage.getItem("auth_expires_in");

  if (!access_token || expires_in < Date.now()) {
    if (window.location.hash.includes("access_token")) {
      let paramObj = new URLSearchParams(window.location.hash.slice(1));
      access_token = paramObj.get("access_token");
      expires_in = paramObj.get("expires_in");

      sessionStorage.setItem("authorized_access_token", access_token);
      sessionStorage.setItem(
        "auth_expires_in",
        Date.now() + parseInt(expires_in) * 1000
      );

      window.history.pushState({}, null, window.location.pathname);
    } else {
      window.location =
        "https://accounts.spotify.com/authorize?client_id=1e7ef874eb474e4498ffff2c49f57c07&response_type=token&redirect_uri=https://jammwithspotify.netlify.app/&scope=playlist-modify-public";
    }
  }

  return access_token;
};

export const search = async (item) => {
  const response = await fetch(`${baseUrl}/search?type=track&q=${item}`, {
    headers: {
      Authorization: "Bearer " + getAuthAccessToken(),
    },
  });
  const jsonResponse = await response.json();
  if (jsonResponse.tracks) {
    return jsonResponse.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.album.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  }
  return [];
};

export const savePlaylist = async (name, tracks) => {
  let access_token = getAuthAccessToken();
  let userResponse = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });
  let userData = await userResponse.json();
  let userID = userData.id;

  let playlistResponse = await fetch(
    `https://api.spotify.com/v1/users/${userID}/playlists`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: `New Playlist Created on ${Date.now()}`,
      }),
    }
  );
  let playlist = await playlistResponse.json();
  let playlistID = playlist.id;

  let addedItemsResponse = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: tracks.map((track) => track.uri),
      }),
    }
  );
  await addedItemsResponse.json();
};
