import styled from "styled-components";
import { FaSearchengin } from "react-icons/fa";

function SearchBar() {
  return (
    <Container>
      <div className="form">
        <form>
          <input type="text" placeholder="Taper votre reccherche ici" />
          <FaSearchengin className="icon-search" />
        </form>
      </div>
    </Container>
  );
}

export default SearchBar;

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100vw - 200px);
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
  }

  .form form {
    width: 100%;
    height: 100%;
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
  }
`;
