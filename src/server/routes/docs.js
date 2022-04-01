const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger.json');

module.exports = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
};
