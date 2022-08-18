import styled from "styled-components";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout";
import { appContext } from "../../../contexts";
import { useState } from "react";
import { useEffect } from "react";
import PlayIcon from "./../../../assets/play.png";

function Album() {
  const navigate = useNavigate();
  const { albumId } = useParams();
  const { spotify, closeSearching, setPlayingSongUris } =
    useContext(appContext);

  useEffect(() => closeSearching, [albumId]);

  const [album, setAlbum] = useState({});
  const [loadingAlbum, setLoadingAlbum] = useState(true);

  const goBack = () => {
    navigate(-1);
  };

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  useEffect(() => {
    const album = spotify.getAlbum(albumId);
    album.then((data) => setAlbum(data)).then(() => setLoadingAlbum(false));
  }, []);

  const musics =
    Object.keys(album).length > 0 ? (
      album.tracks.items.map((item, index) => {
        const name = item.name;
        const duration = millisToMinutesAndSeconds(item.duration_ms);
        const artist = item.artists[0].name;
        const uri = item.uri;

        return (
          <Music onClick={() => setPlayingSongUris([uri])} key={index}>
            <div className="music-left">
              <img src={album.images[2].url} alt={`${name} cover`} />
              <div>
                <p className="track-name">{name}</p>
                <p className="track-artist">{artist}</p>
              </div>
            </div>
            <p className="duration">{duration}</p>
            <img src={PlayIcon} alt="Play" />
          </Music>
        );
      })
    ) : (
      <div></div>
    );

  // console.log(spotify.getAlbum(albumId));
  const page = (
    <Container>
      {loadingAlbum ? (
        <Load>
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </Load>
      ) : (
        <>
          <div className="album-header">
            <button
              onClick={() => setPlayingSongUris([album.uri])}
              className="play"
            >
              <img src={PlayIcon} alt="play" />
            </button>
            <div className="filter"></div>
            <div className="album-image">
              <img src={album.images[0].url} alt={`${album.name} cover`} />
            </div>
            <button onClick={goBack} className="back-btn">
              Back
            </button>
            <div className="album-infos">
              <h1 className="album-name">{album.name}</h1>
              <h2 className="album-artist">{album.artists[0].name}</h2>
              <p className="album-label">{album.label}</p>
              <div className="others">
                <p className="album-date">{album.release_date}</p>
                <p className="album-songs-count">{`${album.tracks.total} song${
                  album.tracks.total > 1 ? "s" : ""
                }`}</p>
              </div>
            </div>
          </div>
          <div className="musics">{musics}</div>
        </>
      )}
    </Container>
  );
  return <Layout page={page} />;
}

export default Album;

const Container = styled.div`
  padding: 2rem;

  .album-header {
    width: 100%;
    height: 250px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 3rem;
  }

  .back-btn {
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    z-index: 2;
    font-weight: bold;
    padding: 0.5rem;
    // background-color: #766961;
  }

  .album-infos {
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .others {
    display: flex;
    gap: 2rem;
  }

  .musics {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .play {
    z-index: 2;
    position: absolute;
    right: 1.5rem;
    bottom: 1.5rem;
  }

  .album-image {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .album-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Music = styled.div`
  width: 100%;
  height: 60px;
  background-color: #716d67;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  cursor: pointer;

  .music-left {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .music-left img {
    width: 50px;
    height: 50px;
  }

  .music-left div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .track-name {
    font-weight: bold;
  }
`;

const Load = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - 80px);

  .lds-facebook {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-facebook div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: #fff;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  .lds-facebook div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
  }
  .lds-facebook div:nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
  }
  .lds-facebook div:nth-child(3) {
    left: 56px;
    animation-delay: 0;
  }
  @keyframes lds-facebook {
    0% {
      top: 8px;
      height: 64px;
    }
    50%,
    100% {
      top: 24px;
      height: 32px;
    }
  }
`;
