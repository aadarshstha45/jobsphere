import { DataTypes } from "sequelize";
import connection from "../database";
import User from "./user";

const Token = connection.define("token", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  token: {
    type: DataTypes.STRING,
  },
  expiry: {
    type: DataTypes.DATE,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

Token.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Token, { foreignKey: "userId" });

export default Token;
