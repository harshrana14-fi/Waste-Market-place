import mongoose, { Document, Schema } from 'mongoose';

export interface ISession extends Document {
  _id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
}

const SessionSchema = new Schema<ISession>({
  sessionToken: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  } as any,
  expires: {
    type: Date,
    required: true,
  },
});

// Create indexes
SessionSchema.index({ userId: 1 });
SessionSchema.index({ expires: 1 });

export default mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema);
