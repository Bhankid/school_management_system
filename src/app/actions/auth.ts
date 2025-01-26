"use server";

import bcrypt from "bcryptjs";
import User from "../../models/User";

export async function signUpAction({ name, email, password }: { name: string; email: string; password: string }) {
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const user = await User.create({ name, email, password: hashedPassword });
    return { status: 201, user: { id: user.id, name: user.name, email: user.email } };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new Error("User already exists");
      } else {
        throw new Error(`Database error: ${error.message}`);
      }
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function signInAction({ email, password }: { email: string; password: string }) {
  const user = await User.findOne({ where: { email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    return { id: user.id, name: user.name, email: user.email };
  }
  throw new Error("Invalid email or password");
}