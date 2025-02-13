import { DataTypes, Model, Optional } from "sequelize";
import connection from "../database";
import Category from "./category";
import Job, { JobInterface } from "./job";

interface UserBehaviorAttributes {
  id: number;
  userId: number;
  jobId: number;
  categoryId?: number;
  action: string; // Bookmark, view, or application
  job?: JobInterface;
}

interface UserBehaviorCreationAttributes
  extends Optional<UserBehaviorAttributes, "id"> {}

class UserBehavior
  extends Model<UserBehaviorAttributes, UserBehaviorCreationAttributes>
  implements UserBehaviorAttributes
{
  public id!: number;
  public userId!: number;
  public jobId!: number;
  public categoryId?: number;
  public action!: string;
  public job?: JobInterface;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserBehavior.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    jobId: {
      type: DataTypes.INTEGER,
      references: {
        model: Job,
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Category,
        key: "id",
      },
    },
    action: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connection,
    modelName: "userBehavior",
  }
);

UserBehavior.belongsTo(Job, { foreignKey: "jobId" });
Job.hasMany(UserBehavior, { foreignKey: "jobId" });

UserBehavior.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(UserBehavior, { foreignKey: "categoryId" });

export default UserBehavior;
