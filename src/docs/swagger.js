const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const port = process.env.PORT || 8080;
const publicBaseUrl =
  process.env.RENDER_EXTERNAL_URL ||
  process.env.PUBLIC_BASE_URL ||
  `http://localhost:${port}`;

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
        url: publicBaseUrl,
      },
    ],
  },
  apis: [
    path.join(__dirname, '../routes/*.router.js'),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

