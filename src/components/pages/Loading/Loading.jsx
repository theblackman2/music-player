import styled from "styled-components";
import "./Loading.css";

function Loading() {
  return (
    <Container>
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </Container>
  );
}

export default Loading;

const Container = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;
