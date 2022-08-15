import { useEffect } from "react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { appContext } from "../../../contexts";
import Layout from "../../Layout";
import PlayIcon from "./../../../assets/play.png";

function Artist() {
  const { id } = useParams();
  const { spotify, user } = useContext(appContext);
  const [artist, setArtist] = useState({});
  const [loadingArtist, setLoadingArtist] = useState(true);
  const [artistTopTracks, setArtistTopTracks] = useState([]);
  const [loadingTopTracks, setLoadingTopTracks] = useState(true);
  const [albums, setAlbums] = useState([]);
  const [loadingAlbums, setLoadingAlbums] = useState(true);

  useEffect(() => {
    const artist = spotify.getArtist(id);
    artist.then((data) => setArtist(data)).then(() => setLoadingArtist(false));
  }, []);

  // useEffect(() => {
  //   const topTracks = spotify.getArtistTopTracks(artist.id);
  //   topTracks
  //     .then((data) => setArtistTopTracks(data))
  //     .then(() => setLoadingTopTracks(false));
  // }, []);

  // useEffect(() => {
  //   const albums = spotify.getArtistAlbums(artist.id);
  //   albums
  //     .then((data) => setAlbums(data))
  //     .then(() => setLoadingAlbums(false));
  // }, []);

  console.log(user);
  // console.log(albums);

  const page = loadingArtist ? (
    <div>Loading</div>
  ) : (
    <Container>
      <div className="artist-header">
        <div className="artist-left">
          <div className="artist-image">
            <img src={artist.images[1].url} alt={`${artist.name} cover`} />
          </div>
          <div className="artist-infos">
            <h1 className="artist-name">{artist.name}</h1>
            <p className="artist-followers">
              {artist.followers.total} followers
            </p>
          </div>
        </div>
        <button>
          <img src={PlayIcon} alt="play" />
        </button>
      </div>
      <div className="buttons">
        <button className="top">Meilleurs titres</button>
        <button className="albums">Ses albums</button>
      </div>
    </Container>
  );
  return <Layout page={page} />;
}

export default Artist;

const Container = styled.div`
  padding: 2rem;

  .artist-header {
    width: 100%;
    height: 280px;
    background-color: #766961;
    position: relative;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  button {
    position: absolute;
    right: 2rem;
    bottom: 2rem;
  }

  .artist-infos {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .artist-left {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  .artist-image {
    width: 160px;
    height: 160px;
    border-radius: 100%;
  }

  .artist-image img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .artist-name {
    font-weight: 900;
    font-size: 60px;
  }
`;
