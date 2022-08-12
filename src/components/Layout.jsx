import styled from "styled-components";
import SideBar from "./SideBar/SideBar";
import SearchBar from "./SearchBar/SearchBar";

function Layout({ page }) {
  return (
    <Container>
      <SideBar />
      <SearchBar />
      <div className="page">{page}</div>
    </Container>
  );
}

export default Layout;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #0e0b1e;

  .page{
    width: calc(100vw - 200px);
    margin-left: 200px;
    margin-top : 80px;
  }
`;
