import { z } from 'zod';

export const createLeadSchema = z.object({
  name:   z.string().min(2),
  email:  z.string().email(),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']).optional(),
  source: z.enum(['Website', 'Instagram', 'Referral']),
});

export const updateLeadSchema = createLeadSchema.partial();

export const querySchema = z.object({
  page:   z.coerce.number().min(1).optional().default(1),
  limit:  z.coerce.number().min(1).max(100).optional().default(10),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']).optional(),
  source: z.enum(['Website', 'Instagram', 'Referral']).optional(),
  search: z.string().optional(),
  sort:   z.enum(['latest', 'oldest']).optional().default('latest'),
});
