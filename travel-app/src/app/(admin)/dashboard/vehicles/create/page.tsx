'use client';
import HeaderPageTitle from '@/components/Dashboard/HeaderPage';
import { createVehicleSchema } from '@/features/dashboard/vehicles/schemas/createVehicleSchema';
import axiosInstance from '@/utils/axiosInstance';
import { useFormik } from 'formik';

export default function Page() {
  const formik = useFormik({
    initialValues: {
      type: '',
      totalSeat: 0,
      vehicleImages: [] as File[],
    },
    validationSchema: createVehicleSchema,
    onSubmit: async ({ type, totalSeat, vehicleImages }) => {
      try {
        const formData = new FormData();

        formData.append('type', type);
        formData.append('totalSeat', String(totalSeat));
        vehicleImages?.forEach((file) => {
          formData.append('vehicleImages', file);
        });

        await axiosInstance.post('/api/vehicles', formData);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div>
      <HeaderPageTitle title='Create New Vehicle Type' />
      <div className='bg-white p-10 rounded-md shadow-sm border border-gray-100 my-5'>
        <h2 className='text-xl font-bold text-gray-500 mb-5'>
          Form Create Vehicle Type
        </h2>
        <form
          onSubmit={formik?.handleSubmit}
          className='grid grid-cols-2 gap-6'
        >
          {/* Name */}
          <fieldset className='fieldset'>
            <legend className='fieldset-legend'>Vehcile Type</legend>
            <input
              type='text'
              className='input w-full focus:outline-none focus:ring-0 focus:border-gray-500'
              placeholder='Type here'
              name='type'
              onChange={formik?.handleChange}
            />
            <p className='label text-red-500'>Error</p>
          </fieldset>

          {/* Total Seat */}
          <fieldset className='fieldset'>
            <legend className='fieldset-legend'>Total Seat</legend>
            <input
              type='text'
              className='input w-full focus:outline-none focus:ring-0 focus:border-gray-500'
              placeholder='Type here'
              name='totalSeat'
              onChange={formik?.handleChange}
            />
            <p className='label text-red-500'>Error</p>
          </fieldset>

          {/* Images */}
          <fieldset className='fieldset'>
            <legend className='fieldset-legend'>Select Max. 3 Images</legend>
            <input
              type='file'
              className='file-input focus:outline-none focus:ring-0 focus:border-gray-500'
              name='vehicleImages'
              onChange={(e) => {
                if (e.currentTarget.files) {
                  formik.setFieldValue(
                    'vehicleImages',
                    Array.from(e.currentTarget.files)
                  );
                }
              }}
              multiple
            />
            <p className='label text-red-500'>
              {formik.errors.vehicleImages?.toString()}
            </p>
          </fieldset>

          {/* Submit Button */}
          <div className='col-span-full flex justify-end mt-5'>
            <button
              type='submit'
              className='btn bg-red-700 text-white px-8 rounded-full hover:bg-red-800 transition'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
