import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse';

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err.stack);
  sendError(res, err.message || 'Internal server error', 500);
};
