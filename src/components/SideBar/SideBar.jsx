import styled from "styled-components";
import { Link } from 'react-router-dom'

function SideBar() {
  return (
    <Container>
      sidebar
    </Container>
  )
}

export default SideBar

const Container = styled.div`
  width: 200px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #26202C;
`