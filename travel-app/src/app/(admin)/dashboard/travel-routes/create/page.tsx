'use client';
import HeaderPageTitle from '@/components/Dashboard/HeaderPage';
import axiosInstance from '@/utils/axiosInstance';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

export default function Page() {
  const [cities, setCities] = useState<any[]>([]);

  const formik = useFormik({
    initialValues: {
      departureCityId: '',
      destinationCityId: '',
    },
    onSubmit: ({ departureCityId, destinationCityId }) => {
      console.log(departureCityId);
      console.log(destinationCityId);
    },
  });

  const onGetAllCity = async () => {
    try {
      const response = await axiosInstance.get('/api/cities');
      setCities(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetAllCity();
  }, []);

  return (
    <div>
      <HeaderPageTitle title='Create New Route' />

      <div className='bg-white p-10 rounded-md shadow-sm border border-gray-100 my-5'>
        <h2 className='text-xl font-bold text-gray-500 mb-5'>
          Form Create Route
        </h2>

        <form
          onSubmit={formik?.handleSubmit}
          className='grid grid-cols-2 gap-6'
        >
          {/* Origin */}
          <fieldset className='fieldset'>
            <legend className='fieldset-legend'>Origin</legend>
            <select
              defaultValue='Select Origin'
              name='departureCityId'
              onChange={formik?.handleChange}
              className='select select-bordered w-full text-gray-300 focus:outline-none focus:ring-0 focus:border-gray-500'
            >
              <option disabled={true}>Select Origin</option>
              {cities?.map((city: any, index: number) => {
                return (
                  <option
                    key={index}
                    value={city?.id}
                  >
                    {city?.name}
                  </option>
                );
              })}
            </select>
            <p className='label text-red-500'>Error message here</p>
          </fieldset>

          {/* Destination */}
          <fieldset className='fieldset'>
            <legend className='fieldset-legend'>Destination</legend>
            <select
              defaultValue='Select Destination'
              name='destinationCityId'
              onChange={formik?.handleChange}
              className='select select-bordered w-full text-gray-300 focus:outline-none focus:ring-0 focus:border-gray-500'
            >
              <option disabled={true}>Select Destination</option>
              {cities?.map((city: any, index: number) => {
                return (
                  <option
                    key={index}
                    value={city?.id}
                  >
                    {city?.name}
                  </option>
                );
              })}
            </select>
            <p className='label text-red-500'>Error message here</p>
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
