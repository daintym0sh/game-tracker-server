const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const { routes, secureRoutes } = require('./routes');
var { logger } = require('./utils');  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);
app.use('/api', passport.authenticate('jwt', { session : false }), secureRoutes);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error : err });
});

if(process.env.NODE_ENV === 'production'){
  console.log('client url: ' + process.env.CLIENT)
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

const port = process.env.PORT || 3000;
logger.info(`Port: ${port}`);
app.listen(
  port, 
  () => 
  logger.info(`Game Tracker app listening on port ${port}!`)
);
