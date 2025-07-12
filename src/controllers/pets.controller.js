import mongoose from "mongoose";
import logger from '../config/logger.js';
import Pet from "../models/Pet.js";

// Obtener todas las mascotas
export const getPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    logger.info('📥 Operación exitosa');
    res.status(200).json({ status: "success", pets });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${err.message}`);
    res.status(500).json({ status: "error", error: err.message });
  }
};

// Obtener mascota por ID
export const getPetById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn('❌ Formato de ID inválido');
      return res.status(400).json({ status: "error", error: "Invalid pet ID format" });
    }
    const pet = await Pet.findById(id);
    if (!pet) {
      logger.warn('⚠️ Recurso no encontrado');
      return res.status(404).json({ status: "error", error: "Pet not found" });
    }
    logger.info('📥 Operación exitosa');
    res.status(200).json({ status: "success", pet });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${err.message}`);
    res.status(500).json({ status: "error", error: err.message });
  }
};

// Crear una mascota
export const createPet = async (req, res) => {
  try {
    const { name, type, age } = req.body;
    if (!name || !type || typeof age !== 'number') {
      return res.status(400).json({ status: "error", error: "Missing required fields" });
    }
    const pet = new Pet({ name, type, age });
    await pet.save();
    logger.info('✅ Recurso creado correctamente');
    res.status(201).json({ status: "success", pet });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${err.message}`);
    res.status(500).json({ status: "error", error: err.message });
  }
};

// Actualizar mascota
export const updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn('❌ Formato de ID inválido');
      return res.status(400).json({ status: "error", error: "Invalid pet ID format" });
    }
    const updatedPet = await Pet.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPet) {
      logger.warn('⚠️ Recurso no encontrado');
      return res.status(404).json({ status: "error", error: "Pet not found" });
    }
    logger.info('📥 Operación exitosa');
    res.status(200).json({ status: "success", pet: updatedPet });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${err.message}`);
    res.status(500).json({ status: "error", error: err.message });
  }
};

// Borrar mascota
export const deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn('❌ Formato de ID inválido');
      return res.status(400).json({ status: "error", error: "Invalid pet ID format" });
    }
    const deleted = await Pet.findByIdAndDelete(id);
    if (!deleted) {
      logger.warn('⚠️ Recurso no encontrado');
      return res.status(404).json({ status: "error", error: "Pet not found" });
    }
    logger.info('📥 Operación exitosa');
    res.status(200).json({ status: "success", message: `Pet ${id} deleted` });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${err.message}`);
    res.status(500).json({ status: "error", error: err.message });
  }
};
