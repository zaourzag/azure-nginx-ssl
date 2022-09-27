/* eslint-disable import/no-extraneous-dependencies */
const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
      title: 'zakaria api',
      description: 'the api of doom!!!',
    },
    servers: [
      {
        url: 'api.zakariao.nl',
        description: 'Production api',        
      },
      {
        url: 'jel.zakariao.nl',
        description: 'second api endpoint'
      }
    ],
    host:  'api.zakariao.nl',
    schemes: ['https'],
  };
  
const outputFile = './src/server/swaggers.json';
const endpointsFiles = ['./src/server/routes/*', './src/server/app.js'];

swaggerAutogen(outputFile , endpointsFiles, doc);
