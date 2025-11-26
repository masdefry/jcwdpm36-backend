import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export const authController = {
  async register(req: Request, res: Response) {
    const { email, username, password } = req.body;

    await authService.register({ email, username, password });

    res.status(201).json({
      success: true,
      message: 'Register account successfull',
      data: {
        email,
        username,
      },
    });
  },

  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await authService.login({ username, password });

    res.status(200).json({
      success: true,
      message: 'Login account successfull',
      data: {
        ...user,
      },
    });
  },

  async emailVerification(req: Request, res: Response) {
    const { userId } = res?.locals?.payload;

    await authService.emailVerification(userId);

    res.status(200).json({
      success: true,
      message: 'Email verification successfull',
      data: { userId },
    });
  },
};
