import { useContext } from "react";
import styled from "styled-components";
import { appContext } from "../../contexts";
import PlayIcon from "./../../assets/play.png";

function MusicPreview({ title, artist, duration, imageUrl, uri }) {
  const { setPlayingSongUris } = useContext(appContext);

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  return (
    <Container>
      <span className="play">
        <button onClick={() => setPlayingSongUris(uri)}>
          <img src={PlayIcon} alt="Play" />
        </button>
      </span>
      <img className="music-image" src={imageUrl} alt={`${title} cover`} />
      <div className="music-infos">
        <h2 className="music-title">{title.slice(0, 20)}</h2>
        <h3 className="music-artist">{artist}</h3>
        <p className="music-duration">{millisToMinutesAndSeconds(duration)}</p>
      </div>
    </Container>
  );
}

export default MusicPreview;

const Container = styled.div`
  width: 150px;
  min-width: 150px;
  height: 220px;
  background-color: #26202c;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  position: relative;

  .play {
    position: absolute;
    top: 0;
    padding-top: 50%;
    padding-left: 70%;
    left: 0;
    display: bloc;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: 0.3s;
  }

  .play:hover {
    opacity: 1;
  }

  .music-image {
    width: 100%;
    height: 50%;
  }

  .music-infos {
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 1;
  }

  .music-title {
    font-size: 15px;
    font-weight: 600;
  }

  .music-artist {
    font-size: 12px;
    font-weight: 400;
  }

  .music-duration {
    font-size: 11px;
  }
`;
