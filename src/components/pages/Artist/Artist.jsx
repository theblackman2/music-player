import { useEffect } from "react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { appContext } from "../../../contexts";
import AlbumUi from "../../AlbumUi/AlbumUi";
import ArtistUi from "../../ArtistUi/ArtistUi";
import Layout from "../../Layout";
import PlayIcon from "./../../../assets/play.png";
import UknownUserImage from "./../../../assets/uknown.png";

function Artist() {
  const { id } = useParams();
  const { spotify, closeSearching } = useContext(appContext);
  const [artist, setArtist] = useState({});
  const [loadingArtist, setLoadingArtist] = useState(true);
  const [releatedArtists, setReleatedArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [showAlbums, setShowAlbums] = useState(false);
  const [loadingAlbums, setLoadingAlbums] = useState(true);

  useEffect(() => closeSearching, [id]);
  useEffect(() => {
    const artist = spotify.getArtist(id);
    artist.then((data) => setArtist(data)).then(() => setLoadingArtist(false));
  }, [id]);

  useEffect(() => {
    const releated = spotify.getArtistRelatedArtists(id);
    releated.then((data) => setReleatedArtists(data.artists));
  }, [id]);

  useEffect(() => {
    setLoadingArtist(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  useEffect(() => {
    const albums = spotify.getArtistAlbums(id);
    albums
      .then((data) => setAlbums(data.items))
      .then(() => setLoadingAlbums(false));
  }, [id]);

  const releatedUi =
    releatedArtists.length > 0 ? (
      releatedArtists.map((item, index) => {
        const name = item.name;
        const followers = item.followers.total;
        const imageUrl =
          item.images.length > 0 ? item.images[2].url : UknownUserImage;
        const id = item.id;

        return (
          <ArtistUi
            key={index}
            name={name}
            followers={followers}
            imageUrl={imageUrl}
            id={id}
          />
        );
      })
    ) : (
      <div>No artists like him</div>
    );

  const albumsUi =
    albums.length > 0 ? (
      albums.map((item, index) => {
        const name = item.name;
        const imageUrl = item.images[1].url;
        const date = item.release_date.split("-")[0];
        // const artist = item.artists[O].name
        const id = item.id;
        const artist = item.artists[0].name;
        return (
          <AlbumUi
            key={index}
            name={name}
            imageUrl={imageUrl}
            date={date}
            id={id}
            artist={artist}
          />
        );
      })
    ) : (
      <div>No albums for {artist.name}</div>
    );

  const topBtnStyle = {
    backgroundColor: !showAlbums ? "#716d67" : "transparent",
  };

  const albumBtnStyle = {
    backgroundColor: showAlbums ? "#716d67" : "transparent",
  };

  const page = loadingArtist ? (
    <Load>
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Load>
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
        <button
          onClick={() => {
            setShowAlbums(false);
          }}
          style={topBtnStyle}
        >
          Overview
        </button>
        <button
          onClick={() => {
            setShowAlbums(true);
          }}
          style={albumBtnStyle}
        >
          Albums
        </button>
      </div>
      <div className="show-section">
        {showAlbums ? (
          loadingAlbums ? (
            <LoadingAlbums>
              <div className="items"></div>
              <div className="items"></div>
              <div className="items"></div>
              <div className="items"></div>
              <div className="items"></div>
              <div className="items"></div>
              <div className="items"></div>
              <div className="items"></div>
              <div className="items"></div>
              <div className="items"></div>
              <div className="items"></div>
              <div className="items"></div>
              <div className="items"></div>
              <div className="items"></div>
              <div className="items"></div>
              <div className="items"></div>
              <div className="items"></div>
              <div className="items"></div>
              <div className="items"></div>
              <div className="items"></div>
            </LoadingAlbums>
          ) : (
            albumsUi
          )
        ) : (
          <OverView>
            <h2 className="section-title">More like {artist.name}</h2>
            <div className="releated">{releatedUi}</div>
          </OverView>
        )}
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

  .artist-header button {
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

  .buttons {
    display: flex;
    gap: 2rem;
    background-color: #0e0b1e;
    position: sticky;
    top: 80px;
    margin: 1rem 0;
    padding: 1rem 0;
    z-index: 5;
  }

  .buttons button {
    padding: 0.5rem 1rem;
  }

  .show-section {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const LoadingAlbums = styled.div`
  .item {
    width: 200px;
    height: 280px;
    background-color: rgba(178, 178, 178, 0.6);
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

const OverView = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .releated {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
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
