const express = require('express');
const bodyParser = require('body-parser');

if(!process.env.HEROKU) {
  require('dotenv').config();
}

const config = require('./config/config');
const routes = require('./routes/routes');

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

          
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(config.port, () => console.log('Running on ' + config.port));
