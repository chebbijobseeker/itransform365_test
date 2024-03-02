import { Sequelize } from "sequelize";

// Sequelize configuration
const sequelize = new Sequelize("database", "username", "password", {
  dialect: "postgres",
  host: "localhost",
});

export { sequelize };
