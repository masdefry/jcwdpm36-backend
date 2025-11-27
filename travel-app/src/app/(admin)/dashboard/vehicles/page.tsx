'use client';
import HeaderPageTitle from '@/components/Dashboard/HeaderPage';
import SummaryCards from '@/components/Dashboard/SummaryCards';
import axiosInstance from '@/utils/axiosInstance';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Page() {
  const [vehicles, setVehicles] = useState<any[]>([]);

  const onGetVehicles = async () => {
    try {
      const response = await axiosInstance.get<any>('/api/vehicles');
      console.log(response?.data?.data?.vehicles);
      setVehicles(response?.data?.data?.vehicles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetVehicles();
  }, []);

  return (
    <div>
      <HeaderPageTitle
        title='Travel Routes'
        createLabel='New Route'
        createUrl='/dashboard/travel-routes/create'
      />
      <SummaryCards />

      <div className='hidden md:grid grid-cols-5 gap-3'>
        <select
          defaultValue='Origin City'
          className='select select-bordered w-full text-gray-300 focus:outline-none focus:ring-0 focus:border-gray-500'
        >
          <option disabled={true}>Origin City</option>
        </select>
        <select
          defaultValue='Destination City'
          className='select select-bordered w-full text-gray-300 focus:outline-none focus:ring-0 focus:border-gray-500'
        >
          <option disabled={true}>Destination City</option>
        </select>
        <select
          defaultValue='Vehicle Type'
          className='select select-bordered w-full text-gray-300 focus:outline-none focus:ring-0 focus:border-gray-500'
        >
          <option disabled={true}>Vehicle Type</option>
        </select>
      </div>

      <div className='py-10'>
        <div className='overflow-x-auto'>
          <table className='table'>
            {/* head */}
            <thead className='text-md'>
              <tr>
                <th>
                  <label>
                    <input
                      type='checkbox'
                      className='checkbox'
                    />
                  </label>
                </th>
                <th>Images</th>
                <th>Vehicle Type</th>
                <th>Total Seat</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {vehicles?.map((vehicle) => {
                return (
                  <tr key={vehicle?.id}>
                    <th>
                      <label>
                        <input
                          type='checkbox'
                          className='checkbox'
                        />
                      </label>
                    </th>
                    <td>
                      <Image
                        src={`http://localhost:5000/images/${vehicle?.vehicleImages[0]?.imageUrl}`}
                        width={100}
                        height={100}
                        alt='vehicle image'
                      />
                    </td>
                    <td>
                      <p className='px-3 py-1 w-fit bg-red-700 rounded-md text-white'>
                        Hiace
                      </p>
                    </td>
                    <td>
                      30
                      <br />
                      <p className='text-gray-500'>Seat</p>
                    </td>
                    <th>
                      <button className='btn btn-ghost btn-xs'>details</button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className='flex justify-center'>
          <div className='join flex items-center'>
            <button className='join-item btn btn-outline'>Prev</button>
            <button className='join-item btn btn-outline'>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
