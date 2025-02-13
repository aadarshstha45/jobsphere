import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";
import connection from "../database";

enum UserType {
  JOBSEEKER = "jobseeker",
  EMPLOYER = "employer",
}
const User = connection.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required",
        },
        notEmpty: {
          msg: "Name is required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email is required",
        },
        notEmpty: {
          msg: "Email is required",
        },
        async isUnique(value: string) {
          const user = await User.findOne({ where: { email: value } });
          if (user) {
            throw new Error("Email already in use.");
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
    },

    userType: {
      type: DataTypes.ENUM(...Object.values(UserType)),
    },
  },
  {
    hooks: {
      beforeCreate: async (user: any) => {
        const salt = await bcrypt.genSalt(10);
        (user as any).password = await bcrypt.hash(
          (user as any).password,
          salt
        );
      },
      async beforeUpdate(user) {
        // Hash the password if it's being updated
        if (user.changed("password")) {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          user.password = hashedPassword;
        }
      },
    },
  }
);

export default User;
