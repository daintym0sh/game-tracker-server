const { sequelize, DataTypes } = require('../utils/sequelize')
const bcrypt = require('bcryptjs');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

User.beforeCreate(async (user, options) => {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
});

User.prototype.validatePassword = function(inputPassword) {
    return bcrypt.compare(inputPassword, this.password)
}

const getByUsername = (username) => {
    return User.findOne({
        where: {
            username: username
        }
    });
}

const create = async (user) => {
    return await User.create(user);
}

module.exports = {
    getByUsername,
    create,
};