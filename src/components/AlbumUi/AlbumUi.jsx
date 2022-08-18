import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { appContext } from "../../contexts";
import PlayIcon from "./../../assets/play.png";

function AlbumUi({ id, imageUrl, name, date, artist, uri }) {
  const { setPlayingSongUris } = useContext(appContext);
  return (
    <Contaner>
      <img
        onClick={() => setPlayingSongUris([uri])}
        src={PlayIcon}
        alt="play"
        className="play"
      />
      <div className="album-image">
        <Link to={`/albums/${id}`}>
          <img src={imageUrl} alt={`${name} cover`} />
        </Link>
      </div>
      <Link to={`/albums/${id}`}>
        <h2 className="album-name">{name}</h2>
      </Link>
      <h3 className="album-artist">{artist}</h3>
      <p className="album-date">{date}</p>
    </Contaner>
  );
}

export default AlbumUi;

const Contaner = styled.div`
  width: 200px;
  min-width: 200px;
  min-height: 280px;
  background-color: rgba(178, 178, 178, 0.6);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  position: relative;
  transition: 0.5s ease;

  :hover {
    background-color: rgba(178, 178, 178, 0.3);
  }

  .play {
    position: absolute;
    right: 14px;
    top: 176px;
    transition: 0.3s;
    cursor: pointer;
  }

  .album-image {
    width: 100%;
    height: 200px;
  }

  .album-image img {
    width: 100%;
    height: 100%;
  }

  .album-artist {
    font-size: 12px;
  }

  .album-name {
    font-size: 16px;
  }

  .album-date {
    font-size: 14px;
  }
`;
