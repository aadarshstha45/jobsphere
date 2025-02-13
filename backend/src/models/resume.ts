import { DataTypes } from "sequelize";
import connection from "../database";
import JobSeeker from "./jobseeker";

const Resume = connection.define("resume", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Title is required",
      },
      notEmpty: {
        msg: "Title cannot be empty",
      },
    },
  },
  resume: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Resume must be uploaded.",
      },
    },
  },
  jobseekerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Job seeker could not be found.",
      },
    },
    references: {
      model: JobSeeker,
      key: "id",
    },
  },
});

JobSeeker.hasMany(Resume, {
  foreignKey: "jobseekerId",
});

Resume.belongsTo(JobSeeker, {
  foreignKey: "jobseekerId",
});

export default Resume;
