"use server";

import bcrypt from "bcryptjs";
import User from "../../models/User";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: number;
}

export async function signUpAction({ name, email, password }: { name: string; email: string; password: string }) {
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const user = await User.create({ name, email, password: hashedPassword });
    return { status: 201, user: { id: user.id, name: user.name, email: user.email } };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new Error("User  already exists");
      } else {
        throw new Error(`Database error: ${error.message}`);
      }
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function signInAction({ email, password }: { email: string; password: string }) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ where: { email }, raw: true });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.password) {
    throw new Error("User   password is not set");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("Invalid email or password");
  }

  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY environment variable is not set");
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });

  return { token, id: user.id, name: user.name, email: user.email };
}

export async function getUserDetails({ token }: { token: string }) {
  if (!token) {
    throw new Error("Token is required");
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as DecodedToken;
  const user = await User.findOne({ where: { id: decoded.id }, raw: true, attributes: ['id', 'name', 'email', 'password'] });

  if (!user) {
    throw new Error("User   not found");
  }

  // Return the password in plain text
  return { id: user.id, name: user.name, email: user.email, password: user.password };
}