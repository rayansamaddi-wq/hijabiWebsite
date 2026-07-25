import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useUpdateDeliverMutation,
} from '../slices/ordersApiSlice';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addCurrency } from '../utils/addCurrency';
import { BASE_URL } from '../constants';

const OrderDetailsPage = () => {
  const { id: orderId } = useParams();

  const { data: order, isLoading, error } =
    useGetOrderDetailsQuery(orderId);

  const [updateDeliver, { isLoading: isUpdateDeliverLoading }] =
    useUpdateDeliverMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // =========================
  // 💳 TAP PAYMENT HANDLER
  // =========================
  const paymentHandler = async () => {
    try {
      const res = await fetch('/api/v1/payment/create-charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: order.totalPrice,
          currency: 'USD',
          orderId: order._id,
          customer: {
            firstName: order?.user?.name,
            lastName: '',
            email: order?.user?.email,
            phone: order?.shippingAddress?.phone || '00000000',
            countryCode: '961',
          },
        }),
      });

      const data = await res.json();

      if (!data?.paymentUrl) {
        throw new Error('Payment URL not received');
      }

      // Redirect to Tap hosted checkout
      window.location.href = data.paymentUrl;
    } catch (error) {
      toast.error(
        error?.message || 'Could not start payment process'
      );
    }
  };

  const deliveredHandler = async () => {
    try {
      await updateDeliver(orderId).unwrap();
      toast.success('Order marked as delivered');
    } catch (error) {
      toast.error(
        error?.data?.message || error?.error || 'Could not update delivery'
      );
    }
  };

  if (isLoading) return <Loader />;

  if (error)
    return (
      <Message variant='danger'>
        {error?.data?.message || error.error}
      </Message>
    );

  return (
    <>
      <Meta title='Order Details' />

      <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8'>
        <h1 className='mb-8 text-2xl font-light text-[#3d342f] sm:text-3xl'>
          Order Details
        </h1>

        <p className='mb-8 break-all text-sm text-gray-500'>
          Order ID: {orderId}
        </p>

        <div className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
          {/* LEFT */}
          <div className='space-y-6 lg:col-span-2'>
            {/* SHIPPING */}
            <section className='rounded-lg border bg-white p-6 shadow-sm'>
              <h2 className='mb-5 text-xl font-medium text-[#3d342f]'>
                Shipping
              </h2>

              <p className='text-sm text-gray-700'>
                {order?.user?.name} <br />
                {order?.user?.email} <br />
                {order?.shippingAddress?.address},{' '}
                {order?.shippingAddress?.city},{' '}
                {order?.shippingAddress?.postalCode},{' '}
                {order?.shippingAddress?.country}
              </p>

              <div className='mt-5'>
                {order?.isDelivered ? (
                  <div className='rounded-md bg-green-50 p-3 text-green-700'>
                    Delivered on{' '}
                    {new Date(order.deliveredAt).toLocaleString()}
                  </div>
                ) : (
                  <div className='rounded-md bg-red-50 p-3 text-red-700'>
                    Not Delivered
                  </div>
                )}
              </div>
            </section>

            {/* PAYMENT */}
            <section className='rounded-lg border bg-white p-6 shadow-sm'>
              <h2 className='mb-5 text-xl font-medium text-[#3d342f]'>
                Payment
              </h2>

              <p className='text-sm text-gray-700'>
                Method: {order?.paymentMethod}
              </p>

              <div className='mt-5'>
                {order?.isPaid ? (
                  <div className='rounded-md bg-green-50 p-3 text-green-700'>
                    Paid on {new Date(order.paidAt).toLocaleString()}
                  </div>
                ) : (
                  <div className='rounded-md bg-red-50 p-3 text-red-700'>
                    Not Paid
                  </div>
                )}
              </div>
            </section>

            {/* ITEMS */}
            <section className='rounded-lg border bg-white p-6 shadow-sm'>
              <h2 className='mb-5 text-xl font-medium text-[#3d342f]'>
                Order Items
              </h2>

              {order?.orderItems?.map((item) => (
                <div key={item._id} className='flex gap-4 py-4'>
                  <img
                    src={`${BASE_URL}${item.image}`}
                    className='h-20 w-20 object-cover'
                    alt={item.name}
                  />

                  <Link
                    to={`/product/${item._id}`}
                    className='flex-1 text-sm font-medium'
                  >
                    {item.name}
                  </Link>

                  <div>
                    {item.qty} × {addCurrency(item.price)}
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* RIGHT */}
          <aside className='rounded-lg border bg-white p-6 shadow-sm'>
            <h2 className='mb-4 text-xl font-medium text-[#3d342f]'>
              Order Summary
            </h2>

            <div className='space-y-3 text-sm'>
              <div className='flex justify-between'>
                <span>Items</span>
                <span>{addCurrency(order?.itemsPrice)}</span>
              </div>

              <div className='flex justify-between'>
                <span>Shipping</span>
                <span>{addCurrency(order?.shippingPrice)}</span>
              </div>

              <div className='flex justify-between'>
                <span>Tax</span>
                <span>{addCurrency(order?.taxPrice)}</span>
              </div>

              <div className='flex justify-between border-t pt-3 font-bold'>
                <span>Total</span>
                <span>{addCurrency(order?.totalPrice)}</span>
              </div>
            </div>

            {/* PAY BUTTON */}
            {!order?.isPaid && userInfo && !userInfo.isAdmin && (
              <button
                onClick={paymentHandler}
                className='mt-6 w-full rounded-md bg-[#d9b8ae] py-3 text-white'
              >
                Pay Now
              </button>
            )}

            {/* ADMIN DELIVER */}
            {userInfo?.isAdmin &&
              order?.isPaid &&
              !order?.isDelivered && (
                <button
                  onClick={deliveredHandler}
                  disabled={isUpdateDeliverLoading}
                  className='mt-4 w-full rounded-md bg-[#d9b8ae] py-3 text-white'
                >
                  {isUpdateDeliverLoading
                    ? 'Updating...'
                    : 'Mark as Delivered'}
                </button>
              )}
          </aside>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsPage;