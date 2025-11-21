import axiosInstance from '@/utils/axiosInstance';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type LoginResponse = {
  data: {
    email: string;
    token: string;
    role: string;
  };
};

const nextAuthHandler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: '',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, _) {
        try {
          const response = await axiosInstance.post<LoginResponse>(
            '/api/auth/login',
            {
              username: credentials?.username,
              password: credentials?.password,
            },
            {
              headers: {
                'next-auth-secret-key': 'jcwdbsdpm36',
              },
            }
          );

          return {
            id: response?.data?.data?.token,
            accessToken: response?.data?.data?.token,
            role: response?.data?.data?.role,
            email: response?.data?.data?.email,
          };
        } catch (error: any) {
          throw new Error(error?.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user?.email;
        token.role = user?.role;
        token.accessToken = user?.accessToken;
        token.id = user?.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { role: string }).role = token.role as string;
        (session.user as { accessToken: string }).accessToken =
          token.accessToken as string;
        (session.user as { email: string }).email = token.email as string;
      }

      return session;
    },
  },
});

export { nextAuthHandler as GET, nextAuthHandler as POST };
