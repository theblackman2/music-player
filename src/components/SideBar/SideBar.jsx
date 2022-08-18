import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { appContext } from "../../contexts";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import { RiLogoutBoxFill } from "react-icons/ri";
import Uknown from "./../../assets/uknown.png";

function SideBar({ showUser }) {
  const navigate = useNavigate();

  const { user, loadingUser } = useContext(appContext);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const userInfos = loadingUser ? (
    <LoadingUser>
      <div className="loading-avatar"></div>
      <div className="loading-infos">
        <div className="loading-name"></div>
        <div className="loading-email"></div>
      </div>
    </LoadingUser>
  ) : (
    <User onClick={showUser}>
      <div className="user-avatar">
        <img
          src={user.images.length > 0 ? user.images[0].url : Uknown}
          alt="User avatar"
        />
      </div>
      <div className="user-infos">
        <h2 className="user-infos__name">{user.display_name}</h2>
        <p className="user-infos__email">{user.email}</p>
      </div>
    </User>
  );

  return (
    <Container>
      {userInfos}
      <NavLink
        className={({ isActive }) => (isActive ? "link-active" : "link")}
        to="/"
      >
        {" "}
        <AiFillHome />
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "link-active" : "link")}
        to="/playlists"
      >
        {" "}
        <TbPlaylist />
        Playlists
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "link-active" : "link")}
        to="/artists"
      >
        {" "}
        <BsFillPersonLinesFill />
        Artists
      </NavLink>
      <button onClick={logout} className="logout-btn">
        <RiLogoutBoxFill />
        Logout
      </button>
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

  .link-active {
    background-color: #716d67;
  }

  .logout-btn {
    background-color: #716d67;
    margin: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    font-size: 15px;
    font-weight: 600;
  }
`;

const User = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .user-avatar img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
  }

  .user-infos__name {
    font-size: 12px;
    font-weight: 600;
  }

  .user-infos__email {
    font-size: 10px;
    font-weight: 400;
  }
`;

const LoadingUser = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  .loading-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #716d67;
    position: relative;
    overflow: hidden;
  }

  .loading-infos {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 5px;
    width: calc(100% - 45px);
  }

  .loading-infos div {
    width: 100%;
    height: 9px;
    background-color: #716d67;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
  }
  .loading-infos div:after,
  .loading-avatar:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100px);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: loading 0.8s infinite;
  }
  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;
