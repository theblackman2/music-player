import { Link } from "react-router-dom";
import styled from "styled-components";
import PlayIcon from "./../../assets/play.png";

function AlbumUi({ id, imageUrl, name, date, artist, artistId }) {
  return (
    <Link to={`/albums/${id}`}>
      <Contaner>
        <img src={PlayIcon} alt="play" className="play" />
        <div className="album-image">
          <img src={imageUrl} alt={`${name} cover`} />
        </div>
        <h2 className="album-name">{name}</h2>
        <h3 className="album-artist">{artist}</h3>
        <p className="album-date">{date}</p>
      </Contaner>
    </Link>
  );
}

export default AlbumUi;

const Contaner = styled.div`
  width: 200px;
  min-height: 280px;
  background-color: rgba(178, 178, 178, 0.6);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  cursor: pointer;
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
