const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../../swagger.json');
const express = require('express');
const bodyParser = require('body-parser');
const expressip = require('express-ip');

const app = express();
const path = require('path');
app.set('view engine', 'ejs');
app.engine('.html', require('ejs').renderFile);
app.use(expressip().getIpInfoMiddleware);
const root = require('path').join(__dirname, 'views');
app.use(express.static(root));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/api/poke/:id', (req, res),express.static("views" + 'details/'+ req.params.id) );

//app.use('/api/poke/:id', (req, res),express.static("views" + '/'+ req.params.id) );
 

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

require('./routes')(app);

module.exports = app;