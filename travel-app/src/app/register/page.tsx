'use client';
import Link from 'next/link';
import FormRegister from '@/features/register/components/FormRegister';

export default function Page() {
  return (
    <div>
      {/* Section: Header */}
      <div className='bg-white shadow-xl flex items-center'>
        <Link
          href='/login'
          className='flex-1 '
        >
          <h1 className='font-black text-center py-3'>Login</h1>
        </Link>
        <Link
          href='/register'
          className='flex-1 '
        >
          <h1 className='font-black text-center border-b-3 border-red-800 py-3'>
            Register
          </h1>
        </Link>
      </div>

      <div className='px-3 py-10'>
        <FormRegister />
      </div>
    </div>
  );
}
