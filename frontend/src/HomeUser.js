import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactSpeedometer from "react-d3-speedometer";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HomeUser = ({ userHome }) => {
  const [temperatura, setTemperatura] = useState(0);
  const [temperaturaEstado, setTemperaturaEstado] = useState("Desconocido");
  const [lluviaValor, setLluviaValor] = useState(0);
  const [lluviaEstado, setLluviaEstado] = useState("Desconocido");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [temperaturaResponse, lluviaResponse] = await Promise.all([
          axios.get(`http://localhost:1880/temperaturapornodo?id=${userHome}`),
          axios.get(`http://localhost:1880/lluviapornodo?id=${userHome}`),
        ]);

        // Temperatura
        if (temperaturaResponse.data) {
          const temperaturaData = temperaturaResponse.data[0];
          const temperaturaActual = temperaturaData?.valor || 0;
          const temperaturaEstadoActual =
            temperaturaData?.estado || "Desconocido";
          setTemperatura(temperaturaActual);
          setTemperaturaEstado(temperaturaEstadoActual);
        }

        // Lluvia
        if (lluviaResponse.data) {
          const lluviaData = lluviaResponse.data[0];
          const lluviaValorActual = lluviaData?.valor || 0;
          const lluviaEstadoActual = lluviaData?.estado || "Desconocido";
          setLluviaValor(lluviaValorActual);
          setLluviaEstado(lluviaEstadoActual);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000); // Intervalo de 5 segundos
    return () => clearInterval(intervalId);
  }, [userHome]);

  const handleLogout = () => {
    navigate("/"); // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <Container>
      <LogoutButton onClick={handleLogout}>Cerrar sesión</LogoutButton>
      <Title>Bienvenido, Usuario de la casa {userHome}</Title>
      <ContentWrapper>
        <Section>
          <InfoLabel>Temperatura:</InfoLabel>
          <SpeedometerWrapper>
            <ReactSpeedometer
              maxValue={150}
              value={temperatura}
              needleColor="#FFC107"
              startColor="#FFC107"
              segments={5}
              endColor="#DC3545"
            />
          </SpeedometerWrapper>
          <InfoValue>Estado: {temperaturaEstado}</InfoValue>
        </Section>
        <Section>
          <InfoLabel>Lluvia:</InfoLabel>
          <SpeedometerWrapper>
            <ReactSpeedometer
              maxValue={100} // Ajusta según el rango de valores esperados para la lluvia
              value={lluviaValor}
              needleColor="#007BFF"
              startColor="#28A745"
              segments={4}
              endColor="#DC3545"
            />
          </SpeedometerWrapper>
          <InfoValue>Estado: {lluviaEstado}</InfoValue>
        </Section>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: #e6f2ff; /* Azul pastel */
  padding: 20px;
  font-family: Arial, sans-serif;
  height: 100vh;
  overflow-y: auto;
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Title = styled.h2`
  color: #343a40;
  margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const InfoLabel = styled.p`
  font-weight: bold;
  margin-bottom: 8px;
  color: black;
`;

const InfoValue = styled.p`
  font-size: 18px;
`;

const SpeedometerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default HomeUser;
