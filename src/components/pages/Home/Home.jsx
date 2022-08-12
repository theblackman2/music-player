import "./Home.css";
import Layout from "../../Layout";
import { useContext, useState, useEffect } from "react";
import { appContext } from "../../../contexts";
import styled from "styled-components";
import MusicPreview from "../../MusicPreview/MusicPreview";

function Home() {
  const [lastPlayed, setLastPlayed] = useState([]);
  const { spotify } = useContext(appContext);

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  useEffect(() => {
    const tracs = spotify.getMyRecentlyPlayedTracks();
    tracs.then((data) => setLastPlayed(data.items));
  }, []);

  console.log(lastPlayed);

  const lastsUi =
    lastPlayed.length > 0
      ? lastPlayed.map((item) => {
          const imageUrl = item.track.album.images[0].url;
          const id = item.track.id;
          const artist = item.track.artists[0].name;
          const duration = millisToMinutesAndSeconds(item.track.duration_ms);
          const title = item.track.name;
          return (
            <MusicPreview
              key={id}
              title={title}
              artist={artist}
              duration={duration}
              imageUrl={imageUrl}
              id={id}
            />
          );
        })
      : null;

  const page = (
    <Container>
      <h2 className="section-title">Derniers morceaux joués</h2>
      <div className="songs">{lastsUi}</div>
    </Container>
  );

  return <Layout page={page} />;
}

export default Home;

const Container = styled.div`
  padding: 1rem;

  .songs {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;
  }
`;
