const app = require('./app');
const config = require('./config');

const PORT = process.env.PORT || config.port;

const server = app.listen('8080','0.0.0.0', () => console.log(`[Kubernetes] Probes API is listening on ${process.env.PORT}`));
// eslint-disable-next-line no-unused-expressions
server;
