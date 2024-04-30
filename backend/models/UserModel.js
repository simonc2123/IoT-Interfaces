const db = require("../db/db");

// Función para obtener un usuario por nombre de usuario
exports.getUserByUsername = (username, callback) => {
  const query = "SELECT * FROM users WHERE username = ?";
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
exports.createUser = (username, password, rol, callback) => {
  const query = "INSERT INTO users (username, password, rol) VALUES (?, ?, ?)";
  db.query(query, [username, password, rol], (err, results) => {
    if (err) {
      console.error("Error al crear un nuevo usuario:", err);
      return callback(err, null);
    }
    const newUser = {
      id: results.insertId,
      username: username,
      password: password,
      rol: rol,
    };
    return callback(null, newUser);
  });
};
