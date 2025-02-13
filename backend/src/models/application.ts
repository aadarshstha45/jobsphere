import { DataTypes } from "sequelize";
import connection from "../database";
import Company from "./company";
import Job from "./job";
import JobSeeker from "./jobseeker";
import Resume from "./resume";

const Application = connection.define("application", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Cover letter is required",
      },
      notEmpty: {
        msg: "Cover letter cannot be empty",
      },
    },
  },

  meetingTime: {
    type: DataTypes.DATE,
  },
  meetingType: {
    type: DataTypes.ENUM("online", "offline"),
    allowNull: true,
  },
  meetingLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  status: {
    type: DataTypes.ENUM("pending", "shortlisted", "accepted", "rejected"),
    defaultValue: "pending",
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Company,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Job,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  jobseekerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: JobSeeker,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  resumeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Resume is required",
      },
      notEmpty: {
        msg: "Resume cannot be empty",
      },
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    references: {
      model: Resume,
      key: "id",
    },
  },
});

Application.belongsTo(Job, { foreignKey: "jobId" });
Application.belongsTo(Resume, { foreignKey: "resumeId" });
Application.belongsTo(Company, { foreignKey: "companyId" });
Application.belongsTo(JobSeeker, { foreignKey: "jobseekerId" });

Job.hasMany(Application, { foreignKey: "jobId" });
Company.hasMany(Application, { foreignKey: "companyId" });
Resume.hasMany(Application, { foreignKey: "resumeId" });
JobSeeker.hasMany(Application, { foreignKey: "jobseekerId" });
export default Application;
