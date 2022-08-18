import styled from "styled-components";
import { AiFillPlayCircle } from 'react-icons/ai'
import { useContext } from "react";
import { appContext } from "../../contexts";

function JumpBack({ musics }) {
  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const { setPlayingSongUris } = useContext(appContext);

  const musicsUi =
    musics.length > 0 ? (
      musics.map((item, index) => {
        const uri = item.track.uri
        const title = item.track.name;
        const imageUrl = item.track.album.images[2].url;
        const duration = millisToMinutesAndSeconds(item.track.duration_ms);
        const artist = item.track.artists[0].name;

        return (
          <Music onClick={() => setPlayingSongUris([uri])} key={index}>
            <div className="play"><AiFillPlayCircle /></div>
            <div className="music-infos">
              <img
                src={imageUrl}
                alt={`${title} cover`}
                className="music-img"
              />
              <div>
                <p className="music-title">{title}</p>
                <p className="music-artist">{artist}</p>
              </div>
            </div>
            <span className="music-duration">{duration}</span>
          </Music>
        );
      })
    ) : (
      <h3>No history</h3>
    );
  return (
    <Container>
      <h2 className="section-title">Jump back in</h2>
      <div className="musics">{musicsUi}</div>
    </Container>
  );
}

export default JumpBack;

const Container = styled.div`
  width: 60%;
  height: 300px;
  background-color: #26202c;
  padding: 1rem;
  overflow: scroll;
  position: relative;

  .section-title {
    position: sticky;
    top: -1rem;
    width: 100%;
    padding: 0.5rem;
    background-color: #26202c;
    z-index: 4;
  }

  .musics {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Music = styled.div`
  width: 100%;
  height: 60px;
  background-color: #716d67;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 1rem;
  cursor: pointer;
  position: relative;

  .play {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 8rem;
    font-size: 16px;
    opacity: 0;
    transition: .3s;
  }

  .play:hover {
    opacity: 1;
  }

  .music-infos {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .music-title {
    font-size: 15px;
    font-weight: bold;
    margin-bottom : 3px;
  }

  .music-artist {
    font-size: 12px;
  }

  .music-img {
    height: 100%;
  }
`;
