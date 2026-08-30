import React, { useEffect } from 'react';
import { FaIndianRupeeSign, FaXmark } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Meta from '../../components/Meta';
import { useSelector } from 'react-redux';
import { addCurrency } from '../../utils/addCurrency';
import { Link } from 'react-router-dom';

const OrderListsPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const { userInfo } = useSelector(state => state.auth);

  return (
    <>
      <Meta title={'Order List'} />

      <h2 className='mb-4 text-2xl font-semibold'>Orders</h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className='w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm'>
          <table className='w-full border-collapse text-left text-sm'>
            <thead className='bg-gray-100 text-gray-700'>
              <tr>
                <th className='border-b border-gray-200 px-4 py-3 font-semibold'>
                  ID
                </th>
                <th className='border-b border-gray-200 px-4 py-3 font-semibold'>
                  USER
                </th>
                <th className='border-b border-gray-200 px-4 py-3 font-semibold'>
                  DATE
                </th>
                <th className='border-b border-gray-200 px-4 py-3 font-semibold'>
                  TOTAL
                </th>
                <th className='border-b border-gray-200 px-4 py-3 font-semibold'>
                  PAID
                </th>
                <th className='border-b border-gray-200 px-4 py-3 font-semibold'>
                  DELIVERED
                </th>
                <th className='border-b border-gray-200 px-4 py-3 font-semibold'>
                  DETAILS
                </th>
              </tr>
            </thead>

            <tbody>
              {orders?.map(order => (
                <tr
                  key={order._id}
                  className='transition-colors hover:bg-gray-50'
                >
                  <td className='border-b border-gray-200 px-4 py-3'>
                    {order.user._id}
                  </td>

                  <td className='border-b border-gray-200 px-4 py-3'>
                    {order.user.name}
                  </td>

                  <td className='border-b border-gray-200 px-4 py-3'>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className='border-b border-gray-200 px-4 py-3'>
                    {addCurrency(order.totalPrice)}
                  </td>

                  <td className='border-b border-gray-200 px-4 py-3'>
                    {order.isPaid ? (
                      <FaCheck className='text-green-600' />
                    ) : (
                      <FaXmark className='text-red-600' />
                    )}
                  </td>

                  <td className='border-b border-gray-200 px-4 py-3'>
                    {order.isDelivered ? (
                      <FaCheck className='text-green-600' />
                    ) : (
                      <FaXmark className='text-red-600' />
                    )}
                  </td>

                  <td className='border-b border-gray-200 px-4 py-3'>
               <Link to={  userInfo.isAdmin ? `/admin/order/${order._id}` : `/order/${order._id}`}
  className='inline-block rounded bg-cyan-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-cyan-600'
>
  Details
</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default OrderListsPage;
