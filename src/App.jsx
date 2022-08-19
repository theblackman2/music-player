import "./App.css";
// import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import PlayLists from "./components/pages/PlayLists/PlayLists";
import Artists from "./components/pages/Artists/Artists";
import SpotifyWebApi from "spotify-web-api-js";
import { appContext } from "./contexts";
import { useState, useEffect } from "react";
import PlayList from "./components/pages/PlayList/PlayList";
import Artist from "./components/pages/Artist/Artist";
import Album from "./components/pages/Album/Album";
import SpotifyPlayer from "react-spotify-web-playback";
import styled from "styled-components";

const spotify = new SpotifyWebApi();

export default function App() {
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);
  const [token, setToken] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [playingSongUris, setPlayingSongUris] = useState([]);
  const [searching, setSearching] = useState(false);
  const [screenDimensions, setScreenDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showSideBar, setShowSideBar] = useState(false);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [playingSongUris]);

  const detectWidthChange = () => {
    setScreenDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectWidthChange);

    return () => window.removeEventListener("resize", detectWidthChange);
  }, [screenDimensions]);

  const chooseSong = (uris) => {
    setPlayingSongUris(uris);
  };

  const closeSearching = () => {
    setSearchTerm("");
    setSearching(false);
  };

  const openSearching = () => {
    setSearching(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      spotify.setAccessToken(token);
      const user = spotify.getMe();
      user.then((data) => setUser(data)).then(() => setLoadingUser(false));
    }
    setLoaded(true);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <appContext.Provider
      value={{
        token,
        spotify,
        playingSongUris,
        setPlayingSongUris,
        chooseSong,
        user,
        loadingUser,
        searchTerm,
        setSearchTerm,
        searching,
        closeSearching,
        openSearching,
        screenDimensions,
        showSideBar,
        setShowSideBar,
        setToken,
      }}
    >
      <Routes>
        <Route
          path="/"
          element={<Login>Accueil</Login>}
        />
        // <Route path="login" element={<Login>login</Login>} />
        // <Route path="playlists" element={<PlayLists />}></Route>
        // <Route path="playlists/:id" element={<PlayList />} />
        // <Route path="artists" element={<Artists />} />
        // <Route path="artists/:id" element={<Artist />} />
        // <Route path="albums/:albumId" element={<Album />} />
      </Routes>
      {token && (
        <Player>
          <SpotifyPlayer
            styles={{
              activeColor: "#fff",
              bgColor: "#0e0b1e",
              color: "#fff",
              loaderColor: "#fff",
              sliderColor: "#1cb954",
              trackArtistColor: "#ccc",
              trackNameColor: "#fff",
            }}
            autoPlay={true}
            callback={(state) => {
              if (!state.isPlaying) setPlay(false);
            }}
            showSaveIcon={true}
            play={play}
            token={token}
            uris={playingSongUris}
          />
        </Player>
      )}
    </appContext.Provider>
  );
}

const Player = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  right: 0;
  z-index: 10;
`;

const Login = styled.div`
  width: 100%;
  heigth: 100%
`
