const User = require('../models/user')

const getById = (id) => {
    return User.findByPk(id).then(
        (user) => user.username
    );
};

module.exports = {
    getById
};