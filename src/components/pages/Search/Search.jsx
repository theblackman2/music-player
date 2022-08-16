import { useEffect, useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { appContext } from "../../../contexts";
import ArtistUi from "../../ArtistUi/ArtistUi";
import MusicPreview from "../../MusicPreview/MusicPreview";
import PlayListUi from "../../PlayListUi/PlayListUi";
import UknownUserImage from "./../../../assets/uknown.png";
import AlbumUi from "./../../AlbumUi/AlbumUi";

function Search({ close }) {
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [searchState, setSearchState] = useState({
    artists: true,
    songs: true,
    albums: true,
    playlists: true,
  });
  const { searchTerm, spotify } = useContext(appContext);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const artists = spotify.searchArtists(searchTerm, { limit: 10 });
      artists
        .then((data) => setArtists(data.artists.items))
        .then(() =>
          setSearchState((prevState) => {
            return {
              ...prevState,
              artists: false,
            };
          })
        );
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const songs = spotify.searchTracks(searchTerm, { limit: 10 });
      songs
        .then((data) => setSongs(data.tracks.items))
        .then(() =>
          setSearchState((prevState) => {
            return {
              ...prevState,
              songs: false,
            };
          })
        );
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const albums = spotify.searchAlbums(searchTerm, { limit: 10 });
      albums
        .then((data) => setAlbums(data.albums.items))
        .then(() =>
          setSearchState((prevState) => {
            return {
              ...prevState,
              albums: false,
            };
          })
        );
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const playlists = spotify.searchPlaylists(searchTerm, { limit: 10 });
      playlists
        .then((data) => setPlaylists(data.playlists.items))
        .then(() =>
          setSearchState((prevState) => {
            return {
              ...prevState,
              playlists: false,
            };
          })
        );
    }
  }, [searchTerm]);

  const closeSearch = () => {
    close(false);
  };

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

            return (
              <MusicPreview
                key={index}
                title={title}
                artist={artist}
                duration={duration}
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

  const artstsUi = (
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

            return (
              <AlbumUi
                key={index}
                id={id}
                imageUrl={imageUrl}
                name={name}
                date={date}
                artist={artist}
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

            return (
              <PlayListUi
                key={index}
                name={name}
                description={description}
                imageUrl={imageUrl}
                id={id}
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
      {songsUi} {artstsUi} {albumsUi} {playlistsUi}
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

  .section-results {
    display: flex;
    align-items: center;
    gap: 1rem;
    overflow-x: scroll;
  }
`;
