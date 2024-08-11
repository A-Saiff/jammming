const urlForAccessToken = "https://accounts.spotify.com/api/token";
const baseUrl = "https://api.spotify.com/v1";
let accessToken;
const authUrl = "https://accounts.spotify.com/authorize";

document.getElementById("btn").addEventListener("click", () => {
  authorize();
});

const authorize = async () => {
  window.location.href =
    authUrl +
    `?client_id=1e7ef874eb474e4498ffff2c49f57c07&response_type=token&redirect_uri=http://localhost:3000`;
};

const getAccessToken = async () => {
  if (accessToken) {
    return accessToken;
  }
  let response = await fetch(urlForAccessToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&client_id=1e7ef874eb474e4498ffff2c49f57c07&client_secret=6043db5a4b1d40a3a726423ccef912fc",
  });

  let data = await response.json();
  accessToken = data.access_token;
  return accessToken;
};

const search = async (item) => {
  const response = await fetch(`${baseUrl}/search?type=track&q=${item}`, {
    headers: {
      Authorization: "Bearer " + (await getAccessToken()),
    },
  });
  const jsonResponse = await response.json();
  if (jsonResponse.tracks) {
    console.log(
      jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.album.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }))
    );
  } else {
    console.log("Nothing");
  }
};
