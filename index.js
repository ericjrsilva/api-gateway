const express = require('express');
const bodyParser = require('body-parser');
const cluster = require('cluster');
const routes = require('./routes/routes');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

    
    // if (cluster.isMaster) {
      
      //   const cpuLen = require('os').cpus().length;
      
      //   for (let i = 0; i < cpuLen; i++) {
        //       cluster.fork();
        //   }
        
        
        // } else {
          
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use('/', routes);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


  // app.listen(3000, () => console.log('Worker %d running!', cluster.worker.id));
  app.listen(3000, () => console.log('Running on 3000'));

// }
