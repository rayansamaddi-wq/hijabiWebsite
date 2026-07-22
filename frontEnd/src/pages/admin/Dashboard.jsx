import React from 'react';
import { FaStore, FaUsers, FaWallet } from 'react-icons/fa';

import { useGetProductsQuery } from '../../slices/productsApiSlice';
import { useGetUsersQuery } from '../../slices/usersApiSlice';

import Loader from '../../components/Loader';
import Meta from '../../components/Meta';
import ProductPriceChart from '../../components/Admin/ProductPriceChart';
import DashboardCard from '../../components/Admin/DashboardCard';

const Dashboard = () => {
  const { data: products, isLoading } = useGetProductsQuery({});
  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery({});

  if (isLoading || isUsersLoading) {
    return <Loader />;
  }

  return (
    <div className='space-y-8 pt-6'>
      <Meta title={'Admin Dashboard'} />

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        <DashboardCard
          title='Products'
          icon={<FaStore size={30} />}
          value={products?.length || 0}
          bgColor='bg-blue-500'
        />

        <DashboardCard
          title='Users'
          icon={<FaUsers size={30} />}
          value={users?.length || 0}
          bgColor='bg-red-500'
        />

        <DashboardCard
          title='Revenue'
          icon={<FaWallet size={30} />}
          value='$0'
          bgColor='bg-green-500'
        />
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <div className='rounded-xl bg-white p-4 shadow-md'>
          <ProductPriceChart products={products || []} />
        </div>

        <div className='rounded-xl bg-white p-4 shadow-md'>
          <p className='text-center text-gray-400'>
            Orders chart will appear here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;