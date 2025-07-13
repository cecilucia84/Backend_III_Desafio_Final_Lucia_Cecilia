import { Router } from 'express';
import { PetController } from '../controllers/pets.controller.js';

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Gestión de mascotas
 */

const router = Router();

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Obtener todas las mascotas
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de mascotas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 */
router.get('/', PetController.getAll);

/**
 * @swagger
 * /api/pets/{id}:
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Mascota no encontrada
 */
router.get('/:id', PetController.getById);

/**
 * @swagger
 * /api/pets:
 *   post:
 *     summary: Crear una nueva mascota
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       201:
 *         description: Mascota creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', PetController.create);

/**
 * @swagger
 * /api/pets/{id}:
 *   put:
 *     summary: Actualizar una mascota
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       200:
 *         description: Mascota actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Mascota no encontrada
 */
router.put('/:id', PetController.update);

/**
 * @swagger
 * /api/pets/{id}:
 *   delete:
 *     summary: Eliminar una mascota por ID
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
 *         description: Mascota no encontrada
 */
router.delete('/:id', PetController.delete);

export default router;
