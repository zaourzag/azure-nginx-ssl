/* eslint-disable import/no-extraneous-dependencies */
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/*.*'];

swaggerAutogen(outputFile, endpointsFiles);
