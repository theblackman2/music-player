import "./Login.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./../Loading/Loading";
import SpotifyIcon from './../../../assets/icons/spotify.png'
import GoogleIcon from './../../../assets/icons/google.png'
import Casques from './../../../assets/casques.png'
import BackAnimated from './../../../assets/back.gif'
// import BackAnimated from './../../../assets/animated-back.gif'

function Login() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
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
    const timeOut = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeOut);
  }, []);

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

  return loading ? (
    <Loading />
  ) : (
    <div className="login-page">
      <img className="background" src={BackAnimated} alt="Animated back" />
      <span className="filter"></span>
      <div className="login-img">
        <img src={Casques} alt="Casques" />
      </div>
      <div className="login-text">
        <h1>Spot Music by TheBlackMan</h1>
        <p>
          Imaginez toutes les musiques du monde en un seul endroit, tout ce que vous aimez écouter, écoutez les sans arrêt et sans dépenser un seul sous.
        </p>
        <button onClick={login} className="login-btn">
          Connexion
          <img src={SpotifyIcon} alt="Spotify icon" />
          <img src={GoogleIcon} alt="Google icon" />
        </button>
      </div>
    </div>
  );
}

export default Login;
