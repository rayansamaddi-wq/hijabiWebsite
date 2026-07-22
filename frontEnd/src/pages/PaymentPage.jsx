import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { savePaymentMethod } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('Tap');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    navigate('/place-order');
  };

  return (
    <>
      <Meta title='Payment Method' />

      <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6'>
        <CheckoutSteps step1 step2 step3 />

        <div className='mx-auto mt-10 max-w-md rounded-lg border border-[#eadfd9] bg-white p-6 shadow-sm sm:p-8'>
          <h1 className='mb-7 text-3xl font-light text-[#3d342f]'>
            Payment Method
          </h1>

          <form onSubmit={submitHandler}>
            <p className='mb-4 text-sm font-medium text-[#3d342f]'>
              Select your preferred payment method
            </p>

            {/* Tap */}
            <label
              htmlFor='tap'
              className='mb-3 flex cursor-pointer items-center gap-3 rounded-md border border-[#eadfd9] p-4 transition hover:border-[#d9b8ae]'
            >
              <input
                id='tap'
                type='radio'
                name='paymentMethod'
                value='Tap'
                checked={paymentMethod === 'Tap'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className='h-4 w-4 accent-[#d9b8ae]'
              />

              <span className='text-sm font-medium text-[#3d342f]'>
                Credit / Debit Card
              </span>
            </label>

            {/* Cash on Delivery */}
            <label
              htmlFor='cod'
              className='mb-3 flex cursor-pointer items-center gap-3 rounded-md border border-[#eadfd9] p-4 transition hover:border-[#d9b8ae]'
            >
              <input
                id='cod'
                type='radio'
                name='paymentMethod'
                value='Cash on Delivery'
                checked={paymentMethod === 'Cash on Delivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className='h-4 w-4 accent-[#d9b8ae]'
              />

              <span className='text-sm font-medium text-[#3d342f]'>
                Cash on Delivery
              </span>
            </label>

            {/* Wish Money */}
            <label
              htmlFor='wishmoney'
              className='flex cursor-pointer items-center gap-3 rounded-md border border-[#eadfd9] p-4 transition hover:border-[#d9b8ae]'
            >
              <input
                id='wishmoney'
                type='radio'
                name='paymentMethod'
                value='Wish Money'
                checked={paymentMethod === 'Wish Money'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className='h-4 w-4 accent-[#d9b8ae]'
              />

              <span className='text-sm font-medium text-[#3d342f]'>
                Wish Money
              </span>
            </label>

            <button
              type='submit'
              className='mt-7 w-full rounded-md bg-[#d9b8ae] py-3 text-xs font-medium uppercase tracking-[0.18em] text-white transition hover:bg-[#c9a398]'
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;