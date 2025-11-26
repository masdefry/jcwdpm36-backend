import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(secretKey: string) {
  return async(req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization?.split(' ')[1];

    if (!token) throw new Error('Token must be provide');

    const payload = await jwt.verify(token, secretKey);

    res.locals.payload = payload;

    next();
  };
}
