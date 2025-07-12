import logger from '../utils/logger.js';
import Pet from "../models/Pet.js";

// Obtener todas las mascotas
export const getPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    logger.info('📥 Operación exitosa');
    res.status(200).json({ status: "success", pets });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${error.message}`);
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Obtener mascota por ID
export const getPetById = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id);
    if (!pet) {
      return logger.warn('⚠️ Recurso no encontrado');
    res.status(404).json({ status: "error", message: "Pet not found" });
    }
    logger.info('📥 Operación exitosa');
    res.status(200).json({ status: "success", pet });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${error.message}`);
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Crear una mascota
export const createPet = async (req, res) => {
  try {
    const { name, type, age } = req.body;
    if (!name || !type || typeof age !== 'number') {
      return res.status(400).json({ status: "error", message: "Missing required fields" });
    }
    const pet = new Pet({ name, type, age });
    await pet.save();
    logger.info('✅ Recurso creado correctamente');
    res.status(201).json({ status: "success", pet });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${error.message}`);
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Actualizar mascota
export const updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPet = await Pet.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPet) {
      return logger.warn('⚠️ Recurso no encontrado');
    res.status(404).json({ status: "error", message: "Pet not found" });
    }
    logger.info('📥 Operación exitosa');
    res.status(200).json({ status: "success", pet: updatedPet });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${error.message}`);
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Borrar mascota
export const deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Pet.findByIdAndDelete(id);
    if (!deleted) {
      return logger.warn('⚠️ Recurso no encontrado');
    res.status(404).json({ status: "error", message: "Pet not found" });
    }
    logger.info('📥 Operación exitosa');
    res.status(200).json({ status: "success", message: `Pet ${id} deleted` });
  } catch (err) {
    logger.error(`❌ Error del servidor: ${error.message}`);
    res.status(500).json({ status: "error", message: err.message });
  }
};
