// controllers/userController.js
const userModel = require("../models/UserModel");

// Controlador para crear un nuevo usuario
exports.createUser = (req, res) => {
  const { username, password, home, rol } = req.body;

  // Llamar a la función del modelo para crear un nuevo usuario
  userModel.createUser(username, password, home, rol, (err, newUser) => {
    if (err) {
      console.error("Error al crear un nuevo usuario:", err);
      return res
        .status(500)
        .json({ message: "Error al crear un nuevo usuario" });
    }

    res.status(201).json(newUser);
  });
};

// Controlador para obtener todos los usuarios
exports.getAllUsers = (req, res) => {
  // Llamar a la función del modelo para obtener todos los usuarios
  userModel.getAllUsers((err, users) => {
    if (err) {
      console.error("Error al obtener todos los usuarios:", err);
      return res
        .status(500)
        .json({ message: "Error al obtener todos los usuarios" });
    }

    res.status(200).json(users);
  });
};

// Controlador para actualizar un usuario existente
exports.updateUser = (req, res) => {
  const { id } = req.params; // ID del usuario a actualizar
  const { username, password, home, rol } = req.body;

  // Llamar a la función del modelo para actualizar el usuario
  userModel.updateUser(
    id,
    username,
    password,
    home,
    rol,
    (err, updatedUser) => {
      if (err) {
        console.error("Error al actualizar el usuario:", err);
        return res
          .status(500)
          .json({ message: "Error al actualizar el usuario" });
      }

      res.status(200).json(updatedUser);
    }
  );
};


// Función para eliminar un usuario existente
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  console.log(id);
  // Llamar a la función del modelo para eliminar un usuario por ID
  userModel.deleteUser(id, (err, result) => {
    if (err) {
      console.error("Error al eliminar el usuario:", err);
      return res.status(500).json({ message: "Error al eliminar el usuario" });
    }

    // Verificar si se encontró y eliminó correctamente el usuario
    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  });
};

