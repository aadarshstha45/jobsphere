import { DataTypes } from "sequelize";
import connection from "../database";
import User from "./user";

const JobSeeker = connection.define("jobseeker", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  education: {
    type: DataTypes.STRING,
  },
  tags: {
    type: DataTypes.STRING,
  },
  experience: {
    type: DataTypes.STRING,
  },
  biography: {
    type: DataTypes.TEXT,
  },
  website: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  mapUrl: {
    type: DataTypes.STRING,
  },
  profilePicture: {
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
  dateOfBirth: {
    type: DataTypes.DATE,
  },
  gender: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

JobSeeker.belongsTo(User, { foreignKey: "userId" });
User.hasOne(JobSeeker, { foreignKey: "userId" });

export default JobSeeker;
