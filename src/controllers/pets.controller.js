import mongoose from 'mongoose';
import logger from '../config/logger.js';
import { PetService } from '../services/pet.service.js';

const petService = new PetService();

export class PetController {
  /**
   * @swagger
   * /pets:
   *   get:
   *     summary: Obtener todas las mascotas
   *     tags: [Pets]
   *     responses:
   *       200:
   *         description: Lista de mascotas
   */
  static async getAll(req, res) {
    try {
      const pets = await petService.getAll();
      logger.info('📥 Mascotas obtenidas correctamente');
      res.status(200).json({ status: "success", pets });
    } catch (err) {
      logger.error(`❌ Error al obtener mascotas: ${err.message}`);
      res.status(500).json({ status: "error", error: "Internal server error" });
    }
  }

  /**
   * @swagger
   * /pets/{id}:
   *   get:
   *     summary: Obtener una mascota por ID
   *     tags: [Pets]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Mascota encontrada
   *       404:
   *         description: No encontrada
   */
  static async getById(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn(`❌ Formato de ID inválido: ${id}`);
      return res.status(400).json({ status: "error", error: "Invalid pet ID format" });
    }

    try {
      const pet = await petService.getById(id);
      if (!pet) {
        logger.warn(`⚠️ Mascota no encontrada: ${id}`);
        return res.status(404).json({ status: "error", error: "Pet not found" });
      }
      logger.info(`📥 Mascota obtenida: ${id}`);
      res.status(200).json({ status: "success", pet });
    } catch (err) {
      logger.error(`❌ Error al obtener mascota: ${err.message}`);
      res.status(500).json({ status: "error", error: "Internal server error" });
    }
  }

  /**
   * @swagger
   * /pets:
   *   post:
   *     summary: Crear una nueva mascota
   *     tags: [Pets]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - type
   *               - age
   *             properties:
   *               name:
   *                 type: string
   *               type:
   *                 type: string
   *               age:
   *                 type: number
   *     responses:
   *       201:
   *         description: Mascota creada
   *       400:
   *         description: Datos inválidos
   */
  
  static async create(req, res) {
    const { name, type, specie, age } = req.body;
    if (!name || !type || !specie || typeof age !== 'number') {
      logger.warn('⚠️ Campos faltantes o incorrectos al crear mascota');
      return res.status(400).json({ status: "error", error: "Missing or invalid fields" });
    }

    try {
      const pet = await petService.create({ name, type, specie, age });
      logger.info(`✅ Mascota creada: ${pet._id}`);
      res.status(201).json({ status: "success", pet });
    } catch (err) {
      logger.error(`❌ Error al crear mascota: ${err.message}`);
      res.status(500).json({ status: "error", error: "Internal server error" });
    }
  }
static async update(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn(`❌ Formato de ID inválido: ${id}`);
      return res.status(400).json({ status: "error", error: "Invalid pet ID format" });
    }

    try {
      const updatedPet = await petService.update(id, req.body);
      if (!updatedPet) {
        logger.warn(`⚠️ Mascota no encontrada para actualizar: ${id}`);
        return res.status(404).json({ status: "error", error: "Pet not found" });
      }
      logger.info(`♻️ Mascota actualizada: ${id}`);
      res.status(200).json({ status: "success", pet: updatedPet });
    } catch (err) {
      logger.error(`❌ Error al actualizar mascota: ${err.message}`);
      res.status(500).json({ status: "error", error: "Internal server error" });
    }
  }

  /**
   * @swagger
   * /pets/{id}:
   *   delete:
   *     summary: Eliminar una mascota
   *     tags: [Pets]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Mascota eliminada
   *       404:
   *         description: No encontrada
   */
  static async delete(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn(`❌ Formato de ID inválido: ${id}`);
      return res.status(400).json({ status: "error", error: "Invalid pet ID format" });
    }

    try {
      const deleted = await petService.delete(id);
      if (!deleted) {
        logger.warn(`⚠️ Mascota no encontrada para eliminar: ${id}`);
        return res.status(404).json({ status: "error", error: "Pet not found" });
      }
      logger.info(`🗑️ Mascota eliminada: ${id}`);
      res.status(200).json({ status: "success", message: `Pet ${id} deleted` });
    } catch (err) {
      logger.error(`❌ Error al eliminar mascota: ${err.message}`);
      res.status(500).json({ status: "error", error: "Internal server error" });
    }
  }
}
