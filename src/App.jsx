import "./App.css";
import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PlayLists from "./components/pages/PlayLists/PlayLists";
import Artists from "./components/pages/Artists/Artists";
import SpotifyWebApi from "spotify-web-api-js";
import { appContext } from "./contexts";
import { useState, useEffect } from "react";
import PlayList from "./components/pages/PlayList/PlayList";
import Artist from "./components/pages/Artist/Artist";
import Album from "./components/pages/Album/Album";

const spotify = new SpotifyWebApi();

export default function App() {
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);
  const [token, setToken] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [playingSongUris, setPlayingSongUris] = useState([]);
  const [mustLogin, setMustLogin] = useState(false);
  const [searching, setSearching] = useState(false);

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
      user
        .then((data) => setUser(data))
        .catch((error) => {
          if (
            error.response ===
            `{\n  \"error\": {\n    \"status\": 401,\n    \"message\": \"The access token expired\"\n  }\n}`
          ) {
            setMustLogin(true);
          }
        })
        .then(() => setLoadingUser(false));
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
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !token && loaded ? (
                <Navigate to="/login" replace />
              ) : mustLogin ? (
                <Navigate to="/login" replace />
              ) : (
                <Home />
              )
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="playlists" element={<PlayLists />}></Route>
          <Route path="playlists/:id" element={<PlayList />} />
          <Route path="artists" element={<Artists />} />
          <Route path="artists/:id" element={<Artist />} />
          <Route path="albums/:albumId" element={<Album />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </appContext.Provider>
  );
}
