const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const port = 3000;
var { logger } = require('./utils');  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(
  port, 
  () => 
  logger.info(`Game Tracker app listening on port ${port}!`)
);
