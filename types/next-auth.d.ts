import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    email: string;
    avatar: string;
    createdAt: string;
    draws: Draw[];
  }

  interface Draw {
    id: string;
    title: string;
    draw: JSON;
    createdAt: string;
  }

  interface Session {
    user: User;
    token: User;
  }
}
