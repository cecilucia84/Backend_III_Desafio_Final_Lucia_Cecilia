import { AdoptionService } from '../services/adoption.service.js';
import Pet from '../models/Pet.js';
import mongoose from 'mongoose';
import logger from '../config/logger.js';

const adoptionService = new AdoptionService();

export class AdoptionController {
  /**
   * @swagger
   * /adoptions:
   *   get:
   *     summary: Obtener todas las adopciones
   *     tags: [Adoptions]
   *     responses:
   *       200:
   *         description: Lista de adopciones
   */
  static async getAll(req, res) {
    try {
      const adoptions = await adoptionService.getAll();
      logger.info('📥 Adopciones obtenidas correctamente');
      res.status(200).json({ status: "success", adoptions });
    } catch (err) {
      logger.error(`❌ Error al obtener adopciones: ${err.message}`);
      res.status(500).json({ status: "error", error: "Internal server error" });
    }
  }

  /**
   * @swagger
   * /adoptions/{id}:
   *   get:
   *     summary: Obtener una adopción por ID
   *     tags: [Adoptions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Adopción encontrada
   *       404:
   *         description: No encontrada
   */
  static async getById(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn(`❌ Formato de ID inválido: ${id}`);
      return res.status(400).json({ status: "error", error: "Invalid ID format" });
    }

    try {
      const adoption = await adoptionService.getById(id);
      if (!adoption) {
        logger.warn(`⚠️ Adopción no encontrada: ${id}`);
        return res.status(404).json({ status: "error", error: "Adoption not found" });
      }
      logger.info(`📥 Adopción obtenida: ${id}`);
      res.status(200).json({ status: "success", adoption });
    } catch (err) {
      logger.error(`❌ Error al obtener adopción: ${err.message}`);
      res.status(500).json({ status: "error", error: "Internal server error" });
    }
  }

  /**
   * @swagger
   * /adoptions:
   *   post:
   *     summary: Crear una nueva adopción
   *     tags: [Adoptions]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               user:
   *                 type: string
   *               pet:
   *                 type: string
   *     responses:
   *       201:
   *         description: Adopción creada
   *       400:
   *         description: Datos inválidos
   */
  static async create(req, res) {
    const { user, pet } = req.body;

    if (!user || !pet) {
      logger.warn('⚠️ Campos requeridos faltantes al crear adopción');
      return res.status(400).json({ status: "error", error: "User and Pet are required" });
    }

    try {
      const newAdoption = await adoptionService.create(user, pet);

      // ✅ Marcar la mascota como adoptada
      await Pet.findByIdAndUpdate(pet, { adopted: true });

      logger.info(`✅ Adopción creada: ${newAdoption._id}`);
      res.status(201).json({ status: "success", adoption: newAdoption });
    } catch (err) {
      logger.error(`❌ Error al crear adopción: ${err.message}`);
      res.status(500).json({ status: "error", error: "Internal server error" });
    }
  }

  /**
   * @swagger
   * /adoptions/{id}:
   *   delete:
   *     summary: Eliminar una adopción
   *     tags: [Adoptions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Adopción eliminada
   *       404:
   *         description: No encontrada
   */
  static async delete(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.warn(`❌ Formato de ID inválido: ${id}`);
      return res.status(400).json({ status: "error", error: "Invalid ID format" });
    }

    try {
      const deleted = await adoptionService.delete(id);
      if (!deleted) {
        logger.warn(`⚠️ Adopción no encontrada para eliminar: ${id}`);
        return res.status(404).json({ status: "error", error: "Adoption not found" });
      }
      logger.info(`🗑️ Adopción eliminada: ${id}`);
      res.status(200).json({ status: "success", message: `Adoption ${id} deleted` });
    } catch (err) {
      logger.error(`❌ Error al eliminar adopción: ${err.message}`);
      res.status(500).json({ status: "error", error: "Internal server error" });
    }
  }
}
