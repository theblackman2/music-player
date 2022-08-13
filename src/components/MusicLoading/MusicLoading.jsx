import styled from "styled-components";

function MusicLoading() {
  return (
    <Container>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
      <div className="item"></div>
    </Container>
  );
}

export default MusicLoading;

const Container = styled.div`
  overflow-x: scroll;
  display: flex;
  gap: 1rem;

  .item {
    width: 150px;
    min-width: 150px;
    height: 200px;
    background-color: #716d67;
    position: relative;
    overflow: hidden;
  }

  .item:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100px);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: loading 0.8s infinite;
  }
  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;
