import styled from "styled-components";
import SideBar from "./SideBar/SideBar";

function Layout() {
  return (
    <Container>
      <SideBar />
    </Container>
  )
}

export default Layout

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #0E0B1E;
`