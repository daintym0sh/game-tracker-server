const { User } = require('../db');
const { logger } = require('../utils');
 
const getUser = async (username) => {
  try {
    return await User.getByUsername(username);
  } catch(e) {
    logger.error(e.message);
  }
};

const createUser = async (user) => {
  try{
    const newUser = await User.create(user);
    if(newUser){
      return newUser
    }else{
      return 0;
    }
  }catch(e){
    logger.error(e.message);
    throw e;
  }
}

module.exports = {
  getUser,
  createUser
};