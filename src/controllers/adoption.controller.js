import mongoose from "mongoose";
import logger from '../config/logger.js';
import Adoption from "../models/Adoption.js";
import Pet from "../models/Pet.js";
import User from "../models/User.js";

// Obtener todas las adopciones (con populate)
export const getAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find()
      .populate("user")
      .populate("pet");
    logger.info('📥 Operación exitosa');
    res.status(200).json({ status: "success", adoptions });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${err.message}`);
    res.status(500).json({ status: "error", error: err.message });
  }
};

// Obtener una adopción por ID
export const getAdoptionById = async (req, res) => {
  try {
    const { id } = req.params;
    // Validación de formato de ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn('❌ Formato de ID inválido');
      return res.status(400).json({ status: "error", error: "Invalid adoption ID format" });
    }
    const adoption = await Adoption.findById(id)
      .populate("user")
      .populate("pet");
    if (!adoption) {
      logger.warn('⚠️ Recurso no encontrado');
      return res.status(404).json({ status: "error", error: "Adoption not found" });
    }
    logger.info('📥 Operación exitosa');
    res.status(200).json({ status: "success", adoption });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${err.message}`);
    res.status(500).json({ status: "error", error: err.message });
  }
};

// Crear una adopción
export const createAdoption = async (req, res) => {
  try {
    const { user, pet } = req.body;
    // Validar campos requeridos
    if (!user || !pet) {
      return res.status(400).json({ status: "error", error: "User and Pet are required" });
    }
    // Validación simple de existencia de usuario y mascota
    const foundUser = await User.findById(user);
    const foundPet = await Pet.findById(pet);
    if (!foundUser || !foundPet) {
      return res.status(400).json({ status: "error", error: "User or Pet not found" });
    }
    const adoption = new Adoption({ user, pet });
    await adoption.save();

    // Devolver la adopción con populate
    const populatedAdoption = await Adoption.findById(adoption._id)
      .populate("user")
      .populate("pet");

    logger.info('✅ Recurso creado correctamente');
    res.status(201).json({ status: "success", adoption: populatedAdoption });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${err.message}`);
    res.status(500).json({ status: "error", error: err.message });
  }
};

// Borrar una adopción por ID
export const deleteAdoption = async (req, res) => {
  try {
    const { id } = req.params;
    // Validación de formato de ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn('❌ Formato de ID inválido');
      return res.status(400).json({ status: "error", error: "Invalid adoption ID format" });
    }
    const deleted = await Adoption.findByIdAndDelete(id);
    if (!deleted) {
      logger.warn('⚠️ Recurso no encontrado');
      return res.status(404).json({ status: "error", error: "Adoption not found" });
    }
    logger.info('📥 Operación exitosa');
    res.status(200).json({ status: "success", message: `Adoption ${id} deleted` });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${err.message}`);
    res.status(500).json({ status: "error", error: err.message });
  }
};
