import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./prisma"; // We will add prisma client later

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "correo@ejemplo.com" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        let user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          // MODO PRUEBA: Si el usuario no existe, lo creamos automáticamente
          const passwordHash = await bcrypt.hash(credentials.password, 10);
          user = await prisma.user.create({
            data: {
              name: "Usuario Demo",
              email: credentials.email,
              passwordHash,
            }
          });
          return { id: user.id, name: user.name, email: user.email };
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }
    })
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
      if (session.user) {
        (session.user as any).id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/login",
  },
};
