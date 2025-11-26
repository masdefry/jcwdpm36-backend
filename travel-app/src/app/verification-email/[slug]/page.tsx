'use client';

import axiosInstance from '@/utils/axiosInstance';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const { slug } = useParams();

  const onEmailVerification = async () => {
    try {
      await axiosInstance.post(
        '/api/auth/email-verification',
        {},
        {
          headers: {
            Authorization: `Bearer ${slug}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onEmailVerification();
  }, []);

  return <>
    <h1 className='text-2xl font-bold'>Email Verification Success</h1>
  </>;
}
