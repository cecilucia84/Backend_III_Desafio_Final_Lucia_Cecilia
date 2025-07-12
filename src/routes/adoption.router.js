/**
 * @swagger
 * tags:
 *   name: Adoptions
 *   description: Gestión de adopciones
 *
 * /api/adoptions:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags: [Adoptions]
 *     responses:
 *       200:
 *         description: Lista de adopciones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 adoptions:
 *                   type: array
 *                   items:
 *                     type: object
 *   post:
 *     summary: Crear una adopción
 *     tags: [Adoptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - pet
 *             properties:
 *               user:
 *                 type: string
 *               pet:
 *                 type: string
 *     responses:
 *       201:
 *         description: Adopción creada
 *
 * /api/adoptions/{id}:
 *   get:
 *     summary: Obtener adopción por ID
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
 *   delete:
 *     summary: Eliminar una adopción por ID
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

import { Router } from "express";
import {
  getAdoptions,
  getAdoptionById,
  createAdoption,
  deleteAdoption,
} from "../controllers/adoption.controller.js";

const router = Router();

router.get("/", getAdoptions);
router.get("/:id", getAdoptionById);
router.post("/", createAdoption);
router.delete("/:id", deleteAdoption);

export default router;
