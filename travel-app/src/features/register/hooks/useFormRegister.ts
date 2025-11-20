import { useFormik } from 'formik';
import { registerValidationSchema } from '@/features/register/schemas/registerValidationSchema';
import { authRegisterService } from '../services/auth.register.service';

export default function useFormRegister() {
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema: registerValidationSchema,
    onSubmit: async ({ email, username, password }) => {
      try {
        await authRegisterService({ email, username, password });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return {
    formik,
  };
}
