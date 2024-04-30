const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const app = express();
const port = 5050;

// Middleware para procesar datos JSON
app.use(cors());
app.use(express.json());
// Rutas de autenticación
app.use("/auth", authRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
