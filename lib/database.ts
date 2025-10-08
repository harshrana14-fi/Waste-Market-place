import connectDB from './mongodb';
import mongoose from 'mongoose';
import { User, Listing, Transaction, GreenCredit } from './models';
import { hash } from 'bcryptjs';

// Mock data for development when database is unavailable
export const mockUsers = [
  {
    id: 'mock-user-1',
    email: 'demo@example.com',
    passwordHash: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJByJpD6cE5v2Q2vK8a', // password: "demo123"
    company: 'Demo Company',
    role: 'producer',
    createdAt: new Date(),
  },
  {
    id: 'mock-user-2', 
    email: 'recycler@example.com',
    passwordHash: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJByJpD6cE5v2Q2vK8a', // password: "demo123"
    company: 'EcoRecycle Ltd',
    role: 'recycler',
    createdAt: new Date(),
  },
  {
    id: 'mock-user-3',
    email: 'corporate@example.com', 
    passwordHash: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJByJpD6cE5v2Q2vK8a', // password: "demo123"
    company: 'GlobalCorp',
    role: 'corporate',
    createdAt: new Date(),
  }
];

// Helper function to check database connectivity
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await connectDB();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Safe database operations with fallback
export async function safeDbOperation<T>(
  operation: () => Promise<T>,
  fallback?: T
): Promise<T | undefined> {
  try {
    return await operation();
  } catch (error) {
    console.error('Database operation failed:', error);
    if (process.env.NODE_ENV === 'development' && fallback !== undefined) {
      console.log('Using fallback data for development');
      return fallback;
    }
    throw error;
  }
}

// Database operations
export const db = {
  // User operations
  async createUser(userData: {
    email: string;
    password: string;
    company: string;
    role: 'producer' | 'recycler' | 'corporate';
  }) {
    await connectDB();
    const passwordHash = await hash(userData.password, 10);
    const user = new User({
      email: userData.email,
      passwordHash,
      company: userData.company,
      role: userData.role,
      createdAt: new Date(),
    });
    return await user.save();
  },

  async findUserByEmail(email: string) {
    try {
      await connectDB();
      const user = await User.findOne({ email: email.toLowerCase() });
      return user;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new Error('Database error while checking user existence');
    }
  },

  async findUserById(id: string) {
    try {
      await connectDB();
 
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid user ID format');
      }
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error: any) {
      console.error('Error finding user by id:', error);
      // Return more specific error messages
      if (error.message === 'Invalid user ID format') {
        throw new Error('Invalid user ID format');
      }
      if (error.message === 'User not found') {
        throw new Error('User not found');
      }
      throw new Error('Database error: Unable to find user');
    }
  },

  // Listing operations
  async createListing(listingData: {
    type: string;
    volume: string;
    location: string;
    frequency?: string;
    description?: string;
    price?: string;
    contactEmail?: string;
    contactPhone?: string;
    images?: string[];
    ownerId: string;
  }) {
    await connectDB();
    const listing = new Listing({
      type: listingData.type,
      volume: listingData.volume,
      location: listingData.location,
      ...(listingData.frequency ? { frequency: listingData.frequency } : {}),
      description: listingData.description,
      price: listingData.price,
      contactEmail: listingData.contactEmail,
      contactPhone: listingData.contactPhone,
      images: listingData.images,
      owner: listingData.ownerId,
      createdAt: new Date(),
    });
    return await listing.save();
  },

  async findListings(filters: any = {}) {
    await connectDB();
    return await Listing.find(filters).populate('owner');
  },

  async findListingsByOwner(ownerId: string) {
    await connectDB();
    return await Listing.find({ owner: ownerId }).populate('owner').sort({ createdAt: -1 });
  },

  async findListingById(id: string) {
    await connectDB();
    return await Listing.findById(id).populate('owner');
  },

  async updateListing(id: string, updates: {
    type?: string;
    volume?: string;
    location?: string;
    frequency?: string;
    description?: string;
    price?: string;
    contactEmail?: string;
    contactPhone?: string;
    images?: string[];
  }) {
    await connectDB();
    const payload: any = { ...updates };
    if (payload.frequency === '' || payload.frequency === undefined) {
      delete payload.frequency;
    }
    return await Listing.findByIdAndUpdate(id, { $set: payload }, { new: true }).populate('owner');
  },

  async deleteListing(id: string) {
    await connectDB();
    return await Listing.findByIdAndDelete(id);
  },

  // Transaction operations
  async createTransaction(transactionData: {
    listingId: string;
    recyclerId: string;
    producerId: string;
    volumeTons: number;
  }) {
    await connectDB();
    const transaction = new Transaction({
      listing: transactionData.listingId,
      recycler: transactionData.recyclerId,
      producer: transactionData.producerId,
      volumeTons: transactionData.volumeTons,
      createdAt: new Date(),
    });
    return await transaction.save();
  },

  async findTransactions(filters: any = {}) {
    await connectDB();
    return await Transaction.find(filters)
      .populate('listing')
      .populate('recycler')
      .populate('producer');
  },

  // Green Credit operations
  async createGreenCredit(creditData: {
    transactionId: string;
    amount: number;
    metadata?: any;
  }) {
    await connectDB();
    const credit = new GreenCredit({
      transaction: creditData.transactionId,
      amount: creditData.amount,
      metadata: creditData.metadata,
      createdAt: new Date(),
    });
    return await credit.save();
  },

  async findGreenCredits(filters: any = {}) {
    await connectDB();
    return await GreenCredit.find(filters).populate('transaction');
  },

  // User statistics
  async getUserStats(userId: string) {
    await connectDB();
    
    const [listings, transactions, greenCredits] = await Promise.all([
      Listing.find({ owner: userId }),
      Transaction.find({ producer: userId }).populate('listing'),
      GreenCredit.find({}).populate('transaction')
    ]);

    const totalRevenue = transactions.reduce((sum, t) => {
      // Mock revenue calculation - in real app, this would come from actual pricing
      return sum + (t.volumeTons * 50); // $50 per ton
    }, 0);

    const totalWasteDiverted = transactions.reduce((sum, t) => sum + t.volumeTons, 0);

    const totalGreenCredits = greenCredits
      .filter(credit => credit.transaction && credit.transaction.producer === userId)
      .reduce((sum, credit) => sum + credit.amount, 0);

    return {
      activeListings: listings.length,
      totalRevenue,
      totalWasteDiverted,
      totalGreenCredits,
      recentTransactions: transactions.slice(0, 5),
      recentListings: listings.slice(0, 5)
    };
  },
};

// Initialize demo users if they don't exist
export async function initializeDemoUsers() {
  try {
    await connectDB();
    
    for (const mockUser of mockUsers) {
      const existingUser = await User.findOne({ email: mockUser.email });
      if (!existingUser) {
        // For demo users, use a simple password hash that we can easily verify
        const user = new User({
          email: mockUser.email,
          passwordHash: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJByJpD6cE5v2Q2vK8a', // This is "demo123" hashed
          company: mockUser.company,
          role: mockUser.role,
          createdAt: mockUser.createdAt,
        });
        await user.save();
        console.log(`Created demo user: ${mockUser.email}`);
      } else {
        console.log(`Demo user already exists: ${mockUser.email}`);
      }
    }
  } catch (error) {
    console.error('Error initializing demo users:', error);
  }
}