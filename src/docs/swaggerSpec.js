import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'AdoptMe API',
    version: '1.0.0',
    description: 'API RESTful para gestión de adopciones de mascotas. Documentación en español.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local'
    }
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // Asegura que toma todos los routers
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
