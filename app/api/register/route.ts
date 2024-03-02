import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { Sequelize, DataTypes } from "sequelize";

// Sequelize configuration
const sequelize = new Sequelize("database", "username", "password", {
  dialect: "postgres",
  host: "localhost",
});

// Define the User model
const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export async function POST(request: {
  json: () =>
    | PromiseLike<{ email: any; password: any }>
    | { email: any; password: any };
}) {
  try {
    const { email, password } = await request.json();
    // validate email and password
    console.log({ email, password });

    const hashedPassword = await hash(password, 10);

    await User.create({ email, password: hashedPassword });
  } catch (error) {
    console.log({ error });
  }

  return NextResponse.json({ message: "success" });
}
