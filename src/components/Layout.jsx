import styled from "styled-components";
import SideBar from "./SideBar/SideBar";
import SearchBar from "./SearchBar/SearchBar";
import SpotifyPlayer from "react-spotify-web-playback";
import { useContext } from "react";
import { appContext } from "../contexts";

function Layout({ page }) {
  const { token, playingSongUris } = useContext(appContext);
  return (
    <Container>
      <SideBar />
      <SearchBar />
      <div className="page">{page}</div>
      <div className="player">
        <SpotifyPlayer
          token={token}
          uris={playingSongUris}
        />
      </div>
    </Container>
  );
}

export default Layout;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #0e0b1e;

  .page {
    width: calc(100vw - 200px);
    margin-left: 200px;
    margin-top: 80px;
  }

  .player {
    width: calc(100vw - 200px);
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 1;
  }
`;
