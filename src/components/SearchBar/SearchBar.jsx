import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { useContext } from "react";
import { appContext } from "../../contexts";

function SearchBar({ showSearch, show }) {
  const { searchTerm, setSearchTerm } = useContext(appContext);
  const handleShowPage = () => {
    showSearch(true);
  };
  const closePage = () => {
    showSearch(false);
    setSearchTerm("");
  };

  return (
    <Container>
      {show && (
        <button className="close-btn" onClick={closePage}>
          <AiFillCloseCircle />
        </button>
      )}

      <div className="form">
        <input
          onFocus={handleShowPage}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Taper votre reccherche ici"
        />
        <FaSearch className="icon-search" />
      </div>
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

  .form {
    height: 40px;
    width: 400px;
    background-color: #fff;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #000;
  }

  form input {
    width: 90%;
  }

  .icon-search {
    fill: #000;
    font-size: 25px;
    cursor: pointer;
  }

  .close-btn {
    position: absolute;
    top: 1.5rem;
    left: 2rem;
  }

  .close-btn svg {
    font-size: 25px;
  }
`;
