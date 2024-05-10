import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactSpeedometer from "react-d3-speedometer";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HomeUser = ({ userHome }) => {
  const [cantidadGas, setCantidadGas] = useState(0);
  const [temperatura, setTemperatura] = useState(0);
  const [incendio, setIncendio] = useState(false);
  const [estadoPuerta, setEstadoPuerta] = useState("Desconocido");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gasResponse = await axios.get(
          `http://localhost:1880/gaspornodo?id=${userHome}`
        );
        if (gasResponse.data && gasResponse.data.length > 0) {
          const firstElement = gasResponse.data[0];
          if (firstElement && firstElement.cantidadgas !== undefined) {
            setCantidadGas(firstElement.cantidadgas);
          }
        }

        const puertaResponse = await axios.get(
          `http://localhost:1880/puertapornodo?id=${userHome}`
        );
        if (puertaResponse.data && puertaResponse.data.length > 0) {
          const firstElement = puertaResponse.data[0];
          if (firstElement && firstElement.estadopuerta !== undefined) {
            const estado =
              firstElement.estadopuerta === 1
                ? "Puerta Abierta!"
                : "Puerta Cerrada";
            setEstadoPuerta(estado);
          }
        }

        const fuegoResponse = await axios.get(
          `http://localhost:1880/fuegopornodo?id=${userHome}`
        );
        if (fuegoResponse.data && fuegoResponse.data.length > 0) {
          const firstElement = fuegoResponse.data[0];
          if (firstElement && firstElement.fuego !== undefined) {
            const temperaturaActual = firstElement.temperatura || 0;
            setIncendio(firstElement.fuego === 1);
            setTemperatura(temperaturaActual);
          }
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, [userHome]);

  const handleLogout = () => {
    navigate("/"); // Redirige al usuario a la página de inicio de sesión
  };

  const handleMotorStateChange = async (newState) => {
    try {
      const response = await axios.post("http://localhost:1880/estadoMotor", {
        userHome,
        estado: newState ? 1 : 0, // Convertir newState (booleano) a 1 (true) o 0 (false)
      });
      console.log("Estado del motor actualizado:", response.data);
    } catch (error) {
      console.error("Error al actualizar el estado del motor:", error);
    }
  };

  return (
    <Container>
      <LogoutButton onClick={handleLogout}>Cerrar sesión</LogoutButton>
      <Title>Bienvenido, Usuario de la casa {userHome}</Title>
      <ContentWrapper>
        <Section>
          <InfoLabel>Estado de la puerta:</InfoLabel>
          <InfoValue>{estadoPuerta}</InfoValue>
        </Section>
        <Section>
          <InfoLabel>Cantidad de gas:</InfoLabel>
          <SpeedometerWrapper>
            <ReactSpeedometer
              maxValue={4000}
              value={cantidadGas}
              needleColor="#007BFF"
              startColor="#28A745"
              segments={4}
              endColor="#DC3545"
            />
          </SpeedometerWrapper>
          <Button onClick={() => handleMotorStateChange(true)}>
            Encender Motor
          </Button>
          <Button onClick={() => handleMotorStateChange(false)}>
            Apagar Motor
          </Button>
        </Section>
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
          <InfoLabel>Fuego:</InfoLabel>
          <InfoValue style={{ color: incendio ? "#DC3545" : "#28A745" }}>
            {incendio ? "¡Incendio detectado!" : "Sin presencia de fuego"}
          </InfoValue>
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

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
`;

export default HomeUser;
