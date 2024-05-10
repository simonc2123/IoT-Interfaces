import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const HomeAdmin = () => {
  const [selectedNode, setSelectedNode] = useState(1); // Nodo seleccionado por defecto
  const [temperaturaData, setTemperaturaData] = useState([]);
  const [lluviaData, setLluviaData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(selectedNode); // Cargar datos del nodo seleccionado al inicio
    const intervalId = setInterval(() => {
      fetchData(selectedNode); // Actualizar datos cada 8 segundos
    }, 8000);

    return () => clearInterval(intervalId); // Limpiar intervalo al desmontar el componente
  }, [selectedNode]); // Se ejecuta cuando cambia el nodo seleccionado

  const fetchData = async (nodeId) => {
    try {
      const [temperaturaResponse, lluviaResponse] = await Promise.all([
        axios.get(`http://localhost:1880/temperatura?id=${nodeId}`),
        axios.get(`http://localhost:1880/lluvia?id=${nodeId}`),
      ]);

      if (temperaturaResponse.data && temperaturaResponse.data.length > 0) {
        setTemperaturaData(temperaturaResponse.data);
      }

      if (lluviaResponse.data && lluviaResponse.data.length > 0) {
        setLluviaData(lluviaResponse.data);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const handleNodeSelect = (nodeId) => {
    setSelectedNode(parseInt(nodeId)); // Convertir a entero y actualizar nodo seleccionado
  };

  const handleLogout = () => {
    navigate("/"); // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <Container>
      <LogoutButton onClick={handleLogout}>Cerrar sesión</LogoutButton>
      <Title>Panel de Administrador</Title>
      <NodeSelector>
        <label>Seleccionar Nodo:</label>
        <select
          value={selectedNode}
          onChange={(e) => handleNodeSelect(e.target.value)}
        >
          <option value={1}>Nodo 1</option>
          <option value={2}>Nodo 2</option>
        </select>
      </NodeSelector>
      {selectedNode && (
        <DataDisplay>
          <DataSection>
            <SectionTitle>Temperatura (°C)</SectionTitle>
            <DataTable>
              <thead>
                <tr>
                  <th>Fecha y Hora</th>
                  <th>Valor</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {temperaturaData.map((data) => (
                  <tr key={data.id}>
                    <td>{data.fecha}</td>
                    <td>{data.valor}</td>
                    <td>{data.estado}</td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
            <StyledLineChart width={600} height={300} data={temperaturaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="valor" stroke="#8884d8" />
            </StyledLineChart>
          </DataSection>
          <DataSection>
            <SectionTitle>Lluvia</SectionTitle>
            <DataTable>
              <thead>
                <tr>
                  <th>Fecha y Hora</th>
                  <th>Valor</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {lluviaData.map((data) => (
                  <tr key={data.id}>
                    <td>{data.fecha}</td>
                    <td>{data.valor}</td>
                    <td>{data.estado}</td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
            <StyledLineChart width={600} height={300} data={lluviaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="valor" stroke="#82ca9d" />
            </StyledLineChart>
          </DataSection>
        </DataDisplay>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: #e6f2ff; /* Azul pastel */
  padding: 20px;
  font-family: Arial, sans-serif;
  height: 100vh; /* Utilizar todo el alto de la ventana */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 20px;
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

const NodeSelector = styled.div`
  margin-bottom: 20px;

  label {
    margin-right: 10px;
  }

  select {
    padding: 8px;
    border-radius: 4px;
  }
`;

const DataDisplay = styled.div`
  display: flex;
  flex-direction: column; /* Cambia la disposición a vertical */
  align-items: center;
  width: 100%;
  overflow: auto; /* Desactivar scroll en el contenedor principal */
`;

const DataSection = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const SectionTitle = styled.h3`
  color: #343a40;
  margin-bottom: 10px;
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;

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

const StyledLineChart = styled(LineChart)`
  margin-top: 20px;
`;

export default HomeAdmin;
