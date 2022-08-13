import { nanoid } from "nanoid";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { appContext } from "../../../contexts";
import Layout from "../../Layout";
import LikedSongs from "../../LikedSongs/LikedSongs";
import PlayListUi from "../../PlayListUi/PlayListUi";

function PlayLists() {
  const { spotify, user } = useContext(appContext);
  const [myPlayLists, setMyPlayLists] = useState([]);
  const [futuredPlaylists, setFuturedPlaylists] = useState([]);
  const [loadingFutured, setLoadingFutured] = useState(true);
  const [likedSongs, setLikedSongs] = useState([]);
  const [loadingLikedSongs, setLoadingLikedSongs] = useState(true);
  const [loadingMyPlayLists, setLoadingMyPlayLists] = useState(true);

  useEffect(() => {
    const myPlayLists = spotify.getUserPlaylists(user.id);
    myPlayLists
      .then((data) => setMyPlayLists(data.items))
      .then(() => setLoadingMyPlayLists(false));
  }, []);

  useEffect(() => {
    const fitured = spotify.getFeaturedPlaylists();
    fitured
      .then((data) => setFuturedPlaylists(data.playlists.items))
      .then(() => setLoadingFutured(false));
  }, []);

  const playListsUi =
    myPlayLists.length > 0 ? (
      myPlayLists.map((item) => {
        const name = item.name;
        const description = item.description;
        const imageUrl = item.images[0].url;
        return (
          <PlayListUi
            key={nanoid()}
            name={name}
            description={description}
            imageUrl={imageUrl}
          />
        );
      })
    ) : (
      <div>Vous n'avez pas encore de playliste</div>
    );

  const futuredUi =
    futuredPlaylists.length > 0 ? (
      futuredPlaylists.map((item) => {
        const name = item.name;
        const description = item.description;
        const imageUrl = item.images[0].url;
        return (
          <PlayListUi
            key={nanoid()}
            name={name}
            description={description}
            imageUrl={imageUrl}
          />
        );
      })
    ) : (
      <div>Nous ne pouvons rien vous proposer, écoutez quelques musiques avant.</div>
    );

  const page = (
    <Container>
      <h2 className="section-title">Vos playlistes</h2>
      <div className="songs">
        <LikedSongs />
        {loadingMyPlayLists ? (
          <LoadingPlaylists>
            <div className="item"></div>
            <div className="item"></div>
          </LoadingPlaylists>
        ) : (
          playListsUi
        )}
      </div>
      <h2 className="section-title">Quelques propositions</h2>
      <div className="songs">
        {loadingFutured ? (
          <LoadingPlaylists>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </LoadingPlaylists>
        ) : (
          futuredUi
        )}
      </div>
    </Container>
  );
  return <Layout page={page} />;
}

export default PlayLists;

const Container = styled.div`
  padding: 2rem;

  .songs {
    display: flex;
    gap: 1rem;
    flex-wrap: no-wrap;
    overflow-x: scroll;
  }

  .section-title {
    margin: 15px 0;
  }
`;

const LoadingPlaylists = styled.div`
  display: flex;
  gap: 1rem;

  .item {
    width: 350px;
    height: 200px;
    background-color: #5e5461;
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
