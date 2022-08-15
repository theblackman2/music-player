import { Link } from "react-router-dom";
import styled from "styled-components";
import PlayIcon from "./../../assets/play.png";

function AlbumUi({ id, imageUrl, name, date }) {
  return (
    <Contaner>
      <Link to={`./albums/${id}`}>
        <img src={PlayIcon} alt="play" className="play" />
        <div className="album-image">
          <img src={imageUrl} alt={`${name} cover`} />
        </div>
        <h2 className="album-name">{name}</h2>
        <p className="album-date">{date}</p>
      </Link>
    </Contaner>
  );
}

export default AlbumUi;

const Contaner = styled.div`
  width: 200px;
  height: 280px;
  background-color: rgba(178, 178, 178, 0.6);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  transition: 0.5s ease;

  :hover {
    background-color: rgba(178, 178, 178, 0.3);
  }

  :hover > .play {
    display: block;
  }

  .play {
    position: absolute;
    right: 14px;
    top: 176px;
    transition: 0.3s;
    display: none;
  }

  .album-image {
    width: 100%;
    height: 200px;
  }

  .album-image img {
    width: 100%;
    height: 100%;
  }

  .album-name {
    font-size: 16px;
  }

  .album-date {
    font-size: 14px;
  }
`;
