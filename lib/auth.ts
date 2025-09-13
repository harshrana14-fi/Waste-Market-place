import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "./adapters/mongodb-adapter";
import connectDB from "./mongodb";
import { User } from "./models";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(),
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
        
        try {
          await connectDB();
          console.log('Looking for user with email:', credentials.email);
          
          const user = await User.findOne({ email: credentials.email });
          console.log('User found:', user ? 'Yes' : 'No');
          
          if (!user) {
            console.log('User not found:', credentials.email);
            return null;
          }
          
          console.log('User details:', {
            email: user.email,
            company: user.company,
            role: user.role,
            hasPasswordHash: !!user.passwordHash
          });
          
          // For demo users, accept "demo123" as password
          const isDemoUser = ['demo@example.com', 'recycler@example.com', 'corporate@example.com'].includes(user.email);
          
          if (isDemoUser) {
            console.log('Demo user detected, checking password:', credentials.password === 'demo123');
            if (credentials.password !== 'demo123') {
              console.log('Invalid password for demo user:', credentials.email);
              return null;
            }
          } else {
            console.log('Regular user, comparing password hash');
            console.log('Provided password:', credentials.password);
            console.log('Stored hash:', user.passwordHash.substring(0, 20) + '...');
            
            const isValidPassword = await compare(credentials.password, user.passwordHash);
            console.log('Password valid:', isValidPassword);
            
            if (!isValidPassword) {
              console.log('Invalid password for user:', credentials.email);
              return null;
            }
          }
          
          console.log('Authentication successful for:', credentials.email);
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.company,
            role: user.role
          } as any;
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
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