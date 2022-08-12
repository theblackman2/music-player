import styled from "styled-components";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <Container>
      <NavLink
        className={({ isActive }) => (isActive ? "link-active" : "link")}
        to="/"
      >
        {" "}
        <img src="./assets/icons/home.png" alt="Home" />
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "link-active" : "link")}
        to="/playlists"
      >
        {" "}
        <img src="./assets/icons/playlist.png" alt="Home" />
        Playlists
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "link-active" : "link")}
        to="/artists"
      >
        {" "}
        <img src="./assets/icons/person.png" alt="Home" />
        Artistes
      </NavLink>
    </Container>
  );
}

export default SideBar;

const Container = styled.div`
  width: 200px;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  // align-items : center;
  justify-content: center;
  gap: 15px;
  top: 0;
  left: 0;
  background-color: #26202c;

  a {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 15px;
    padding: 10px;
  }

  .link-active{
    background-color: #716D67;
  }
`;
