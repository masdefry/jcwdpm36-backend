import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AppError } from '../utils/app-error';

export function expressValidator(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const result = validationResult(req);

  if (!result?.isEmpty()) {
    throw AppError(result.array()[0]?.msg, 422);
  }

  next();
}
