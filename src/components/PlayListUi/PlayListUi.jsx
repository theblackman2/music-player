import styled from "styled-components";
import { Link } from "react-router-dom";
import PlayIcon from './../../assets/play.png'

function PlayListUi({ name, description, imageUrl, id }) {
  return (
    <Container>
      <Link to={`./${id}`} className="play">
        <button>
          <img src={PlayIcon} alt="Play" />
        </button>
      </Link>
      <img className="playlist-image" src={imageUrl} alt={`${name} cover`} />
      <div className="playlist-infos">
        <h2 className="playlist-name">{name}</h2>
        <p className="playlist-description">{description}</p>
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
  cursor: pointer;
  position: relative;

  .play {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    padding: 1rem;
    transition: .3s;
    z-index: 3;
    align-items: flex-end;
    justify-content: flex-end;
  }

  .play:hover {
    opacity: 1;
  }

  .playlist-image {
    width: 50%;
    height: 100%;
    object-fit: cover;
  }

  .playlist-infos {
    display: flex;
    flex-direction: column;
    padding: 8px;
    gap: 15px;
  }

  .playlist-name {
    font-size: 16px;
    font-weight: bold;
  }

  .playlist-description {
    font-size: 12px;
  }
`;
