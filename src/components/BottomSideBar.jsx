import { styled } from "styled-components";
import { Logout } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Container = styled.div`
  background-color: #322e60;
  height: 50px;
  padding: 10px;
`;

const Span = styled.span`
  color: #ddddf7;
  font-weight: bold;
  display: ${({ open }) => (open ? "block" : "none")};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
`;

const BottomSideBar = ({ open }) => {
  return (
    <Container>
      <Wrapper onClick={() => signOut(auth)}>
        <Logout style={{ color: "#ddddf7" }} />
        <Span open={open}>Logout</Span>
      </Wrapper>
    </Container>
  );
};

export default BottomSideBar;
