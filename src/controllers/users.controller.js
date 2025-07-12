import logger from '../utils/logger.js';
import User from "../models/User.js";
import bcrypt from "bcrypt";

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    logger.info('📥 Operación exitosa');
    res.status(200).json({ status: "success", users });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${error.message}`);
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return logger.warn('⚠️ Recurso no encontrado');
    res.status(404).json({ status: "error", message: "User not found" });
    }
    logger.info('📥 Operación exitosa');
    res.status(200).json({ status: "success", user });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${error.message}`);
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Crear usuario
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ status: "error", message: "Missing required fields" });
    }
    // Chequear si el email ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ status: "error", message: "Email already registered" });
    }
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    logger.info('✅ Recurso creado correctamente');
    res.status(201).json({ status: "success", user });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${error.message}`);
    res.status(500).json({ status: "error", message: err.message });
  }
};
