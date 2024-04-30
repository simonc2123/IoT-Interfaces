
const db = require("../db/db");

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
exports.createUser = (username, password, callback) => {
  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Error al crear un nuevo usuario:", err);
      return callback(err, null);
    }
    const newUser = {
      id: results.insertId,
      username: username,
      password: password,
    };
    return callback(null, newUser);
  });
};
