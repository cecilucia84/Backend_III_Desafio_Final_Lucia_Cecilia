import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'express-async-errors';

import userRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionRouter from './routes/adoption.router.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swaggerSpec.js';

import { connectDB } from './config/db.js';

dotenv.config();

await connectDB();

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Rutas de la API
app.use('/api/users', userRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionRouter);

// Documentación Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/', (req, res) => {
  res.send('API AdoptMe funcionando!');
});

export default app;
