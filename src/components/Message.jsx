import { useContext, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const Container = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.className == "Owner" ? "row-reverse" : "row"};
  gap: 20px;
  margin-top: 10px;
`;
const MsgInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: gray;
  font-weight: 300;
  margin-bottom: 20px;
`;
const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const Span = styled.span``;

const MsgContent = styled.div`
  max-width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: ${(props) =>
    props.className == "Owner" ? "flex-end" : "flex-start"};
`;

const Msg = styled.p`
  background-color: ${(props) =>
    props.className == "Owner" ? "#8da4f1" : "white"};
  color: ${(props) => (props.className == "Owner" ? "white" : "black")};
  padding: 10px 20px;
  border-radius: ${(props) =>
    props.className == "Owner" ? "10px 0px 10px 10px" : "0px 10px 10px 10px"};
  max-width: max-content;
`;

const MsgImage = styled.img`
  width: 50%;
`;

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <Container
      ref={ref}
      className={message.senderId === currentUser.uid && "Owner"}
    >
      <MsgInfo>
        <Image
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
        ></Image>
        <Span>Just Now</Span>
      </MsgInfo>
      <MsgContent className={message.senderId === currentUser.uid && "Owner"}>
        <Msg className={message.senderId === currentUser.uid && "Owner"}>
          {message.text}
        </Msg>
        {message.img && <MsgImage src={message.img}></MsgImage>}
      </MsgContent>
    </Container>
  );
};

export default Message;
