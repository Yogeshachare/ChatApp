import { styled } from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Container = styled.div`
  width: 100%;
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

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Logo>Chat App</Logo>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <Input type="email" placeholder="email"></Input>
          <Input type="password" placeholder="password"></Input>
          <Button>Sign in</Button>
          {err && <Error>Something went wrong</Error>}
        </Form>
        <Para>
          You don't have an Account ? <Link to="/register">Register</Link>
        </Para>
      </Wrapper>
    </Container>
  );
};

export default Login;
