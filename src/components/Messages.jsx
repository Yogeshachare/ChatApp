import { styled } from "styled-components";
import Message from "./Message";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Container = styled.div`
  background-color: #ddddf7;
  padding: 10px;
  height: calc(100% - 100px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.chatID]);
  return (
    <Container>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </Container>
  );
};

export default Messages;
