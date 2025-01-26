import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const user = await User.findOne({ where: { email: credentials.email } });

        if (user) {
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            throw new Error("Invalid password");
          }

          return {
            id: user.id.toString(),
            name: user.name || "",
            email: user.email || "",
          };
        }

        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        try {
          const newUser = await User.create({
            name: credentials.name,
            email: credentials.email,
            password: hashedPassword,
          });

          return {
            id: newUser.id.toString(),
            name: newUser.name || "",
            email: newUser.email || "",
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Failed to create user: ${error.message}`);
          } else {
            throw new Error("An unexpected error occurred");
          }
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name || "";
        token.email = user.email || "";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          if (typeof token.id === "string") {
            session.user.id = token.id;
          } else {
            throw new Error("Invalid token.id type");
          }
          session.user.name = token.name || "";
          session.user.email = token.email || "";
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/signout",
    error: "/error",
  },
  debug: process.env.NODE_ENV !== "production",
});