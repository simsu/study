'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    userId: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};