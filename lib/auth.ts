import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma, mockUsers, checkDatabaseConnection, safeDbOperation } from "./prisma";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log('Authentication attempt for:', credentials?.email);
        
        if (!credentials?.email || !credentials.password) {
          console.log('Missing credentials');
          return null;
        }
        
        // For development, use mock authentication directly
        console.log('Using mock authentication for development');
        const mockUser = mockUsers.find(u => u.email === credentials.email);
        
        if (!mockUser) {
          console.log('Mock user not found:', credentials.email);
          return null;
        }
        
        // Accept "demo123" as password for all demo accounts
        if (credentials.password !== 'demo123') {
          console.log('Invalid password for mock user:', credentials.email);
          return null;
        }
        
        console.log('Mock authentication successful for:', credentials.email);
        return {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.company,
          role: mockUser.role
        } as any;
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).role = token.role;
      (session as any).user.id = token.id;
      return session;
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log('User signed in:', user.email);
    },
    async signOut({ session, token }) {
      console.log('User signed out');
    },
  },
  debug: process.env.NODE_ENV === 'development',
};