const express = require('express');
const app = express();
const routes = require('./routes');
const port = 3000;
var { logger } = require('./utils');  


app.use(function(err, req, res, next) {
  const error = {};
  if (app.get('env') !== 'production') {
    error = err
  }

  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: error
  });
});

app.use('/api', routes);

app.listen(
  port, 
  () => 
  logger.info(`Game Tracker app listening on port ${port}!`)
);
