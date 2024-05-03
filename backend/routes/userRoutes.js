// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Ruta para crear un nuevo usuario (POST /api/users)
router.post("/createUser", userController.createUser);

// Ruta para obtener todos los usuarios (GET /api/users)
router.get("/getUsers", userController.getAllUsers);

// Ruta para actualizar un usuario existente (PUT /api/users/:id)
router.put("/updateUser/:id", userController.updateUser);

// Ruta para eliminar un usuario existente (DELETE /api/users/:id)
router.delete("/deleteUser/:id", userController.deleteUser);

module.exports = router;
