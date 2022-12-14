import { useEffect, useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { appContext } from "../../../contexts";
import ArtistUi from "../../ArtistUi/ArtistUi";
import MusicPreview from "../../MusicPreview/MusicPreview";
import PlayListUi from "../../PlayListUi/PlayListUi";
import UknownUserImage from "./../../../assets/uknown.png";
import AlbumUi from "./../../AlbumUi/AlbumUi";

function Search() {
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [searching, setSearching] = useState(true);
  const { searchTerm, spotify } = useContext(appContext);
  const [tabToShow, setTabToShow] = useState("songs");

  useEffect(() => {
    if (searchTerm.length > 0) {
      setSearching(true);
      const artists = spotify.searchArtists(searchTerm, { limit: 20 });
      artists.then((data) => setArtists(data.artists.items));
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const songs = spotify.searchTracks(searchTerm, { limit: 20 });
      songs
        .then((data) => setSongs(data.tracks.items))
        .then(() => setSearching(false));
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const albums = spotify.searchAlbums(searchTerm, { limit: 20 });
      albums.then((data) => setAlbums(data.albums.items));
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const playlists = spotify.searchPlaylists(searchTerm, { limit: 20 });
      playlists.then((data) => setPlaylists(data.playlists.items));
    }
  }, [searchTerm]);

  const songsUi = (
    <div className="search-section">
      <h2 className="section-title">Songs</h2>
      <div className="section-results">
        {songs.length > 0 ? (
          songs.map((item, index) => {
            const title = item.name;
            const artist = item.artists[0].name;
            const duration = item.duration_ms;
            const imageUrl = item.album.images[1].url;
            const uri = item.uri;

            return (
              <MusicPreview
                key={index}
                title={title}
                artist={artist}
                duration={duration}
                uri={uri}
                imageUrl={imageUrl}
              />
            );
          })
        ) : (
          <h3>No songs for this term</h3>
        )}
      </div>
    </div>
  );

  const artistsUi = (
    <div className="search-section">
      <h2 className="section-title">Artists</h2>
      <div className="section-results">
        {artists.length > 0 ? (
          artists.map((item, index) => {
            const id = item.id;
            const name = item.name;
            const followers = item.followers.total;
            const imageUrl =
              item.images.length > 0 ? item.images[0].url : UknownUserImage;

            return (
              <ArtistUi
                key={index}
                name={name}
                followers={followers}
                id={id}
                imageUrl={imageUrl}
              />
            );
          })
        ) : (
          <h3>No artists for this term</h3>
        )}
      </div>
    </div>
  );

  const albumsUi = (
    <div className="search-section">
      <h2 className="section-title">Albums</h2>
      <div className="section-results">
        {albums.length > 0 ? (
          albums.map((item, index) => {
            const id = item.id;
            const imageUrl = item.images[1].url;
            const name = item.name;
            const date = item.release_date;
            const artist = item.artists[0].name;
            const uri = item.uri;

            return (
              <AlbumUi
                key={index}
                id={id}
                imageUrl={imageUrl}
                name={name}
                date={date}
                artist={artist}
                uri={uri}
              />
            );
          })
        ) : (
          <h3>No albums for this term</h3>
        )}
      </div>
    </div>
  );

  const playlistsUi = (
    <div className="search-section">
      <h2 className="section-title">Playlists</h2>
      <div className="section-results">
        {playlists.length > 0 ? (
          playlists.map((item, index) => {
            const name = item.name;
            const description = item.description;
            const imageUrl = item.images.length > 0 ? item.images[0].url : "";
            const id = item.id;
            const uri = item.uri;

            return (
              <PlayListUi
                key={index}
                name={name}
                description={description}
                imageUrl={imageUrl}
                id={id}
                uri={uri}
              />
            );
          })
        ) : (
          <h3>No playlists for this term</h3>
        )}
      </div>
    </div>
  );

  return (
    <Container>
      {searchTerm.length > 0 ? (
        <>
          {searching ? (
            <Load>
              <div className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </Load>
          ) : (
            <>
              <div className="tabs">
                <button
                  style={{
                    backgroundColor:
                      tabToShow === "songs" ? "#716d67" : "transparent",
                  }}
                  onClick={() => setTabToShow("songs")}
                  className="tab"
                >
                  Songs
                </button>
                <button
                  style={{
                    backgroundColor:
                      tabToShow === "artists" ? "#716d67" : "transparent",
                  }}
                  onClick={() => setTabToShow("artists")}
                  className="tab"
                >
                  Artists
                </button>
                <button
                  style={{
                    backgroundColor:
                      tabToShow === "albums" ? "#716d67" : "transparent",
                  }}
                  onClick={() => setTabToShow("albums")}
                  className="tab"
                >
                  Albums
                </button>
                <button
                  style={{
                    backgroundColor:
                      tabToShow === "playlists" ? "#716d67" : "transparent",
                  }}
                  onClick={() => setTabToShow("playlists")}
                  className="tab"
                >
                  Playlists
                </button>
              </div>
              {tabToShow === "songs" && songsUi}
              {tabToShow === "artists" && artistsUi}
              {tabToShow === "albums" && albumsUi}
              {tabToShow === "playlists" && playlistsUi}
            </>
          )}
        </>
      ) : (
        <div className="nothing">
          <h2>Search something</h2>
        </div>
      )}
    </Container>
  );
}

export default Search;

const Container = styled.div`
  min-width: 100vw;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #0e0b1e;
  margin-top: 80px;
  position: relative;

  .search-section {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .nothing {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .section-results {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .tabs {
    position: fixed;
    top: 80px;
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 10px 1.5rem;
    width: 100%;
    z-index: 5;
    overflow-x: scroll;

    .tab {
      padding: 0.5rem;
    }
    background: #0e0b1e;
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
