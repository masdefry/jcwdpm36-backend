import { prisma } from '../config/prisma.client';
import { User } from '../generated/prisma/client';
import bcrypt from 'bcrypt';
import { createToken } from '../utils/create.token';
import {
  JWT_SECRET_KEY_AUTH,
  JWT_SECRET_KEY_EMAIL_VERIFICATION,
  LINK_EMAIL_VERIFICATION,
} from '../config/index.config';
import { mailService } from './mail.service';
import { AppError } from '../utils/app-error';

export const authService = {
  async register({
    email,
    username,
    password,
  }: Pick<User, 'email' | 'username' | 'password'>) {
    const findUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            username,
          },
        ],
      },
    });

    if (findUser) throw new Error('Email or username already registered');

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    const tokenEmailVerification = await createToken(
      { userId: createdUser?.uid },
      JWT_SECRET_KEY_EMAIL_VERIFICATION!,
      { expiresIn: '1h' }
    );

    await mailService.sendMail(
      email,
      './../templates',
      `email-verification.html`,
      {
        email,
        linkVerification: `${LINK_EMAIL_VERIFICATION}${tokenEmailVerification}`,
      }
    );
  },

  async login({ username, password }: Pick<User, 'username' | 'password'>) {
    const findUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: username,
          },
          {
            username: username,
          },
        ],
      },
    });

    if (!findUser) throw new Error('Username or password is invalid');

    const isComparePassword = await bcrypt.compare(
      password,
      findUser?.password
    );

    if (!isComparePassword) throw new Error('Username or password is invalid');

    const token = await createToken(
      {
        userId: findUser?.uid,
        role: findUser?.role,
      },
      JWT_SECRET_KEY_AUTH!,
      {
        expiresIn: '1d',
      }
    );

    return {
      token,
      email: findUser?.email,
      username: findUser?.username,
      role: findUser?.role,
    };
  },

  async emailVerification(userId: string){
    const findUser = await prisma.user.findFirst({
      where: {
        uid: userId 
      }
    })

    if(!findUser) throw AppError('Email verification failed', 400);

    await prisma.user.update({
      data: {
        isVerified: true 
      }, 
      where: {
        uid: userId
      }
    })
  }
};
