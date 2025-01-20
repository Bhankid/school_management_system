"use server";

import bcrypt from "bcryptjs";
import User from "../../models/User";

export async function signUpAction({ name, email, password }: { name: string; email: string; password: string }) {
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const user = await User.create({ name, email, password: hashedPassword });
    return { status: 201, user };
  } catch {
    throw new Error("User already exists or database error");
  }
}

export async function signInAction({ email, password }: { email: string; password: string }) {
  const user = await User.findOne({ where: { email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    return { id: user.id, name: user.name, email: user.email };
  }
  throw new Error("Invalid email or password");
}
