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
      <div>Vous n'avez encore rien écouté</div>
    );

  const page = (
    <Container>
      <h2 className="section-title">Ceux que vous écoutez le plus</h2>
      <div className="artists">
        {loadingTopArtists ? (
          <Loading>
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
          </Loading>
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

const Loading = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;

  .item {
    width: 150px;
    min-width: 150px;
    height: 200px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 4px;
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
