import { styled } from "styled-components";
import { MoreHoriz, PersonAdd, Videocam } from "@mui/icons-material";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Container = styled.div`
  flex: 3;
`;

const ChatInfo = styled.div`
  height: 50px;
  background-color: #5e55bd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  color: lightgray;
`;
const Span = styled.span``;
const ChatIcons = styled.div`
  display: flex;
  gap: 10px;
`;

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <Container>
      <ChatInfo>
        <Span>{data.user?.displayName}</Span>
        <ChatIcons>
          <Videocam
            style={{ color: "#ddddf7", height: "24px", cursor: "pointer" }}
          />
          <PersonAdd
            style={{ color: "#ddddf7", height: "24px", cursor: "pointer" }}
          />
          <MoreHoriz
            style={{ color: "#ddddf7", height: "24px", cursor: "pointer" }}
          />
        </ChatIcons>
      </ChatInfo>
      <Messages />
      <Input />
    </Container>
  );
};

export default Chat;
