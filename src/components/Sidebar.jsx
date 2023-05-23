import { styled } from "styled-components";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { mobile } from "../responsive";
import BottomSideBar from "./BottomSideBar";

const Container = styled.div`
  width: ${({ open }) => (open ? "300px" : "60px")};
  border-right: 1px solid #eee;
  background-color: #413c7b;
  transition: all 0.3s linear;

  ${mobile({})}
`;

const Sidebar = ({ open, setOpen }) => {
  console.log(open);
  return (
    <Container open={open}>
      <Navbar open={open} setOpen={setOpen} />
      <Search open={open} />
      <Chats open={open} />
      <BottomSideBar open={open} />
    </Container>
  );
};

export default Sidebar;
