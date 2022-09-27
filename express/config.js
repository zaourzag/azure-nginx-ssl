require('dotenv').config();

const config = {
  port: process.env.PORT,
  host: process.env.HOST,
  chartgenUrl: "http://charts.zakariao.nl",
};

module.exports = config;
