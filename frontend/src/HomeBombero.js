import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HomeBombero = () => {
  const [fuegoData, setFuegoData] = useState([]);
  const [gasData, setGasData] = useState([]);
  const [ultimoRegistroFuego, setUltimoRegistroFuego] = useState({});
  const [ultimoRegistroGas, setUltimoRegistroGas] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fuegoResponse = await axios.get("http://localhost:1880/fuego");
        const gasResponse = await axios.get("http://localhost:1880/gas");

        if (fuegoResponse.data && fuegoResponse.data.length > 0) {
          setFuegoData(fuegoResponse.data);
          setUltimoRegistroFuego(fuegoResponse.data[0]);
        }

        if (gasResponse.data && gasResponse.data.length > 0) {
          const formattedGasData = gasResponse.data.map((registro) => ({
            ...registro,
            estado: registro.cantidadgas === 0 ? "No" : "Sí",
          }));
          setGasData(formattedGasData);
          setUltimoRegistroGas(formattedGasData[0]);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Container>
      <Header>
        <h2>Bienvenido, Bombero</h2>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>
      <Section>
        <StatusContainer>
          <StatusTitle>Estado de Fuego</StatusTitle>
          <FireStatus fuego={ultimoRegistroFuego.fuego === 1} />
        </StatusContainer>
        <h3>Registros de Fuego</h3>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nodo</th>
              <th>Fuego</th>
              <th>Temperatura</th>
              <th>Fecha y Hora</th>
            </tr>
          </thead>
          <tbody>
            {fuegoData.map((registro) => (
              <tr key={registro.id}>
                <td>{registro.id}</td>
                <td>Casa {registro.nodo}</td>
                <td>{registro.fuego === 1 ? "Sí" : "No"}</td>
                <td>{registro.temperatura}</td>
                <td>{registro.fechahora}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
      <Section>
        <StatusContainer>
          <StatusTitle>Estado de Gas</StatusTitle>
          <GasStatusContainer>
            <GasStatus
              ultimo={ultimoRegistroGas.estado === "Sí" ? "Sí" : "No"}
            />
          </GasStatusContainer>
        </StatusContainer>
        <h3>Registros de Gas</h3>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nodo</th>
              <th>Cantidad de Gas</th>
              <th>Estado</th>
              <th>Fecha y Hora</th>
            </tr>
          </thead>
          <tbody>
            {gasData.map((registro) => (
              <tr key={registro.id}>
                <td>{registro.id}</td>
                <td>Casa {registro.nodo}</td>
                <td>{registro.cantidadgas}</td>
                <td>{registro.estado}</td>
                <td>{registro.fechahora}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  background-color: #ffffff;
  padding: 20px;
  font-family: Arial, sans-serif;
  height: 100vh;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const LogoutButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StatusTitle = styled.h3`
  margin-right: 10px;
`;

const FireStatus = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => (props.fuego ? "#DC3545" : "#28A745")};
`;

const GasStatusContainer = styled.div`
  display: flex;
  align-items: center;
`;

const GasStatus = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.ultimo === "No" ? "#28A745" : "#DC3545"};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;

  th,
  td {
    border: 1px solid #ddd;
    padding: 6px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

export default HomeBombero;
