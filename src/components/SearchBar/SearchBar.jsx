import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";
import { useContext, useRef } from "react";
import { appContext } from "../../contexts";
import { FiSearch } from "react-icons/fi";

function SearchBar() {
  const {
    searchTerm,
    setSearchTerm,
    searching,
    openSearching,
    closeSearching,
    screenDimensions,
  } = useContext(appContext);

  const formStyles = {
    width: screenDimensions.width > 564 ? "400px" : searching ? "80%" : "100%",
    display:
      screenDimensions.width > 750 ? "flex" : searching ? "flex" : "none",
  };
  const searchInput = useRef();

  const showInput = () => {
    openSearching();
  };

  return (
    <Container>
      {searching && (
        <button className="close-btn" onClick={closeSearching}>
          <AiFillCloseCircle />
        </button>
      )}

      {!searching && screenDimensions.width < 750 && (
        <button className="search-btn" onClick={showInput}>
          <FiSearch />
        </button>
      )}
      <div style={formStyles} className="form">
        <input
          ref={searchInput}
          onFocus={openSearching}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Songs, artists, albums, playlists"
        />
      </div>
      {/* )} */}
    </Container>
  );
}

export default SearchBar;

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100vw);
  height: 80px;
  background-color: #26202c;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  padding: 1rem;

  .search-btn {
    position: absolute;
    top: 40%;
    right: 1rem;
  }
  .search-btn svg {
    font-size: 20px;
  }

  .form {
    height: 40px;
    background-color: #fff;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
    color: #000;
  }

  .form input {
    width: 100%;
  }

  .icon-search {
    fill: #000;
    font-size: 25px;
    cursor: pointer;
  }

  .close-btn {
    position: absolute;
    top: 1.5rem;
    left: 1rem;
  }

  .close-btn svg {
    font-size: 25px;
  }
`;
