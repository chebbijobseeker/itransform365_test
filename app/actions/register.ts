import { RegisterValidationSchema } from "../register/registerValidationSchema";
import { Sequelize, DataTypes } from "sequelize";
import { hash } from "bcrypt";

// Define Sequelize connection
const sequelize = new Sequelize("database", "username", "password", {
  dialect: "postgres", // or your preferred dialect
  host: "localhost", // or your database host
});

// Define the User model
const User = sequelize.define("User", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  confirmPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Synchronize the model with the database
sequelize.sync();

// Export the function to register a user
export default async function registerUser(user: RegisterValidationSchema) {
  try {
    const hashedPassword = await hash(user.password, 10);
    await User.create({
      fullName: user.fullName,
      email: user.email,
      password: hashedPassword,
      confirmPassword: user.confirmPassword,
    });
  } catch (error) {
    console.log({ error });
  }
}
