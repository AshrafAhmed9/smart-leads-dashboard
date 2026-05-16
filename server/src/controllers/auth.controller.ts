import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { registerSchema, loginSchema } from '../validations/auth.validation';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { AuthRequest } from '../middleware/auth.middleware';

const signToken = (id: string, role: string) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET!, { expiresIn: '7d' });

export const register = async (req: Request, res: Response): Promise<void> => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) { sendError(res, parsed.error.issues[0].message); return; }

  const { name, email, password } = parsed.data;
  const exists = await User.findOne({ email });
  if (exists) { sendError(res, 'Email already in use'); return; }

  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashed, role: 'sales' });
  const token = signToken(String(user._id), user.role);

  sendSuccess(res, { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } }, 'Registered successfully', 201);
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) { sendError(res, parsed.error.issues[0].message); return; }

  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    sendError(res, 'Invalid credentials', 401);
    return;
  }

  const token = signToken(String(user._id), user.role);
  sendSuccess(res, { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await User.findById(req.user!.id).select('-password');
  if (!user) { sendError(res, 'User not found', 404); return; }
  sendSuccess(res, user);
};
