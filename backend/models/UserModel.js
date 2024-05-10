// models/UserModel.js
const db = require("../db/db");

exports.getUserByUsername = (username, callback) => {
  const query = "SELECT * FROM usuarios_parcial WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error al buscar usuario por nombre de usuario:", err);
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback(null, null); // Usuario no encontrado
    }
    const user = results[0];
    return callback(null, user);
  });
};

// Función para crear un nuevo usuario
exports.createUser = (username, password, nodo, rol, callback) => {
  const query =
    "INSERT INTO usuarios_parcial (username, password, nodo, rol) VALUES (?, ?, ?, ?)";
  db.query(query, [username, password, nodo, rol], (err, results) => {
    if (err) {
      console.error("Error al crear un nuevo usuario:", err);
      return callback(err, null);
    }
    const newUser = {
      id: results.insertId,
      username: username,
      password: password,
      nodo: nodo,
      rol: rol,
    };
    return callback(null, newUser);
  });
};

// Función para obtener todos los usuarios
exports.getAllUsers = (callback) => {
  const query = "SELECT * FROM usuarios_parcial";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener todos los usuarios:", err);
      return callback(err, null);
    }
    return callback(null, results);
  });
};

// Función para actualizar un usuario existente
exports.updateUser = (id, username, password, nodo, rol, callback) => {
  const query =
    "UPDATE usuarios_parcial SET username = ?, password = ?, nodo = ?, rol = ? WHERE id = ?";
  db.query(query, [username, password, nodo, rol, id], (err, results) => {
    if (err) {
      console.error("Error al actualizar el usuario:", err);
      return callback(err, null);
    }
    // Comprobar si se actualizó correctamente
    if (results.affectedRows === 0) {
      return callback({ message: "Usuario no encontrado" }, null);
    }
    const updatedUser = {
      id: id,
      username: username,
      password: password,
      nodo: nodo,
      rol: rol,
    };
    return callback(null, updatedUser);
  });
};

// Función para eliminar un usuario existente
exports.deleteUser = (id, callback) => {
  const query = "DELETE FROM usuarios_parcial WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error al eliminar el usuario:", err);
      return callback(err, null);
    }
    // Comprobar si se eliminó correctamente
    if (results.affectedRows === 0) {
      return callback({ message: "Usuario no encontrado" }, null);
    }
    return callback(null, { message: "Usuario eliminado correctamente" });
  });
};
