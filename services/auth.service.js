const { User } = require('../db');
const { logger } = require('../utils');
 
const authenticateUser = async (username, password) => {
  try {
    const user = await User.getByUsername(username);
    const validUser = await user.validatePassword(password)
    return validUser;
  } catch(e) {
    logger.error(e.message);
  }
};

const createUser = async (user) => {
  try{
    const newUserId = await User.create(user);
    if(newUserId){
      return newUserId
    }else{
      return 0;
    }
  }catch(e){
    logger.error(e.message);
    throw e;
  }
}

module.exports = {
  authenticateUser,
  createUser
};