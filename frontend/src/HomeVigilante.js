import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HomeVigilante = () => {
  const [estadoPuerta, setEstadoPuerta] = useState("");
  const [puertaData, setPuertaData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const puertaResponse = await axios.get("http://localhost:1880/puerta");
        if (puertaResponse.data && puertaResponse.data.length > 0) {
          const ultimoRegistro = puertaResponse.data[0];
          setEstadoPuerta(
            ultimoRegistro.estadopuerta === 1 ? "Abierta" : "Cerrada"
          );
          setPuertaData(puertaResponse.data);
        }
      } catch (error) {
        console.error("Error al obtener los datos de la puerta:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000); // Consulta cada 5 segundos
    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);

  const handleLogout = () => {
    navigate("/"); // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <Container>
      <Header>
        <h2>Bienvenido, Vigilante</h2>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>
      <StatusSection>
        <h3>Estado de la Puerta</h3>
        <StatusIndicator color={estadoPuerta === "Abierta" ? "red" : "green"}>
          {estadoPuerta}
        </StatusIndicator>
      </StatusSection>
      <TableSection>
        <h3>Registros de la Puerta</h3>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nodo</th>
              <th>Estado</th>
              <th>Fecha y Hora</th>
            </tr>
          </thead>
          <tbody>
            {puertaData.map((registro) => (
              <tr key={registro.id}>
                <td>{registro.id}</td>
                <td>Casa {registro.nodo}</td>
                <td>{registro.estadopuerta === 1 ? "Abierta" : "Cerrada"}</td>
                <td>{registro.fechahora}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableSection>
    </Container>
  );
};

const Container = styled.div`
  background-color: #f0f8ff; /* Azul pastel muy claro */
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
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const StatusSection = styled.div`
  margin-bottom: 30px;
`;

const StatusIndicator = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

const TableSection = styled.div``;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border: 1px solid #ddd;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

export default HomeVigilante;
