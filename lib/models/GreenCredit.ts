import mongoose, { Document, Schema } from 'mongoose';

export interface IGreenCredit extends Document {
  _id: string;
  transaction: string;
  amount: number;
  metadata?: any;
  createdAt: Date;
}

const GreenCreditSchema = new Schema<IGreenCredit>({
  transaction: {
    type: Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true,
  } as any,
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  metadata: {
    type: Schema.Types.Mixed,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create indexes
GreenCreditSchema.index({ transaction: 1 });
GreenCreditSchema.index({ createdAt: -1 });

export default mongoose.models.GreenCredit || mongoose.model<IGreenCredit>('GreenCredit', GreenCreditSchema);
