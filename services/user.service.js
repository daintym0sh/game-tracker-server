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
  getUser,
  createUser
};