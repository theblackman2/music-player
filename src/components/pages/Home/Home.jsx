import "./Home.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import Layout from "../../Layout";

function Home() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [logedIn, setLogedIn] = useState(true);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const setUserInfos = (data) => {
    const userId = data.id;
    const userUri = data.uri;
    const userName = data.display_name;
    const userEmail = data.email;
    return {
      id: userId,
      name: userName,
      email: userEmail,
      uri: userUri,
    };
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      navigate("/login");
    }
  }, [logedIn]);

  const logOut = () => {
    localStorage.removeItem("token");
    setLogedIn(false);
  };

  useEffect(() => {
    axios({
      url: "https://api.spotify.com/v1/me",
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => setUser(setUserInfos(response.data)))
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, [token]);

  const page = loading ? (
    <Loading />
  ) : (
    <div className="home-page">
      <h1>Bienvenue {user.name}</h1>
      <p>Votre adresse email est {user.email}</p> <br />
      <button onClick={logOut}>Déconnexion</button>
    </div>
  );

  return <Layout page = {page} />
}

export default Home;
