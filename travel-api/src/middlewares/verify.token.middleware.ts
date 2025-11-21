import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY_AUTH } from '../config/index.config';

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req?.headers?.authorization?.split(' ')[1];

  if (!token) throw new Error('Token must be provide');

  const payload = await jwt.verify(token, JWT_SECRET_KEY_AUTH!);

  res.locals.payload = payload;

  next();
}
