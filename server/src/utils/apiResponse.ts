import { Response } from 'express';

export const sendSuccess = (
  res: Response,
  data: unknown,
  message = 'Success',
  statusCode = 200,
  meta?: object
) => {
  res.status(statusCode).json({ success: true, message, data, ...(meta && { meta }) });
};

export const sendError = (res: Response, message: string, statusCode = 400) => {
  res.status(statusCode).json({ success: false, message });
};
