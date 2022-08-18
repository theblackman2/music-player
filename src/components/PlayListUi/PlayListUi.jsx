import styled from "styled-components";
import { Link } from "react-router-dom";
import PlayIcon from "./../../assets/play.png";
import Uknow from "./../../assets/uknown.png";
import { useContext } from "react";
import { appContext } from "../../contexts";

function PlayListUi({ name, description, imageUrl, id, uri }) {
  const { setPlayingSongUris } = useContext(appContext);
  return (
    <Container>
      <Link className="playlist-image" to={`/playlists/${id}`}>
        <img src={imageUrl === "" ? Uknow : imageUrl} alt={`${name} cover`} />
      </Link>

      <div className="playlist-infos">
        <Link to={`/playlists/${id}`}>
          <h2 className="playlist-name">{name}</h2>
        </Link>
        <p
          className="playlist-description"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
        <button onClick={() => setPlayingSongUris([uri])} className="play-btn">
          <img src={PlayIcon} alt="play" />
        </button>
      </div>
    </Container>
  );
}

export default PlayListUi;

const Container = styled.div`
  width: 350px;
  min-width: 350px;
  height: 200px;
  background-color: #5e5461;
  display: flex;
  position: relative;
  overflow: hidden;

  .playlist-image {
    width: 50%;
    height: 100%;
  }

  .playlist-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .play-btn {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }

  .playlist-infos {
    width: 50%;
    display: flex;
    flex-direction: column;
    padding: 8px;
    gap: 15px;
    position: relative;
  }

  .playlist-name {
    font-size: 16px;
    font-weight: bold;
  }

  .playlist-description {
    font-size: 12px;
  }
`;
