import mongoose, { Document, Schema } from 'mongoose';

export interface IListing extends Document {
  _id: string;
  type: string;
  volume: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  frequency?: string;
  description?: string;
  price?: string;
  contactEmail?: string;
  contactPhone?: string;
  createdAt: Date;
  owner: string;
  transactions: string[];
  verified?: boolean;
  tags?: string[];
  processEfficiency?: number;
  certifications?: string[];
}

const ListingSchema = new Schema<IListing>({
  type: {
    type: String,
    required: true,
    trim: true,
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
  },
  frequency: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: String,
    trim: true,
  },
  contactEmail: {
    type: String,
    trim: true,
  },
  contactPhone: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  transactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Transaction',
  }],
  verified: {
    type: Boolean,
    default: false,
  },
  tags: [{
    type: String,
    trim: true,
  }],
});

// Create indexes
ListingSchema.index({ owner: 1 });
ListingSchema.index({ type: 1 });
ListingSchema.index({ location: 1 });
ListingSchema.index({ createdAt: -1 });

export default mongoose.models.Listing || mongoose.model<IListing>('Listing', ListingSchema);
