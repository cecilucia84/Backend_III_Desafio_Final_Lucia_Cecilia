import mongoose from "mongoose";
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
    logger.error(`❌ Error del servidor: ${err.message}`);
    res.status(500).json({ status: "error", error: err.message });
  }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn('❌ Formato de ID inválido');
      return res.status(400).json({ status: "error", error: "Invalid user ID format" });
    }
    const user = await User.findById(id);
    if (!user) {
      logger.warn('⚠️ Recurso no encontrado');
      return res.status(404).json({ status: "error", error: "User not found" });
    }
    logger.info('📥 Operación exitosa');
    res.status(200).json({ status: "success", user });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${err.message}`);
    res.status(500).json({ status: "error", error: err.message });
  }
};

// Crear usuario
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ status: "error", error: "Missing required fields" });
    }
    // Chequear si el email ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ status: "error", error: "Email already registered" });
    }
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    logger.info('✅ Recurso creado correctamente');
    res.status(201).json({ status: "success", user });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${err.message}`);
    res.status(500).json({ status: "error", error: err.message });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn('❌ Formato de ID inválido');
      return res.status(400).json({ status: "error", error: "Invalid user ID format" });
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      logger.warn('⚠️ Recurso no encontrado');
      return res.status(404).json({ status: "error", error: "User not found" });
    }
    logger.info('📥 Operación exitosa');
    res.status(200).json({ status: "success", user: updatedUser });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${err.message}`);
    res.status(500).json({ status: "error", error: err.message });
  }
};

// Borrar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn('❌ Formato de ID inválido');
      return res.status(400).json({ status: "error", error: "Invalid user ID format" });
    }
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      logger.warn('⚠️ Recurso no encontrado');
      return res.status(404).json({ status: "error", error: "User not found" });
    }
    logger.info('📥 Operación exitosa');
    res.status(200).json({ status: "success", message: `User ${id} deleted` });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${err.message}`);
    res.status(500).json({ status: "error", error: err.message });
  }
};
