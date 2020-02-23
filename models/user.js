module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "user", // 테이블 이름
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        userId: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false
          },
      },
      {
        // 테이블 옵션
        timestamps: true,
        underscored: true
      }
    );
  };