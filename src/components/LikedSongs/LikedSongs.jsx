import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { appContext } from "../../contexts";
import PlayIcon from "./../../assets/play.png";

function LikedSongs() {
  const [likedSongs, setLikedSongs] = useState([]);
  const [loadingLikedSongs, setLoadingLikedSongs] = useState(true);

  const { spotify } = useContext(appContext);

  useEffect(() => {
    const liked = spotify.getMySavedTracks();
    liked
      .then((data) => {
        setLikedSongs(data);
      })
      .then(() => setLoadingLikedSongs(false));
  }, []);

  return (
    <Container>
      {loadingLikedSongs ? (
        <Loading>
          <div className="item"></div>
        </Loading>
      ) : (
        <div className="liked-songs">
          <h2>Les chansons que vous aimez</h2>
          <p>Total : {likedSongs.total}</p>
          <button>
            <img src={PlayIcon} alt="Play" />
          </button>
        </div>
      )}
    </Container>
  );
}

export default LikedSongs;

const Container = styled.div`
  width: 350px;
  min-width: 350px;
  height: 200px;
  background-color: #55a891;

  .liked-songs {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: flex-start;
    justify-content: center;
    gap: 0.5rem;
    position: relative;
  }

  .liked-songs h2 {
    font-size: 16px;
  }

  .liked-songs p {
    font-size: 14px;
  }

  .liked-songs button {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
  }
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;

  .item {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .item:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100px);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: loading 0.8s infinite;
  }
  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;
