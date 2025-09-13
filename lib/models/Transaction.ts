import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  _id: string;
  listing: string;
  recycler: string;
  producer: string;
  volumeTons: number;
  createdAt: Date;
  credits: string[];
}

const TransactionSchema = new Schema<ITransaction>({
  listing: {
    type: Schema.Types.ObjectId,
    ref: 'Listing',
    required: true,
  } as any,
  recycler: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  } as any,
  producer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  } as any,
  volumeTons: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  credits: [{
    type: Schema.Types.ObjectId,
    ref: 'GreenCredit',
  }],
});

// Create indexes
TransactionSchema.index({ listing: 1 });
TransactionSchema.index({ recycler: 1 });
TransactionSchema.index({ producer: 1 });
TransactionSchema.index({ createdAt: -1 });

export default mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);
