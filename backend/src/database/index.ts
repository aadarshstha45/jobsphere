import { config } from "dotenv";
import { Dialect, Sequelize } from "sequelize";
config();

const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const dialect = process.env.DB_CONNECTION as Dialect;
const host = process.env.DB_HOST;
const timezone = process.env.TIMEZONE;
const connection = new Sequelize({
  database,
  username,
  password,
  dialect,
  host,
  port: 5432,
  logging: false,
  timezone,
  dialectOptions: {
    timezone,
  },
});

(async () => {
  try {
    await connection.authenticate();
    console.info("Connection has been established successfully.");
    await connection.sync({ force: false, alter: true });
    console.info("All models were synchronized successfully.");
  } catch (error) {
    console.info(`Unable to connect to the database: ${error}`);
  }
})();
export default connection;
