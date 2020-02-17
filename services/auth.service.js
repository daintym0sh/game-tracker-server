const { user } = require('../db');
 
const getUserById = async (id) => {
  try {
    return await user.getById(id)
  } catch(e) {
    throw new Error(e.message)
  }
};

module.exports = {
  getUserById
};