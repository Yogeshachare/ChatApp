import { AddPhotoAlternate } from "@mui/icons-material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { styled } from "styled-components";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  background-color: #918ef4;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  background-color: white;
  gap: 10px;
  align-items: center;
  border-radius: 10px;
`;
const Logo = styled.span`
  color: #306bac;
  font-weight: bold;
  font-size: 24px;
`;
const Title = styled.span`
  font-size: 14px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 2px solid lightgray;
  width: 250px;

  @media only screen and (max-width: 380px) {
    width: 200px;
  }
`;

const Button = styled.button`
  background-color: #918ef4;
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;
const Para = styled.p`
  color: #306bac;
  font-size: 12px;
  cursor: pointer;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #918ef4;
  font-size: 12px;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Logo>Chat App</Logo>
        <Title>Register</Title>
        <Form onSubmit={handleSubmit}>
          <Input type="text" placeholder="display name"></Input>
          <Input type="email" placeholder="email"></Input>
          <Input type="password" placeholder="password"></Input>
          <Input style={{ display: "none" }} type="file" id="file"></Input>
          <Label htmlFor="file">
            <AddPhotoAlternate style={{ color: " #918ef4", fontSize: "40" }} />
            Add an Avatar
          </Label>
          <Button>Sign Up</Button>
          {err && <Error>Something went wrong</Error>}
        </Form>
        <Para>
          You have an Account ? <Link to="/login">Login</Link>
        </Para>
      </Wrapper>
    </Container>
  );
};

export default Register;
