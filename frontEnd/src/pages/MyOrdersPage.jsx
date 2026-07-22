import React from 'react';
import { Link } from 'react-router-dom';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addCurrency } from '../utils/addCurrency';

const MyOrdersPage = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <>
      <Meta title='My Orders' />

      <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8'>
        <h1 className='mb-8 text-3xl font-light text-[#3d342f]'>
          My Orders
        </h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : orders?.length === 0 ? (
          <div className='rounded-lg border bg-white p-6 text-center shadow-sm'>
            <p className='mb-4 text-gray-600'>
              You have not placed any orders yet.
            </p>

            <Link
              to='/'
              className='inline-block rounded-md bg-[#d9b8ae] px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:bg-[#c9a398]'
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className='overflow-x-auto rounded-lg border bg-white shadow-sm'>
            <table className='min-w-full text-left text-sm'>
              <thead className='border-b bg-[#f8f5f3] text-xs uppercase tracking-wider text-[#3d342f]'>
                <tr>
                  <th className='px-5 py-4'>Order ID</th>
                  <th className='px-5 py-4'>Date</th>
                  <th className='px-5 py-4'>Total</th>
                  <th className='px-5 py-4'>Paid</th>
                  <th className='px-5 py-4'>Delivered</th>
                  <th className='px-5 py-4 text-right'>Details</th>
                </tr>
              </thead>

              <tbody className='divide-y'>
                {orders?.map(order => (
                  <tr key={order._id} className='transition hover:bg-gray-50'>
                    <td className='px-5 py-4 font-medium text-[#3d342f]'>
                      {order._id}
                    </td>

                    <td className='px-5 py-4 text-gray-600'>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td className='px-5 py-4 font-medium text-[#3d342f]'>
                      {addCurrency(order.totalPrice)}
                    </td>

                    <td className='px-5 py-4'>
                      {order.isPaid ? (
                        <span className='rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700'>
                          Paid
                        </span>
                      ) : (
                        <span className='rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700'>
                          Not Paid
                        </span>
                      )}
                    </td>

                    <td className='px-5 py-4'>
                      {order.isDelivered ? (
                        <span className='rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700'>
                          Delivered
                        </span>
                      ) : (
                        <span className='rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700'>
                          Processing
                        </span>
                      )}
                    </td>

                    <td className='px-5 py-4 text-right'>
                      <Link
                        to={`/order/${order._id}`}
                        className='inline-block rounded-md border border-[#d9b8ae] px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#3d342f] transition hover:bg-[#d9b8ae] hover:text-white'
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default MyOrdersPage;