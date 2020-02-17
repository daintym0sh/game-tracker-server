const { authService } = require('../services');
var { logger } = require('../utils');  
 
const getUserById = async (req, res, next) => {
  const { id } = req.query;
  try {
    const user = await authService.getUserById(id);
    res.send(user);
    logger.info(`User found: ${user}`);
    next();
  } catch(e) {
    logger.error(e.message);
    res.sendStatus(500) && next(error);
  }
};
 
module.exports = {
    getUserById
};