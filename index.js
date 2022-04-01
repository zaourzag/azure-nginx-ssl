const app = require('./src/server/app');
const config = require('./config');

const PORT = '8080'

const server = app.listen(PORT,'0.0.0.0', () => console.log(`[Kubernetes] Probes API is listening on ${process.env.PORT}`));
// eslint-disable-next-line no-unused-expressions
server;
