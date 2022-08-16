import "./Home.css";
import Layout from "../../Layout";
import { useContext, useState, useEffect } from "react";
import { appContext } from "../../../contexts";
import styled from "styled-components";
import MusicPreview from "../../MusicPreview/MusicPreview";
import MusicLoading from "../../MusicLoading/MusicLoading";
import { nanoid } from "nanoid";
import JumpBack from "../../JumpBack/JumpBack";

function Home() {
  const [lastPlayed, setLastPlayed] = useState([]);
  const [loadingLatests, setLoadingLatests] = useState(true);
  const { spotify } = useContext(appContext);

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  useEffect(() => {
    const tracs = spotify.getMyRecentlyPlayedTracks();
    tracs
      .then((data) => setLastPlayed(data.items.slice(0, 10)))
      .then(() => setLoadingLatests(false));
  }, []);

  const page = (
    <Container>
      {loadingLatests ? (
        <Load>
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </Load>
      ) : (
        <>
          <div className="head">
            <div className="intro-image">
              <img src="./music.jpg" alt="Intro cover" />
            </div>
            <JumpBack musics={lastPlayed} />
          </div>
        </>
      )}
    </Container>
  );

  return <Layout page={page} />;
}

export default Home;

const Container = styled.div`
  padding: 2rem;

  .songs {
    display: flex;
    overflow-x: scroll;
    gap: 1rem;
  }

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .intro-image {
    width: 40%;
    height: 300px;
  }

  .intro-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Load = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - 80px);

  .lds-facebook {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-facebook div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: #fff;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  .lds-facebook div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
  }
  .lds-facebook div:nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
  }
  .lds-facebook div:nth-child(3) {
    left: 56px;
    animation-delay: 0;
  }
  @keyframes lds-facebook {
    0% {
      top: 8px;
      height: 64px;
    }
    50%,
    100% {
      top: 24px;
      height: 32px;
    }
  }
`;
