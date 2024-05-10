const userModel = require("../models/UserModel");

exports.login = (req, res) => {
  const { username, password } = req.body;

  userModel.getUserByUsername(username, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    if (user.password !== password) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Inicio de sesión exitoso
    const userData = {
      id: user.id,
      username: user.username,
      nodo: user.nodo,
      rol: user.rol, // Incluir el campo 'rol' en los datos del usuario
    };
    res.status(200).json(userData);
  });
};
