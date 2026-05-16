import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendError } from '../utils/apiResponse';
import { UserRole } from '../models/user.model';

export interface AuthRequest extends Request {
  user?: { id: string; role: UserRole };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) { sendError(res, 'Unauthorized', 401); return; }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: UserRole };
    req.user = decoded;
    next();
  } catch {
    sendError(res, 'Invalid or expired token', 401);
  }
};
