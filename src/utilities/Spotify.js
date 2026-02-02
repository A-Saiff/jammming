const baseUrl = "https://api.spotify.com/v1";

function generateRandomString(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

const getAuthAccessToken = async () => {
  let access_token = sessionStorage.getItem("authorized_access_token");
  let expires_at = sessionStorage.getItem("auth_expires_at");

  if (access_token && expires_at > Date.now()) {
    return access_token;
  }

  const code = new URLSearchParams(window.location.search).get("code");

  // STEP A: If no code → redirect to Spotify
  if (!code) {
    const clientId = "1e7ef874eb474e4498ffff2c49f57c07";
    const redirectUri = "https://jammwithspotify.netlify.app/";
    const scope = "playlist-modify-public";

    const codeVerifier = generateRandomString(128);
    localStorage.setItem("code_verifier", codeVerifier);

    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const authUrl =
      "https://accounts.spotify.com/authorize" +
      "?client_id=" + clientId +
      "&response_type=code" +
      "&redirect_uri=" + encodeURIComponent(redirectUri) +
      "&scope=" + encodeURIComponent(scope) +
      "&code_challenge_method=S256" +
      "&code_challenge=" + codeChallenge;

    window.location = authUrl;
    return;
  }

  // STEP B: Exchange code for access token
  const codeVerifier = localStorage.getItem("code_verifier");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "client_id=1e7ef874eb474e4498ffff2c49f57c07" +
      "&grant_type=authorization_code" +
      "&code=" + code +
      "&redirect_uri=" + encodeURIComponent("https://jammwithspotify.netlify.app/") +
      "&code_verifier=" + codeVerifier,
  });

  const data = await response.json();

  access_token = data.access_token;
  const expires_in = data.expires_in;

  sessionStorage.setItem("authorized_access_token", access_token);
  sessionStorage.setItem(
    "auth_expires_at",
    Date.now() + expires_in * 1000
  );

  window.history.replaceState({}, null, "/");

  return access_token;
};


export const search = async (item) => {
  const token = await getAuthAccessToken();

  const response = await fetch(`${baseUrl}/search?type=track&q=${item}`, {
    headers: {
      Authorization: "Bearer " + token,
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
  let access_token = await getAuthAccessToken();
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
