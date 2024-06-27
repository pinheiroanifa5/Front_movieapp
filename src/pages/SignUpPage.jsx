import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import { AuthContext } from '../components/Context';
import axios from 'axios';

const SignUpPage = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [showName, setShowName] = useState(true);
  const [formValues, setFormValues] = useState({ email: "", password: "", name: "" });

  const navigate = useNavigate();

  const { signUp } = useContext(AuthContext)

  const handleSignUp = async () => {
    const userInfo = {
      ...formValues
    }
    try {
      const response = await axios.post('http://localhost:5000/auth/signup', userInfo)
      const token = response.data
      if (token) {
        signUp(token)
        navigate("/login")
      }
    } catch (error) {
      if (error.response) {
        const { message: errorMessage } = error.response.data
        console.log({ errorMessage })
      }
    }
  };


  console.log({ showPassword })

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body">
          <div className="text">
            <h1>Filme ilimitados, TV shows e muito mais</h1>
            <h4>Assista onde esteja, podes cancelar a qualquer momento!</h4>
            <h6>Estas pronto? Entre com o teu email para criar ou reativar a tua assinatura.</h6>
          </div>
          <div className="form">
            {showEmail ? (
              <input type="email"
                placeholder="Email address"
                name="email"
                value={formValues.email}
                onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
              />

            ) : showName ? (
              <input type="name"
                placeholder="Name"
                name="name"
                value={formValues.name}
                onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
              />
            ) : (
              <input type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
              />
            )}
            {showName ? (
              <button onClick={() => {
                setShowEmail(true)
                setShowName(false)
              }}>Next</button>
            ) : showEmail ? (
              <button onClick={() => {
                setShowEmail(false)
                setShowName(false)
              }}>Next</button>
            ) : (
              <button onClick={handleSignUp}>Sign Out</button>
            )
            }



          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.79);
    height: 100vh;
    width: 100vw;
    grid-template-columns: 15vh 85vh;
    .body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 5rem;
    }
    .text {
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 2rem;
      color: white;
      padding: 1rem;
    }
    h1 {
      padding: 0 25rem;
    }
    h4 {
   
    }
    h6 {
     
    }
  }
  .form {
    display: grid;
    width: 60%;
    grid-template-columns: ${({ showPassword }) => showPassword ? "1fr 1fr" : "2fr 1fr"};
    input {
      color: black;
      padding: 1.5rem;
      font-size: 1.2rem;
      width: 45rem;
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.5rem 1rem;
      background-color: red;
      border: none;
      cursor: pointer;
      color: white;
      font-size: 1.05rem;
      width: 10rem;
      font-weight:bolder
    }
  }
`;

export default SignUpPage;