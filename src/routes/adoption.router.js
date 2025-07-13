import { Router } from 'express';
import { AdoptionController } from '../controllers/adoption.controller.js';

/**
 * @swagger
 * tags:
 *   name: Adoptions
 *   description: Gestión de adopciones
 */

const router = Router();

/**
 * @swagger
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Adoption'
 */
router.get('/', AdoptionController.getAll);

/**
 * @swagger
 * /api/adoptions:
 *   post:
 *     summary: Crear una nueva adopción
 *     tags: [Adoptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Adoption'
 *     responses:
 *       201:
 *         description: Adopción creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adoption'
 */
router.post('/', AdoptionController.create);

/**
 * @swagger
 * /api/adoptions/{id}:
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adoption'
 *       404:
 *         description: No encontrada
 */
router.get('/:id', AdoptionController.getById);

/**
 * @swagger
 * /api/adoptions/{id}:
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
router.delete('/:id', AdoptionController.delete);

export default router;
