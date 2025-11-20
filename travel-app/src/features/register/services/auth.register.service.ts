import axiosInstance from '@/utils/axiosInstance';

export async function authRegisterService({email, username, password}: any) {
  await axiosInstance.post('/api/auth/register', {
    email,
    username,
    password,
  });
}
