import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const user = await User.findOne({ where: { email: credentials.email } });

        if (user) {
          throw new Error("User   with this email already exists");
        }

        const hashedPassword = bcrypt.hashSync(credentials.password, 10);

        try {
          const newUser = await User.create({
            name: credentials.name,
            email: credentials.email,
            password: hashedPassword,
          });

          return {
            id: newUser.id.toString(),
            email: newUser.email,
            name: newUser.name,
          };
        } catch (error) {
          throw new Error(`Failed to create user: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.id = token.id as string;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },
});