import "./Login.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const login = () => {
    const clientId = "b309623c655e4a2b9091ac8d77e58bea";
    const redirectUrl = "http://localhost:5173/login";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scopes = [
      "user-read-email",
      "user-read-private",
      "user-library-modify",
      "user-library-read",
      "app-remote-control",
      "streaming",
      "playlist-read-collaborative",
      "playlist-modify-public",
      "playlist-read-private",
      "playlist-modify-private",
      "user-read-recently-played",
      "user-read-playback-position",
      "user-top-read",
      "user-follow-modify",
      "user-follow-read",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      localStorage.setItem("token", token);
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return (
    <div className="login-page">
      <div className="login-img">
        <img src="./casques-img.png" alt="Casques" />
      </div>
      <div className="login-text">
        <h1>Spot Music by TheBlackMan</h1>
        <p>
          Ecouter des millions de chansons partout dans le monde sans limite.
        </p>
        <button onClick={login} className="login-btn">
          Connexion
          <img src="./spotify.png" alt="Spotify icon" />
          <img src="./google.png" alt="Google icon" />
        </button>
      </div>
    </div>
  );
}

export default Login;
