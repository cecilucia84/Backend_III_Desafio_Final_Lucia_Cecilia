import { body, validationResult } from 'express-validator';
import { UserService } from '../services/users.service.js';
import logger from '../config/logger.js';

const userService = new UserService();

export class UserController {

  static validateCreate = [
    body('email').isEmail().withMessage("Invalid Email format"),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('username').notEmpty().withMessage('Username is required')
  ];

  static async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      logger.info('📥 Usuarios obtenidos correctamente');
      res.status(200).json(users);
    } catch (err) {
      logger.error(`❌ Error al obtener usuarios: ${err.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(id);
      if (!user) {
        logger.warn(`⚠️ Usuario no encontrado: ${id}`);
        return res.status(404).json({ error: 'User not found' });
      }
      logger.info(`📥 Usuario obtenido: ${id}`);
      res.status(200).json(user);
    } catch (err) {
      logger.error(`❌ Error al obtener usuario: ${err.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('⚠️ Validación fallida al crear usuario');
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await userService.registerUser(req.body);
      logger.info(`✅ Usuario creado: ${user.email}`);
      res.status(201).json(user);
    } catch (err) {
      logger.error(`❌ Error al registrar usuario: ${err.message}`);
      res.status(400).json({ error: err.message });
    }
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    try {
      const updatedUser = await userService.updateUser(id, req.body);
      if (!updatedUser) {
        logger.warn(`⚠️ Usuario no encontrado para actualizar: ${id}`);
        return res.status(404).json({ error: 'User not found' });
      }
      logger.info(`♻️ Usuario actualizado: ${id}`);
      res.status(200).json(updatedUser);
    } catch (err) {
      logger.error(`❌ Error al actualizar usuario: ${err.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const deleted = await userService.deleteUser(id);
      if (!deleted) {
        logger.warn(`⚠️ Usuario no encontrado para eliminar: ${id}`);
        return res.status(404).json({ error: 'User not found' });
      }
      logger.info(`🗑️ Usuario eliminado: ${id}`);
      res.status(200).json({ message: `User ${id} deleted` });
    } catch (err) {
      logger.error(`❌ Error al eliminar usuario: ${err.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async login(req, res) {
    try {
      const { token, user } = await userService.loginUser(req.body);
      logger.info(`🔐 Usuario logueado: ${user.email}`);
      res.status(200).json({ token, user });
    } catch (err) {
      logger.warn(`❌ Fallo en login: ${err.message}`);
      res.status(401).json({ error: err.message });
    }
  }

  static profileUser(req, res) {
    logger.info(`👤 Perfil accedido por: ${req.user?.username || 'Desconocido'}`);
    res.status(200).json({
      message: `Bienvenido ${req.user?.username}`,
      user: req.user
    });
  }
}


