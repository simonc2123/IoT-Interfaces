import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = ({ setUserRole, setUserHome }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5050/auth/login", {
        username,
        password,
      });
      const home = response.data.nodo;
      console.log(home);
      console.log("Inicio de sesión exitoso:", response.data);
      setUserHome(home);
      setUserRole(response.data.rol);
      navigate("/home"); // Redirige al usuario a la página de inicio correspondiente
    } catch (error) {
      console.error(
        "Error al iniciar sesión:",
        error.response?.data?.error || "Error desconocido"
      );
      setError(error.response?.data?.error || "Error desconocido");
    }
  };

  return (
    <CenteredContainer>
      <CustomH3>
        Estacion meteorologica, este es un proyecto individual que ha sido
        desarrollado por Simon David Colmenares Sanchez, para la entrega de los
        parciales 1,2,3 y 4, en este momento se consta de dos nodos, uno de
        ellos real y el otro simulado por medio de mqttx, ademas de un usuario
        admin, e el cual puede acceder a la informacion en general de los
        usuarios
      </CustomH3>
      <Space /> {/* Espacio adicional */}
      <hr></hr>
      <h2>Iniciar sesión</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <LoginForm onSubmit={handleSubmit}>
        <FormField>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormField>
        <FormField>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>
        <SubmitButton type="submit">Iniciar sesión</SubmitButton>
      </LoginForm>
    </CenteredContainer>
  );
};

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const CustomH3 = styled.h3`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.5;
  color: #333; /* Cambia el color del texto si es necesario */
`;

const Space = styled.div`
  height: 20px; /* Altura del espacio adicional */
`;

const LoginForm = styled.form`
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;

  label {
    margin-bottom: 5px;
  }

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 10px;
  color: #ff0000; /* Cambia el color para destacar los mensajes de error */
`;

export default Login;
