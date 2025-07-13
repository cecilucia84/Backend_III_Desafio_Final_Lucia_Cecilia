import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'AdoptMe API',
    version: '1.0.0',
    description: 'API RESTful para gestión de adopciones de mascotas. Documentación completa.',
    termsOfService: 'https://adoptme.com/terminos',
    contact: {
      name: 'Equipo AdoptMe Backend',
      url: 'https://adoptme.com',
      email: 'backend@adoptme.com',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor Local',
    },
    {
      url: 'https://adoptme.com/api',
      description: 'Servidor de Producción',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '64a40f2a2b81c48c8c49d4f1' },
          name: { type: 'string', example: 'Cecilia Lucia' },
          email: { type: 'string', example: 'cecilia@example.com' },
          role: { type: 'string', example: 'user' }
        }
      },
      Pet: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '64a40f2a2b81c48c8c49d4f2' },
          name: { type: 'string', example: 'Luna' },
          species: { type: 'string', example: 'Perro' },
          adopted: { type: 'boolean', example: false }
        }
      },
      Adoption: {
        type: 'object',
        required: ['user', 'pet'],
        properties: {
          user: {
            type: 'string',
            description: 'ID del usuario que adopta',
            example: '64a40f2a2b81c48c8c49d4f1'
          },
          pet: {
            type: 'string',
            description: 'ID de la mascota adoptada',
            example: '64a40f2a2b81c48c8c49d4f2'
          }
        }
      },
      AdoptionFull: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '64a40f2a2b81c48c8c49d4f3' },
          user: { $ref: '#/components/schemas/User' },
          pet: { $ref: '#/components/schemas/Pet' },
          date: { type: 'string', format: 'date-time', example: '2025-07-13T10:00:00Z' }
        }
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
