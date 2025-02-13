import { DataTypes } from "sequelize";
import connection from "../database";
import Industry from "./industry";
import User from "./user";

const Company = connection.define("company", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },
  aboutUs: {
    type: DataTypes.TEXT,
  },
  tags: {
    type: DataTypes.STRING,
  },
  industryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Industry,
      key: "id",
    },
  },
  yearOfEstablishment: {
    type: DataTypes.DATEONLY,
  },
  teamSize: {
    type: DataTypes.STRING,
  },
  vision: {
    type: DataTypes.TEXT,
  },
  phone: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
  mapUrl: {
    type: DataTypes.STRING,
  },
  website: {
    type: DataTypes.STRING,
  },
  logo: {
    type: DataTypes.STRING,
  },
  facebook: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  instagram: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  twitter: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  youtube: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkedin: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

Industry.hasMany(Company, { foreignKey: "industryId", as: "industry" });
Company.belongsTo(Industry, { foreignKey: "industryId", as: "industry" });

Company.belongsTo(User, { foreignKey: "userId" });
User.hasOne(Company, { foreignKey: "userId" });

export default Company;
