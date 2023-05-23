import { styled } from "styled-components";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Container = styled.div`
  display: flex;
  background-color: #322e60;
  justify-content: space-between;
  height: 50px;
  padding: 10px;
  align-items: center;
  color: #ddddf7;
`;
const Logo = styled.span`
  font-weight: bold;
  display: ${({ open }) => (open ? "block" : "none")};
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Image = styled.img`
  background-color: #fff;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  object-fit: cover;
  display: ${({ open }) => (open ? "block" : "none")};
`;
const Username = styled.span`
  display: ${({ open }) => (open ? "block" : "none")};
`;
const StyledBurger = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 1.6rem;
  background: transparent;
  border: none;
  cursor: pointer;

  span {
    width: 1.5rem;
    height: 0.25rem;
    background-color: #ddddf7;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    padding: 0;

    &:first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const Navbar = ({ open, setOpen }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Container>
      <Logo open={open}>Chat App</Logo>
      <User>
        <Image open={open} src={currentUser.photoURL}></Image>
        <Username open={open}>{currentUser.displayName}</Username>
        <StyledBurger
          aria-label="Toggle menu"
          open={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </StyledBurger>
      </User>
    </Container>
  );
};

export default Navbar;
