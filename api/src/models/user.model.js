const db = require("../helpers/database");
const { DataTypes } = require("sequelize");

const userRoleEnums = ["admin", "user"];

const User = db.define(
  "users",
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    user_role: {
      type: DataTypes.ENUM(userRoleEnums),
    },
    refresh_token: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = User;
