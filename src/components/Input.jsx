import { styled } from "styled-components";
import { AttachFile, Image } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Container = styled.div`
  height: 50px;
  background-color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputMsg = styled.input`
  width: 100%;
  border: none;
  outline: none;
  color: #2f2d52;
  font-size: 18px;

  &::placeholder {
    color: lightgray;
  }
`;

const Send = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const InputFile = styled.input`
  display: none;
`;

const Label = styled.label``;
const Button = styled.button`
  border: none;
  padding: 10px 15px;
  color: white;
  background-color: #8da4f1;
  cursor: pointer;
`;

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatID), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatID), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatID + ".lastMessage"]: {
        text,
      },
      [data.chatID + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatID + ".lastMessage"]: {
        text,
      },
      [data.chatID + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <Container>
      <InputMsg
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      ></InputMsg>
      <Send>
        <AttachFile style={{ color: "#C2B7C1", cursor: "pointer" }} />
        <InputFile
          type="file"
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        ></InputFile>
        <Label htmlFor="file">
          <Image style={{ color: "#C2B7C1", cursor: "pointer" }} />
        </Label>
        <Button onClick={handleSend}>Send</Button>
      </Send>
    </Container>
  );
};

export default Input;
