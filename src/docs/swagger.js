const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Entrega Backend 3 - API',
      version: '1.0.0',
      description: 'Documentación de la API para el proyecto de Backend 3',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
  },
  apis: [
    './src/routes/users.router.js',
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

