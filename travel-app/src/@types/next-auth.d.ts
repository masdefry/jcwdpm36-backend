import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: string;
    role: string;
    accessToken: string;
    email: string;
  }

  interface Session {
    user: {
      id: string;
      role: string;
      email: string;
      accessToken: string;
    } & DefaultSession['user'];
  }

  interface JWT {
    id: string;
    role: string;
    email: string;
    accessToken: string;
  }
}
