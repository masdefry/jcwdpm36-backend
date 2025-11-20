/*
    Install: npm i formik yup
*/
'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Backendless from '@/utils/backendless';

const exampleValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email format is invalid')
    .required('Email is required'),
  name: Yup.string()
    .min(5, 'Name have minimum 5 characters')
    .max(25, 'Name have maximum 25 characters')
    .required('Name is required'),
});

export default function Page() {
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
    },
    validationSchema: exampleValidationSchema,
    onSubmit: async (values) => {
      await Backendless.Data.of('Example').save({
        email: values?.email,
        name: values?.name,
      });
    },
  });

  return (
    <form onSubmit={formik?.handleSubmit}>
      <input
        type='text'
        name='email'
        onChange={formik?.handleChange}
        placeholder='Type your email'
        className='input'
      />
      <p>{formik?.errors?.email}</p>
      <input
        type='text'
        name='name'
        onChange={formik?.handleChange}
        placeholder='Type your name'
        className='input'
      />
      <p>{formik?.errors?.name}</p>
      <button
        type='submit'
        className='btn bg-red-500'
      >
        Submit
      </button>
    </form>
  );
}
