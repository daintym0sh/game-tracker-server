const { authService } = require('../services');
var { logger } = require('../utils');  
 
const login = async (req, res, next) => {
  const { username, password } = req.query;
  try {
    const token = await authService.authenticateUser(username, password);

    res.send(token);
    next();
  } catch(e) {
    logger.error(e.message);
    res.sendStatus(500) && next(e);
  }
};

const signup = async (req, res, next) => {
  const user = req.body
  try{
    const userId = await authService.createUser(user)
    if(userId > 0){
      res.send(
        {
          id: userId,
          message: `new user created with ${userId}`
        }
      );
    }
  } catch(e) {
    res.status(500).end(e.message);
  }
}
 
module.exports = {
    login,
    signup
};