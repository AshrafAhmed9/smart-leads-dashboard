import { LeadStatus, LeadSource } from '../types';

export const STATUS_OPTIONS: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Lost'];
export const SOURCE_OPTIONS: LeadSource[] = ['Website', 'Instagram', 'Referral'];

export const STATUS_BADGE: Record<LeadStatus, string> = {
  New:       'bg-blue-100 text-blue-800',
  Contacted: 'bg-yellow-100 text-yellow-800',
  Qualified: 'bg-green-100 text-green-800',
  Lost:      'bg-red-100 text-red-800',
};
