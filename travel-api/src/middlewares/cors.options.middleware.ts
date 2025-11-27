import { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { WHITELIST } from '../config/index.config';
import { NEXT_AUTH_SECRET_KEY } from '../config/index.config';

export function corsOptions(req: Request, res: Response, next: NextFunction) {
  const nextAuthSecretKey = req?.headers['next-auth-secret-key'];
  if (nextAuthSecretKey === NEXT_AUTH_SECRET_KEY) {
    return next();
  } else {
    return cors({
      origin(requestOrigin, callback) {
        if (WHITELIST.indexOf(requestOrigin) !== -1 || !requestOrigin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    })(req, res, next);
  }
}
