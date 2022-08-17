import styled from "styled-components";
import SideBar from "./SideBar/SideBar";
import SearchBar from "./SearchBar/SearchBar";
import SpotifyPlayer from "react-spotify-web-playback";
import { useContext } from "react";
import { appContext } from "../contexts";
import ScroolToTopIcon from "./../assets/down.png";
import { useState } from "react";
import ShowUser from "./ShowUser/ShowUser";
import Search from "./pages/Search/Search";

function Layout({ page }) {
  const { token, playingSongUris } = useContext(appContext);
  const [showUserInfos, setShowUserInfos] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const showUser = () => {
    setShowUserInfos((prevState) => !prevState);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container>
      {!showSearch && <SideBar showUser={showUser} />}
      <SearchBar show={showSearch} showSearch={setShowSearch} />
      {!showSearch && <div className="page">{page}</div>}
      {showSearch && <Search close={setShowSearch} />}
      <div className="player">
        {/* <SpotifyPlayer
          autoPlay={true}
          play={true}
          token={token}
          uris={["spotify:playlist:3H6ZPTvBOEDNm98FTEG3gy"]}
        /> */}
      </div>
      {showUserInfos && <ShowUser showUser={showUser} />}
      <button onClick={scrollToTop} className="top">
        <img src={ScroolToTopIcon} alt="Scroll to top" />
      </button>
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

  .top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 10;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    transform: rotateX(180deg);
  }
`;
