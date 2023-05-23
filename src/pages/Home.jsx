import { styled } from "styled-components";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { mobile } from "../responsive";
import { useState } from "react";

const Container = styled.div`
  background-color: #918ef4;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  border: 1px solid white;
  border-radius: 10px;
  width: 55%;
  height: 70%;
  display: flex;
  overflow: hidden;

  ${mobile({
    width: "100%",
    height: "100%",
    borderRadius: "0px",
  })}
`;

const Home = () => {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <Wrapper>
        <Sidebar open={open} setOpen={setOpen} />
        <Chat />
      </Wrapper>
    </Container>
  );
};

export default Home;
