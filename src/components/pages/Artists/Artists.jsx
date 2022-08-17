import { useEffect, useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { appContext } from "../../../contexts";
import ArtistUi from "../../ArtistUi/ArtistUi";
import Layout from "../../Layout";

function Artists() {
  const { spotify, user } = useContext(appContext);
  const [topArtists, setTopArtsts] = useState([]);
  const [loadingTopArtists, setLoadingTopArtsts] = useState(true);

  useEffect(() => {
    const artists = spotify.getMyTopArtists();
    artists
      .then((data) => setTopArtsts(data.items))
      .then(() => setLoadingTopArtsts(false));
  }, []);

  const topArtistsUi =
    topArtists.length > 0 ? (
      topArtists.map((item, index) => {
        const id = item.id;
        const name = item.name;
        const followers = item.followers.total;
        const imageUrl = item.images[2].url;

        return (
          <ArtistUi
            key={index}
            name={name}
            id={id}
            followers={followers}
            imageUrl={imageUrl}
          />
        );
      })
    ) : (
      <div>Nothing to show, listen for some musics</div>
    );

  const page = (
    <Container>
      {!loadingTopArtists && (
        <h2 className="section-title">Who you listen the most</h2>
      )}
      <div className="artists">
        {loadingTopArtists ? (
          <Load>
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </Load>
        ) : (
          topArtistsUi
        )}
      </div>
    </Container>
  );
  return <Layout page={page} />;
}

export default Artists;

const Container = styled.div`
  padding: 2rem;

  .section-title {
    margin: 1rem;
  }

  .artists {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    justify-content: space-between;
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
