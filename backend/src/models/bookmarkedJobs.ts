import { DataTypes } from "sequelize";
import connection from "../database";
import Job from "./job";
import User from "./user";

const BookMarkedJobs = connection.define("bookmarkedJob", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  jobId: {
    type: DataTypes.INTEGER,
    references: {
      model: Job,
      key: "id",
    },
  },
});

User.belongsToMany(Job, {
  through: BookMarkedJobs,
  foreignKey: "userId",
  otherKey: "jobId",
  as: "bookmarkedJobs",
});
Job.belongsToMany(User, {
  through: BookMarkedJobs,
  foreignKey: "jobId",
  otherKey: "userId",
  as: "bookmarkedBy",
});

// Association between BookMarkedJobs, User, and Job should be set in Sequelize
BookMarkedJobs.belongsTo(User, { foreignKey: "userId", as: "user" });
BookMarkedJobs.belongsTo(Job, { foreignKey: "jobId", as: "job" });

export default BookMarkedJobs;
