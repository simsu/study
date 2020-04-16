'use strict';
module.exports = (sequelize, DataTypes) => {
  const board = sequelize.define('board', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title:
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: 
    {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: 
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    imgRealName:
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    imgFakeName:
    {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  board.associate = function(models) {
    // associations can be defined here
  };
  return board;
};