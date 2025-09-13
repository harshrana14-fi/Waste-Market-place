import { Adapter, AdapterUser, AdapterAccount, AdapterSession, VerificationToken as AdapterVerificationToken } from "next-auth/adapters";
import { MongoClient } from "mongodb";
import connectDB from "../mongodb";
import { User, Account, Session, VerificationToken } from "../models";
import { Types } from "mongoose";

export function MongoDBAdapter(): Adapter {
  return {
    async createUser(user: Omit<AdapterUser, "id">): Promise<AdapterUser> {
      await connectDB();
      try {
        const newUser = new User({
          email: user.email,
          passwordHash: '', // Will be set during registration
          company: user.name || '',
          role: 'producer', // default role
          createdAt: new Date(),
        });
        const savedUser = await newUser.save();
        return {
          id: savedUser._id.toString(),
          email: savedUser.email || '',
          name: savedUser.company || '',
        } as any;
      } catch (error) {
        console.error('Error creating user:', error);
        throw error;
      }
    },

    async getUser(id: string): Promise<AdapterUser | null> {
      await connectDB();
      try {
        const user = await User.findById(id);
        if (!user) return null;
        return {
          id: user._id.toString(),
          email: user.email || '',
          name: user.company || '',
        } as any;
      } catch (error) {
        console.error('Error getting user:', error);
        return null;
      }
    },

    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      await connectDB();
      try {
        const user = await User.findOne({ email });
        if (!user) return null;
        return {
          id: user._id.toString(),
          email: user.email || '',
          name: user.company || '',
        } as any;
      } catch (error) {
        console.error('Error getting user by email:', error);
        return null;
      }
    },

    async getUserByAccount({ providerAccountId, provider }: { providerAccountId: string, provider: string }): Promise<AdapterUser | null> {
      await connectDB();
      try {
        const account = await Account.findOne({ provider, providerAccountId }).populate('userId');
        if (!account?.userId) return null;
        
        const user = account.userId as any;
        return {
          id: user._id.toString(),
          email: user.email || '',
          name: user.company || '',
        } as any;
      } catch (error) {
        console.error('Error getting user by account:', error);
        return null;
      }
    },

    async updateUser(user: Partial<AdapterUser> & { id: string }): Promise<AdapterUser> {
      await connectDB();
      try {
        const updatedUser = await User.findByIdAndUpdate(
          user.id,
          {
            email: user.email,
            company: user.name,
          },
          { new: true }
        );
        if (!updatedUser) throw new Error("User not found");
        
        return {
          id: updatedUser._id.toString(),
          email: updatedUser.email || '',
          name: updatedUser.company || '',
        } as any;
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
    },

    async deleteUser(userId) {
      await connectDB();
      await User.findByIdAndDelete(userId);
      await Account.deleteMany({ userId });
      await Session.deleteMany({ userId });
    },

    async linkAccount(account: any) {
      await connectDB();
      const newAccount = new Account({
        userId: account.userId,
        type: account.type,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        refresh_token: account.refresh_token,
        access_token: account.access_token,
        expires_at: account.expires_at,
        token_type: account.token_type,
        scope: account.scope,
        id_token: account.id_token,
        session_state: account.session_state,
      });
      await newAccount.save();
      return account;
    },

    async unlinkAccount({ providerAccountId, provider }: any) {
      await connectDB();
      await Account.deleteOne({ provider, providerAccountId });
    },

    async createSession(session: { sessionToken: string; userId: string; expires: Date }): Promise<AdapterSession> {
      await connectDB();
      try {
        const newSession = new Session({
          sessionToken: session.sessionToken,
          userId: new Types.ObjectId(session.userId),
          expires: session.expires,
        });
        await newSession.save();
        return {
          sessionToken: newSession.sessionToken,
          userId: newSession.userId.toString(),
          expires: newSession.expires,
        };
      } catch (error) {
        console.error('Error creating session:', error);
        throw error;
      }
    },

    async getSessionAndUser(sessionToken: string): Promise<{ session: AdapterSession; user: AdapterUser } | null> {
      await connectDB();
      try {
        const session = await Session.findOne({ sessionToken }).populate('userId');
        if (!session?.userId) return null;
        
        const user = session.userId as any;
        return {
          session: {
            sessionToken: session.sessionToken,
            userId: session.userId.toString(),
            expires: session.expires,
          },
          user: {
            id: user._id.toString(),
            email: user.email || '',
            name: user.company || '',
          } as any,
        };
      } catch (error) {
        console.error('Error getting session and user:', error);
        return null;
      }
    },

    async updateSession(session: Partial<AdapterSession> & { sessionToken: string }): Promise<AdapterSession | null> {
      await connectDB();
      try {
        const updatedSession = await Session.findOneAndUpdate(
          { sessionToken: session.sessionToken },
          { $set: { expires: session.expires } },
          { new: true }
        );
        if (!updatedSession) return null;
        
        return {
          sessionToken: updatedSession.sessionToken,
          userId: updatedSession.userId.toString(),
          expires: updatedSession.expires,
        };
      } catch (error) {
        console.error('Error updating session:', error);
        return null;
      }
    },

    async deleteSession(sessionToken: string): Promise<void> {
      await connectDB();
      try {
        await Session.deleteOne({ sessionToken });
      } catch (error) {
        console.error('Error deleting session:', error);
        throw error;
      }
    },

    async createVerificationToken(token: AdapterVerificationToken): Promise<AdapterVerificationToken> {
      await connectDB();
      try {
        const newToken = new VerificationToken({
          identifier: token.identifier,
          token: token.token,
          expires: token.expires,
        });
        await newToken.save();
        return {
          identifier: newToken.identifier,
          token: newToken.token,
          expires: newToken.expires,
        };
      } catch (error) {
        console.error('Error creating verification token:', error);
        throw error;
      }
    },

    async useVerificationToken(params: { identifier: string; token: string }): Promise<AdapterVerificationToken | null> {
      await connectDB();
      try {
        const verificationToken = await VerificationToken.findOneAndDelete({
          identifier: params.identifier,
          token: params.token,
        });
        if (!verificationToken) return null;
        
        return {
          identifier: verificationToken.identifier,
          token: verificationToken.token,
          expires: verificationToken.expires,
        };
      } catch (error) {
        console.error('Error using verification token:', error);
        return null;
      }
    },
  };
}
