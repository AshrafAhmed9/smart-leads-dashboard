import { Schema, model, Document } from 'mongoose';

export type UserRole = 'admin' | 'sales';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const userSchema = new Schema<UserDocument>(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role:     { type: String, enum: ['admin', 'sales'], default: 'sales' },
  },
  { timestamps: true }
);

export const User = model<UserDocument>('User', userSchema);
