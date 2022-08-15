import { Link } from "react-router-dom";
import styled from "styled-components";

function ArtistUi({ name, followers, imageUrl, id }) {
  return (
    <Link to={`./${id}`}>
      <Container>
        <div className="artist-image">
          <img src={imageUrl} alt={`${name} cover`} />
        </div>
        <h2 className="artist-name">{name}</h2>
        <p className="artist-followers">{followers} followers</p>
      </Container>
    </Link>
  );
}

export default ArtistUi;

const Container = styled.div`
  width: 150px;
  min-width: 150px;
  height: 200px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  cursor: pointer;
  padding: 12px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  .artist-image {
    width: 128px;
    height: 128px;
    border-radius: 100%;
  }

  .artist-image img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .artist-name {
    font-weight: 700;
    font-size: 14px;
  }

  .artist-followers {
    font-weight: 400;
    font-size: 12px;
  }
`;
