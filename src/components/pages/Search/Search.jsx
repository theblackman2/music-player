import { useEffect, useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { appContext } from "../../../contexts";
import MusicPreview from "../../MusicPreview/MusicPreview";

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
        .then((data) => setArtists(data))
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
        .then((data) => setAlbums(data))
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
        .then((data) => setPlaylists(data))
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

  return <Container>{songsUi}</Container>;
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
