import { Adapter } from "next-auth/adapters";
import { MongoClient } from "mongodb";
import connectDB from "../mongodb";
import { User, Account, Session, VerificationToken } from "../models";

export function MongoDBAdapter(): Adapter {
  return {
    async createUser(user) {
      await connectDB();
      const newUser = new User({
        email: user.email,
        passwordHash: user.passwordHash || '',
        company: user.name || '',
        role: 'producer', // default role
        createdAt: new Date(),
      });
      const savedUser = await newUser.save();
      return {
        id: savedUser._id.toString(),
        email: savedUser.email,
        name: savedUser.company,
        role: savedUser.role,
        emailVerified: null,
        image: null,
      };
    },

    async getUser(id) {
      await connectDB();
      const user = await User.findById(id);
      if (!user) return null;
      return {
        id: user._id.toString(),
        email: user.email,
        name: user.company,
        role: user.role,
        emailVerified: null,
        image: null,
      };
    },

    async getUserByEmail(email) {
      await connectDB();
      const user = await User.findOne({ email });
      if (!user) return null;
      return {
        id: user._id.toString(),
        email: user.email,
        name: user.company,
        role: user.role,
        emailVerified: null,
        image: null,
      };
    },

    async getUserByAccount({ providerAccountId, provider }) {
      await connectDB();
      const account = await Account.findOne({ provider, providerAccountId }).populate('userId');
      if (!account || !account.userId) return null;
      const user = account.userId as any;
      return {
        id: user._id.toString(),
        email: user.email,
        name: user.company,
        role: user.role,
        emailVerified: null,
        image: null,
      };
    },

    async updateUser(user) {
      await connectDB();
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
        email: updatedUser.email,
        name: updatedUser.company,
        role: updatedUser.role,
        emailVerified: null,
        image: null,
      };
    },

    async deleteUser(userId) {
      await connectDB();
      await User.findByIdAndDelete(userId);
      await Account.deleteMany({ userId });
      await Session.deleteMany({ userId });
    },

    async linkAccount(account) {
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

    async unlinkAccount({ providerAccountId, provider }) {
      await connectDB();
      await Account.deleteOne({ provider, providerAccountId });
    },

    async createSession({ sessionToken, userId, expires }) {
      await connectDB();
      const newSession = new Session({
        sessionToken,
        userId,
        expires,
      });
      await newSession.save();
      return { sessionToken, userId, expires };
    },

    async getSessionAndUser(sessionToken) {
      await connectDB();
      const session = await Session.findOne({ sessionToken }).populate('userId');
      if (!session || !session.userId) return null;
      const user = session.userId as any;
      return {
        session: {
          sessionToken: session.sessionToken,
          userId: session.userId.toString(),
          expires: session.expires,
        },
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.company,
          role: user.role,
          emailVerified: null,
          image: null,
        },
      };
    },

    async updateSession({ sessionToken, ...data }) {
      await connectDB();
      const session = await Session.findOneAndUpdate(
        { sessionToken },
        data,
        { new: true }
      );
      if (!session) return null;
      return {
        sessionToken: session.sessionToken,
        userId: session.userId.toString(),
        expires: session.expires,
      };
    },

    async deleteSession(sessionToken) {
      await connectDB();
      await Session.deleteOne({ sessionToken });
    },

    async createVerificationToken({ identifier, expires, token }) {
      await connectDB();
      const newToken = new VerificationToken({
        identifier,
        token,
        expires,
      });
      await newToken.save();
      return { identifier, token, expires };
    },

    async useVerificationToken({ identifier, token }) {
      await connectDB();
      const verificationToken = await VerificationToken.findOneAndDelete({
        identifier,
        token,
      });
      if (!verificationToken) return null;
      return {
        identifier: verificationToken.identifier,
        token: verificationToken.token,
        expires: verificationToken.expires,
      };
    },
  };
}
