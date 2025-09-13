import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  passwordHash: string;
  company: string;
  role: 'producer' | 'recycler' | 'corporate';
  createdAt: Date;
  listings: string[];
  accounts: string[];
  sessions: string[];
  recyclerTransactions: string[];
  producerTransactions: string[];
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['producer', 'recycler', 'corporate'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  listings: [{
    type: Schema.Types.ObjectId,
    ref: 'Listing',
  }],
  accounts: [{
    type: Schema.Types.ObjectId,
    ref: 'Account',
  }],
  sessions: [{
    type: Schema.Types.ObjectId,
    ref: 'Session',
  }],
  recyclerTransactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Transaction',
  }],
  producerTransactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Transaction',
  }],
});

// Create indexes
UserSchema.index({ role: 1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
