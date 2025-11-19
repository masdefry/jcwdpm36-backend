'use client';

import { GrLocation } from 'react-icons/gr';
import { BsPeople } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { MdOutlineMail } from 'react-icons/md';
import { PiPasswordBold } from 'react-icons/pi';
import Link from 'next/link';

export default function Page() {
  const router = useRouter();
  const onHandleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
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

      {/* Section: Form Login */}
      <div className='px-3 py-10'>
        <form
          className='w-full flex flex-col gap-5'
          onSubmit={onHandleSearch}
        >
          <fieldset className='flex items-center gap-2 border-b-1 border-gray-300 w-full'>
            <MdOutlineMail className='text-xl text-red-800' />
            <input
              type='text'
              placeholder='Enter your registered email'
              className='input border-none focus:outline-none focus:ring-0 text-black bg-transparent'
            />
          </fieldset>
          <fieldset className='flex items-center gap-2 border-b-1 border-gray-300 w-full'>
            <PiPasswordBold className='text-xl text-red-800' />
            <input
              type='text'
              placeholder='Enter your password'
              className='input border-none focus:outline-none focus:ring-0 text-black bg-transparent'
            />
          </fieldset>
          <button className='btn rounded-xl bg-white border border-red-800 text-red-800 w-full mt-3 hover:bg-red-800 hover:text-white'>
            Login Account
          </button>
        </form>
      </div>
    </div>
  );
}
