import { useEffect } from "react";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";
import { useContext } from "react";
import { appContext } from "../../contexts";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import UknownUserImage from "./../../assets/uknown.png";

function ShowUser({ showUser }) {
  const navigate = useNavigate();
  const { user } = useContext(appContext);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container>
      <Card>
        <div onClick={showUser} className="close-icon">
          <AiFillCloseCircle />
        </div>
        <div className="user-image">
          <img
            src={user.images.length > 0 ? user.images[0].url : UknownUserImage}
            alt={`${user.display_name} cover`}
          />
        </div>
        <h2 className="user-name">{user.display_name}</h2>
        <h3 className="user-email">{user.email}</h3>
        <p className="user-followers">{user.followers.total} followers</p>
        <button onClick={logout} className="logout-btn">
          <RiLogoutBoxFill />
          Logout
        </button>
      </Card>
    </Container>
  );
}

export default ShowUser;

const Container = styled.div`
  width: 100vw;
  height: auto;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 15;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 300px;
  height: 400px;
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  justify-content: center;
  gap: 1.5rem;

  * {
    color: #0e0b1e;
  }

  .user-image {
    width: 150px;
    height: 150px;
    border-radius: 100%;
  }

  .user-image img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .close-icon {
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .close-icon svg {
    fill: #000;
    font-size: 25px;
  }

  .logout-btn {
    padding: 0.5rem;
    background-color: #0e0b1e;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;

    svg{
      fill: #fff;
    }
  }
`;
