import styled from "styled-components";

function MusicPreview({ title, artist, duration, imageUrl }) {
  return (
    <Container>
      <img className="music-image" src={imageUrl} alt={`${title} cover`} />
      <div className="music-infos">
        <h2 className="music-title">{title}</h2>
        <h3 className="music-artist">{artist}</h3>
        <p className="music-duration">{duration}</p>
      </div>
    </Container>
  );
}

export default MusicPreview;

const Container = styled.div`
  width: 150px;
  height: 200px;
  background-color: #5e5461;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  position: relative;
  cursor: pointer;

  .music-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .music-infos {
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 1;
    text-shadow: 1px 1px 4px black;
  }

  .music-title {
    font-size: 20px;
    font-weight: 600;
  }

  .music-artist {
    font-size: 15px;
    font-weight: 400;
  }
`;
