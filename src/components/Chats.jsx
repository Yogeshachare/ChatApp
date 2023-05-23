import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";

const Container = styled.div`
  height: ${({ open }) => (open ? "calc(100% - 142px)" : "calc(100% - 100px)")};
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const UserChat = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #322e60;
  }
`;

const Image = styled.img`
  width: 50px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
`;

const Info = styled.div``;

const Username = styled.span`
  font-size: 18px;
  font-weight: 500;
  display: ${({ open }) => (open ? "block" : "none")};
`;
const Msg = styled.p`
  font-size: 14px;
  color: lightgray;
  display: ${({ open }) => (open ? "block" : "none")};
`;

const Chats = ({ open }) => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  return (
    <Container open={open}>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <UserChat
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <Image src={chat[1].userInfo.photoURL}></Image>
            <Info>
              <Username open={open}>{chat[1].userInfo.displayName}</Username>
              <Msg open={open}>{chat[1].lastMessage?.text}</Msg>
            </Info>
          </UserChat>
        ))}
    </Container>
  );
};

export default Chats;
