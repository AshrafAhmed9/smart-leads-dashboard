import { Schema, model, Document, Types } from 'mongoose';

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type LeadSource = 'Website' | 'Instagram' | 'Referral';

export interface LeadDocument extends Document {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  assignedTo?: Types.ObjectId;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<LeadDocument>(
  {
    name:       { type: String, required: true, trim: true },
    email:      { type: String, required: true, lowercase: true, trim: true },
    status:     { type: String, enum: ['New', 'Contacted', 'Qualified', 'Lost'], default: 'New' },
    source:     { type: String, enum: ['Website', 'Instagram', 'Referral'], required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    createdBy:  { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Lead = model<LeadDocument>('Lead', leadSchema);
