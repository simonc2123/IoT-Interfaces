import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HomeAdmin = () => {
  const navigate = useNavigate();

  // Estado y funciones para la gestión de usuarios
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    username: "",
    password: "",
    home: "",
    rol: "",
  });

  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/getUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al cargar los usuarios:", error);
    }
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await axios.put(
          `http://localhost:5050/api/updateUser/${formData.id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:5050/api/createUser", formData);
      }
      loadUsers();
      setFormData({ id: null, username: "", password: "", home: "", rol: "" });
    } catch (error) {
      console.error("Error al crear o actualizar usuario:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/deleteUser/${id}`);
      loadUsers();
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const handleEditUser = (user) => {
    setFormData({
      id: user.id,
      username: user.username,
      password: user.password,
      home: user.home,
      rol: user.rol,
    });
  };

  // Estado y funciones para la gestión de nodos
  const [nodes, setNodes] = useState([]);
  const [formDataNode, setFormDataNode] = useState({
    idnodo: "",
    estado: "activo",
    ubicacion: "",
  });
  const [editNodeId, setEditNodeId] = useState(null);

  const loadNodes = async () => {
    try {
      const response = await axios.get("http://localhost:1880/consultanodo");
      setNodes(response.data);
    } catch (error) {
      console.error("Error al cargar los nodos:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataNode({ ...formDataNode, [name]: value });
  };

  const handleNodeSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:1880/creacionnodo", formDataNode);
      setFormDataNode({ idnodo: "", estado: "", ubicacion: "" });
      loadNodes();
    } catch (error) {
      console.error("Error al crear el nodo:", error);
    }
  };

  const handleEditNode = (idnodo) => {
    const editedNode = nodes.find((node) => node.idnodo === idnodo);
    if (editedNode) {
      setFormDataNode({
        idnodo: editedNode.idnodo,
        estado: editedNode.estado,
        ubicacion: editedNode.ubicacion,
      });
      setEditNodeId(idnodo);
    }
  };

  const handleUpdateNode = async () => {
    try {
      const { idnodo, estado, ubicacion } = formDataNode;
      const updatedNodeData = {
        idnodo,
        estado,
        ubicacion,
      };
      // Realiza una solicitud POST con los datos actualizados
      await axios.post(
        `http://localhost:1880/modificacionnodo`,
        updatedNodeData
      );
      setEditNodeId(null); // Restablece el estado de edición
      setFormDataNode({ idnodo: "", estado: "", ubicacion: "" });
      loadNodes(); // Vuelve a cargar la lista de nodos actualizada
    } catch (error) {
      console.error("Error al actualizar el nodo:", error);
    }
  };

  const handleCancelEdit = () => {
    const editedNode = nodes.find((node) => node.idnodo === editNodeId);
    if (editedNode) {
      setFormDataNode({
        idnodo: editedNode.idnodo,
        estado: editedNode.estado,
        ubicacion: editedNode.ubicacion,
      });
      setEditNodeId(null);
    }
  };

  const handleLogout = () => {
    navigate("/");
    console.log("Logout clicked");
  };

  useEffect(() => {
    loadUsers();
    loadNodes();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Admin Dashboard</Title>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>
      <Content>
        <UserForm onSubmit={handleUserSubmit}>
          <h3>Gestión de Usuarios</h3>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleUserInputChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleUserInputChange}
          />
          <Input
            type="text"
            name="home"
            placeholder="Home"
            value={formData.home}
            onChange={handleUserInputChange}
          />
          <Select
            name="rol"
            value={formData.rol}
            onChange={handleUserInputChange}
          >
            <option></option>
            <option value="usuario">Usuario</option>
            <option value="bombero">Bombero</option>
            <option value="vigilante">Vigilante</option>
            <option value="admin">Admin</option>
          </Select>
          <Button type="submit">
            {formData.id ? "Actualizar" : "Crear"} Usuario
          </Button>
        </UserForm>
        <UserList>
          <h3>Lista de Usuarios</h3>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Home</th>
                <th>Role</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.home}</td>
                  <td>{user.rol}</td>
                  <td>
                    <Button onClick={() => handleDeleteUser(user.id)}>
                      Eliminar
                    </Button>
                    <Button onClick={() => handleEditUser(user)}>Editar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </UserList>
        <NodeForm onSubmit={handleNodeSubmit}>
          <h3>Crear Nodo</h3>
          <Input
            type="text"
            name="idnodo"
            placeholder="ID Nodo"
            value={formDataNode.idnodo}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="ubicacion"
            placeholder="Ubicación"
            value={formDataNode.ubicacion}
            onChange={handleInputChange}
          />
          <Select
            name="estado"
            value={formDataNode.estado}
            onChange={handleInputChange}
          >
            <option></option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </Select>
          <Button type="submit">Crear Nodo</Button>
        </NodeForm>
        <NodeListContainer>
          <h3>Lista de Nodos</h3>
          <Table>
            <thead>
              <tr>
                <th>ID Nodo</th>
                <th>Estado</th>
                <th>Ubicación</th>
                <th>Hora de actualizacion</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((node) => (
                <tr key={node.idnodo}>
                  <td>{node.idnodo}</td>
                  <td>{node.estado}</td>
                  <td>{node.ubicacion}</td>
                  <td>{node.fecha_actualizacion}</td>
                  <td>
                    {editNodeId === node.idnodo ? (
                      <>
                        <Input
                          type="text"
                          name="idnodo"
                          placeholder="ID Nodo"
                          value={formDataNode.idnodo}
                          onChange={handleInputChange}
                        />
                        <Input
                          type="text"
                          name="ubicacion"
                          placeholder="Ubicación"
                          value={formDataNode.ubicacion}
                          onChange={handleInputChange}
                        />
                        <Select
                          name="estado"
                          value={formDataNode.estado}
                          onChange={handleInputChange}
                        >
                          <option></option>
                          <option value="activo">Activo</option>
                          <option value="inactivo">Inactivo</option>
                        </Select>
                        <Button onClick={handleUpdateNode}>
                          Actualizar Nodo
                        </Button>
                        <CancelButton onClick={handleCancelEdit}>
                          Cancelar
                        </CancelButton>
                      </>
                    ) : (
                      <Button onClick={() => handleEditNode(node.idnodo)}>
                        Editar
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </NodeListContainer>
      </Content>
    </Container>
  );
};

// Styled components definitions
const Container = styled.div`
  background-color: #f0f8ff;
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

const Title = styled.h2`
  color: #343a40;
`;

const LogoutButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
`;

const Select = styled.select`
  margin-bottom: 10px;
  padding: 8px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
`;

const CancelButton = styled(Button)`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
`;

const UserForm = styled(Form)`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const UserList = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const NodeForm = styled(Form)`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const NodeListContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
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

export default HomeAdmin;
