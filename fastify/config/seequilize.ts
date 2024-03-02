import { Sequelize } from "sequelize";

// Sequelize configuration
const sequelize = new Sequelize(
  process.env.POSTGRES_URL as string,
  process.env.POSTGRES_URL as string,
  process.env.POSTGRES_URL as string,
  {
    dialect: "postgres",
    host: "localhost",
  }
);

export { sequelize };
