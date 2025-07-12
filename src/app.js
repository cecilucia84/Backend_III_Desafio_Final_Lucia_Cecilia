import logger from './config/logger.js';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import adoptionRouter from './routes/adoption.router.js';
import userRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swaggerSpec.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Logger de inicio
logger.info('🚀 Middleware inicializado');

// ⚡️ Swagger: Montar en /docs para evitar /api/api en rutas
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas principales
app.use('/api/adoptions', adoptionRouter);
app.use('/api/users', userRouter);
app.use('/api/pets', petsRouter);

// --- Conexión a MongoDB ---
mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_NAME
}).then(() => {
  console.log('✅ Conectado correctamente a MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor arriba en http://localhost:${PORT}`);
    logger.info(`🚀 Servidor arriba en http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Error conectando a MongoDB:', err);
  logger.error(`❌ Error conectando a MongoDB: ${err.message}`);
});

// Log de finalización (solo para marcar que el setup llegó al final)
logger.info('✅ App configurada correctamente');

export default app;
