import { z } from 'zod';

export const registerSchema = z.object({
  name:     z.string().min(2, 'Name must be at least 2 characters'),
  email:    z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  // role intentionally excluded — all registrations default to 'sales'
  // admins are seeded directly in the database to prevent privilege escalation
});

export const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
});
