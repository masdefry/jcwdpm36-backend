import { MdOutlineMail } from 'react-icons/md';
import { PiPasswordBold } from 'react-icons/pi';
import { FaRegUser } from 'react-icons/fa6';
import useFormRegister from '../hooks/useFormRegister';
import InputRegister from './InputRegister';

export default function FormRegister() {
  const { formik } = useFormRegister();

  return (
    <form
      className='w-full flex flex-col gap-5'
      onSubmit={formik.handleSubmit}
    >
      <InputRegister
        Icon={MdOutlineMail}
        name={'email'}
        onChange={formik?.handleChange}
        errors={formik?.errors?.email}
      />
      <InputRegister
        Icon={FaRegUser}
        name={'username'}
        onChange={formik?.handleChange}
        errors={formik?.errors?.username}
      />
      <InputRegister
        Icon={PiPasswordBold}
        name={'password'}
        onChange={formik?.handleChange}
        errors={formik?.errors?.password}
      />
      <button className='btn rounded-xl bg-white border border-red-800 text-red-800 w-full mt-3 hover:bg-red-800 hover:text-white'>
        Register Account
      </button>
    </form>
  );
}
