import styled from "styled-components";
import { useParams } from "react-router-dom";
import Layout from "../../Layout";
import { useContext, useEffect, useState } from "react";
import { appContext } from "../../../contexts";
import PlayIcon from "./../../../assets/play.png";
import { nanoid } from "nanoid";

function PlayList() {
  const { id } = useParams();
  const [playlist, setPlayList] = useState({});
  const [loadingPlayPlist, setLoadingPlayList] = useState(true);
  const { spotify } = useContext(appContext);

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  useEffect(() => {
    const playlist = spotify.getPlaylist(id);
    playlist
      .then((data) => setPlayList(data))
      .then(() => setLoadingPlayList(false));
  }, []);

  const loader = (
    <Load>
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Load>
  );

  const musics =
    Object.keys(playlist).length > 0 ? (
      playlist.tracks.items.map((item) => {
        return (
          <Music key={nanoid()}>
            <div className="music-left">
              <img
                src={item.track.album.images[2].url}
                alt={`${item.track.name} cover`}
              />
              <div>
                <p className="track-name">{item.track.name}</p>
                <p className="track-artist">
                  {item.track.album.artists[0].name}
                </p>
              </div>
            </div>
            <p className="music-duration">
              {millisToMinutesAndSeconds(item.track.duration_ms)}
            </p>
            <img src={PlayIcon} alt="Play" />
          </Music>
        );
      })
    ) : (
      <div>No musics</div>
    );

  const page = (
    <Container>
      {loadingPlayPlist ? (
        loader
      ) : (
        <>
          <div className="playlist-header">
            <span className="filter"></span>
            <img
              className="playlist-cover"
              src={playlist.images[0].url}
              alt="Playlist cover"
            />
            <h1 className="playlist-name">{playlist.name}</h1>
            <h2 className="playlist-description">{playlist.description}</h2>
            <div className="playlist-infos">
              <p className="playlist-owner">{playlist.owner.display_name}</p>
              <p className="playlist-nb-songs">
                {" "}
                {playlist.tracks.total} chansons
              </p>
              <button>
                <img src={PlayIcon} alt="Play icon" />
              </button>
            </div>
          </div>
          <div className="playlist-body">{musics}</div>
        </>
      )}
    </Container>
  );
  return <Layout page={page} />;
}

export default PlayList;

const Container = styled.div`
  padding: 13px;
  width: 100%;

  .filter {
    position: absolute;
    display: inline-block;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #000;
    opacity: 0.6;
    z-index: 1;
  }

  .playlist-header {
    height: 250px;
    background-color: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 10px;
    padding: 20px;
  }

  .playlist-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
  }

  .playlist-name,
  .playlist-infos,
  .playlist-description {
    z-index: 2;
  }

  .playlist-infos {
    display: flex;
    width: 100%;
    padding: 0 3rem;
    align-items: center;
    justify-content: space-between;
  }

  .playlist-body {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
