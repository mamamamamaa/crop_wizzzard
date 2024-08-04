import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

import prisma from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailOrUsername: {
          label: "Email or Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.emailOrUsername || !credentials?.password) {
          return null;
        }

        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.emailOrUsername },
              { username: credentials.emailOrUsername },
            ],
          },
        });

        if (!existingUser) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          existingUser.password,
        );

        if (!passwordMatch) {
          return null;
        }

        const draws = await prisma.draw.findMany({
          where: { authorId: existingUser.id },
        });

        return {
          id: existingUser.id,
          email: existingUser.email,
          username: existingUser.username,
          createdAt: existingUser.createdAt,
          avatar: existingUser.avatar,
          draws,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log("user");
      if (user && account?.type === "oauth" && user.email) {
        try {
          await prisma.user.upsert({
            where: { email: user.email },
            update: {
              username: user.name || undefined,
              avatar: user.image || undefined,
            },
            create: {
              email: user.email,
              username: user.name || `user${user.id}`,
              avatar: user.image || undefined,
              password: await bcrypt.hash(user.email, 10),
            },
          });

          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }

      return !!user.username || !!account;
    },
    async jwt({ token, user }) {
      return {
        ...token,
        id: user?.id || token?.id,
        username: user?.username || token?.username,
        email: user?.email || token?.email,
        avatar: user?.avatar || token?.avatar,
        createdAt: user?.createdAt || token?.createdAt,
        draws: user?.draws || token?.draws || [],
      };
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          email: token.email,
          avatar: token.avatar,
          createdAt: token.createdAt,
          draws: token.draws || [],
        },
      };
    },
  },
};
