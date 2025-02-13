import { DataTypes, Optional } from "sequelize";
import connection from "../database";
import * as JOBENUMS from "../utils/enums/jobs";
import { JobAttributes } from "../utils/enums/jobs";
import Category from "./category";
import Company from "./company";

export interface JobInterface {
  id: number;
  title: string;
  tags: string[];
  salaryType: JOBENUMS.SalaryType;
  minSalary: number;
  maxSalary: number;
  education: JOBENUMS.EducationLevel;
  experience: JOBENUMS.ExperienceLevel;
  jobType: JOBENUMS.JobType;
  vacancies: number;
  expiryDate: Date;
  jobLevel: JOBENUMS.JobLevel;
  description: string;
  responsibilities: string;
  isActive: boolean;
  categoryId: number;
  postedBy: number;
}

export type JobCreationAttributes = Optional<JobAttributes, "id">;

const Job = connection.define("job", {
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
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  salaryType: {
    type: DataTypes.ENUM(...Object.values(JOBENUMS.SalaryType)),
    allowNull: false,
    validate: {
      notNull: {
        msg: "Salary Type is required",
      },
      notEmpty: {
        msg: "Salary Type cannot be empty",
      },
    },
  },

  minSalary: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      customValidator(value: number) {
        if (
          this.salaryType === "paid" &&
          (value === null || value === undefined)
        ) {
          throw new Error("Minimum salary is required.");
        }
        if (value !== null && value !== undefined && value < 0) {
          throw new Error("Minimum salary must be a positive.");
        }
      },
    },
  },
  maxSalary: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      customValidator(value: number) {
        if (
          this.salaryType === "paid" &&
          (value === null || value === undefined)
        ) {
          throw new Error("Minimum salary is required.");
        }
        if (value !== null && value !== undefined && value < 0) {
          throw new Error("Maximum salary must be a positive.");
        }
      },
    },
  },
  education: {
    type: DataTypes.ENUM(...Object.values(JOBENUMS.EducationLevel)),
  },
  experience: {
    type: DataTypes.ENUM(...Object.values(JOBENUMS.ExperienceLevel)),
  },
  jobType: {
    type: DataTypes.ENUM(...Object.values(JOBENUMS.JobType)),
  },

  vacancies: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Vacancies is required",
      },
      notEmpty: {
        msg: "Vacancies cannot be empty",
      },
    },
  },
  expiryDate: {
    type: DataTypes.DATE,
    validate: {
      isAfter: {
        args: new Date().toISOString(),
        msg: "Date must be after today",
      },
    },
  },
  jobLevel: {
    type: DataTypes.ENUM(...Object.values(JOBENUMS.JobLevel)),
  },
  description: {
    type: DataTypes.TEXT,
  },
  responsibilities: {
    type: DataTypes.TEXT,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: "id",
    },
  },
  postedBy: {
    type: DataTypes.INTEGER,
    references: {
      model: Company,
      key: "id",
    },
  },
});

Job.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(Job, { foreignKey: "categoryId" });

Job.belongsTo(Company, { foreignKey: "postedBy" });
Company.hasMany(Job, { foreignKey: "postedBy" });

export default Job;
