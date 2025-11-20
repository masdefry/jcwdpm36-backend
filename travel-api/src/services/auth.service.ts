import { prisma } from '../config/prisma.client';
import { User } from '../generated/prisma/client';
import bcrypt from 'bcrypt';
import { createToken } from '../utils/create.token';
import { JWT_SECRET_KEY_AUTH } from '../config/index.config';

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

    await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
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
    };
  },
};
