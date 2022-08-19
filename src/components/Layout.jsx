import styled from "styled-components";
import SideBar from "./SideBar/SideBar";
import SearchBar from "./SearchBar/SearchBar";
import { useContext } from "react";
import { appContext } from "../contexts";
import ScroolToTopIcon from "./../assets/down.png";
import { useState } from "react";
import ShowUser from "./ShowUser/ShowUser";
import Search from "./pages/Search/Search";

function Layout({ page }) {
  const { searching, screenDimensions, showSideBar } = useContext(appContext);
  const [showUserInfos, setShowUserInfos] = useState(false);

  const showUser = () => {
    setShowUserInfos((prevState) => !prevState);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const pageStyles = {
    width: screenDimensions.width > 750 ? "calc(100vw - 200px)" : "100%",
    marginLeft: screenDimensions.width > 750 ? "200px" : "0",
  };

  return (
    <Container>
      {!searching && screenDimensions.width > 750 ? (
        <SideBar showUser={showUser} />
      ) : (
        showSideBar && !searching && <SideBar showUser={showUser} />
      )}
      <SearchBar />
      {!searching && (
        <div style={pageStyles} className="page">
          {page}
        </div>
      )}
      {searching && <Search />}
      {/* <div className="player">
        <SpotifyPlayer
          styles={{
            activeColor: "#fff",
            bgColor: "#0e0b1e",
            color: "#fff",
            loaderColor: "#fff",
            sliderColor: "#1cb954",
            trackArtistColor: "#ccc",
            trackNameColor: "#fff",
          }}
          autoPlay={true}
          callback={(state) => {
            if (!state.isPlaying) setPlay(false);
          }}
          showSaveIcon={true}
          play={play}
          token={token}
          uris={playingSongUris}
        />
      </div> */}
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
    // width: calc(100vw - 200px);
    // margin-left: 200px;
    margin-top: 80px;
  }

  .top {
    position: fixed;
    bottom: 3.5rem;
    right: 2rem;
    z-index: 10;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    transform: rotateX(180deg);
  }
`;
