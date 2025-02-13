import { DataTypes } from "sequelize";
import connection from "../database";
import Application from "./application";

const ApplicationMessage = connection.define("applicationMessage", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "shortlisted", "accepted", "rejected"),
    defaultValue: "pending",
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Message is required",
      },
      notEmpty: {
        msg: "Message cannot be empty",
      },
    },
  },
  applicationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Application,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

ApplicationMessage.belongsTo(Application, {
  foreignKey: "applicationId",
  as: "application",
});
Application.hasMany(ApplicationMessage, {
  foreignKey: "applicationId",
  as: "messages",
});

export default ApplicationMessage;
