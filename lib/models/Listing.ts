import mongoose, { Document, Schema } from 'mongoose';

export interface IListing extends Document {
  _id: string;
  type: string;
  volume: string;
  location: string; // Changed from coordinates to simple string
  frequency?: 'one-time' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  description?: string;
  price?: string;
  contactEmail?: string;
  contactPhone?: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
  owner: mongoose.Types.ObjectId;
  transactions: mongoose.Types.ObjectId[];
  verified?: boolean;
  tags?: string[];
  processEfficiency?: number;
  certifications?: string[];
  
  // Virtual fields
  isExpired: boolean;
  
  // Instance methods
  isOwnedBy(userId: string): boolean;
}

export interface IListingModel extends mongoose.Model<IListing> {
  // Static methods
  findNearby(coordinates: [number, number], maxDistance?: number): Promise<IListing[]>;
}

const ListingSchema = new Schema<IListing>({
  type: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  volume: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  frequency: {
    type: String,
    trim: true,
    enum: ['one-time', 'daily', 'weekly', 'monthly', 'quarterly', 'yearly'],
  },
  description: {
    type: String,
    trim: true,
    maxLength: 2000,
  },
  price: {
    type: String,
    trim: true,
  },
  contactEmail: {
    type: String,
    trim: true,
    validate: {
      validator: function(v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email format'
    }
  },
  contactPhone: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  transactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Transaction',
  }],
  verified: {
    type: Boolean,
    default: false,
    index: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  processEfficiency: {
    type: Number,
    min: 0,
    max: 100,
  },
  certifications: [{
    type: String,
    trim: true,
  }],
  images: [{
    type: String,
    trim: true,
  }],
});

// Create indexes
ListingSchema.index({ tags: 1 });
ListingSchema.index({ type: 1, createdAt: -1 });
ListingSchema.index({ owner: 1, createdAt: -1 });

// Add timestamps for automatic createdAt/updatedAt management
ListingSchema.set('timestamps', true);

// Add virtual fields for better data handling
ListingSchema.virtual('isExpired').get(function(this: IListing) {
  if (!this.createdAt) return false;
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return this.createdAt < thirtyDaysAgo;
});

// Add methods
ListingSchema.methods.isOwnedBy = function(userId: string) {
  return this.owner.toString() === userId.toString();
};

// Add statics
ListingSchema.statics.findNearby = function(location: string, maxDistance = 50000) {
  return this.find({
    location: { $regex: location, $options: 'i' }
  });
};

const Listing = (mongoose.models.Listing || mongoose.model<IListing>('Listing', ListingSchema)) as any;
export default Listing;
