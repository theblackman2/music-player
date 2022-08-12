import "./App.css";
import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PlayLists from "./components/pages/PlayLists/PlayLists";
import Artists from "./components/pages/Artists/Artists";
import SpotifyWebApi from "spotify-web-api-js";
import { appContext } from "./contexts";
import { useState, useEffect } from "react";

const spotify = new SpotifyWebApi();

export default function App() {
  const [token, setToken] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [playingSongUris, setPlayingSongUris] = useState([]);

  const chooseSong = (uris) => {
    setPlayingSongUris(uris);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      spotify.setAccessToken(token);
    }
    setLoaded(true);
  }, []);

  return (
    <appContext.Provider value={{ token, spotify, playingSongUris, chooseSong }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !token && loaded ? <Navigate to="/login" replace /> : <Home />
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="playlists" element={<PlayLists />} />
          <Route path="artists" element={<Artists />} />
        </Routes>
      </BrowserRouter>
    </appContext.Provider>
  );
}
