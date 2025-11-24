import express from "express";
import { testUserController, register, login } from "../controllers/userController.js";

const router = express.Router();

// Ruta de prueba para el controlador de usuarios
router.get("/test", testUserController);

// Ruta para registrar un nuevo usuario
router.post("/register", register);

// Ruta para iniciar sesión
router.post("/login", login);

export default router;