import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';

const ShippingPage = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );

    navigate('/payment');
  };

  return (
    <>
      <Meta title='Shipping' />

      <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6'>
        <CheckoutSteps step1 step2 />

        <div className='mx-auto mt-10 max-w-md rounded-lg border border-[#eadfd9] bg-white p-6 shadow-sm sm:p-8'>
          <h1 className='mb-7 text-3xl font-light text-[#3d342f]'>
            Shipping
          </h1>

          <form onSubmit={submitHandler} className='space-y-5'>
            {/* Address */}
            <div>
              <label
                htmlFor='address'
                className='mb-2 block text-sm font-medium text-[#3d342f]'
              >
                Address
              </label>

              <input
                id='address'
                value={address}
                type='text'
                placeholder='Enter your address'
                onChange={(e) => setAddress(e.target.value)}
                required
                className='w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#d9b8ae] focus:ring-2 focus:ring-[#d9b8ae]/30'
              />
            </div>

            {/* City */}
            <div>
              <label
                htmlFor='city'
                className='mb-2 block text-sm font-medium text-[#3d342f]'
              >
                City
              </label>

              <input
                id='city'
                value={city}
                type='text'
                placeholder='Enter your city'
                onChange={(e) => setCity(e.target.value)}
                required
                className='w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#d9b8ae] focus:ring-2 focus:ring-[#d9b8ae]/30'
              />
            </div>

            {/* Postal code */}
            <div>
              <label
                htmlFor='postalCode'
                className='mb-2 block text-sm font-medium text-[#3d342f]'
              >
                Postal Code
              </label>

              <input
                id='postalCode'
                value={postalCode}
                type='text'
                placeholder='Enter postal code'
                onChange={(e) => setPostalCode(e.target.value)}
                required
                className='w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#d9b8ae] focus:ring-2 focus:ring-[#d9b8ae]/30'
              />
            </div>

            {/* Country */}
            <div>
              <label
                htmlFor='country'
                className='mb-2 block text-sm font-medium text-[#3d342f]'
              >
                Country
              </label>

              <input
                id='country'
                value={country}
                type='text'
                placeholder='Enter your country'
                onChange={(e) => setCountry(e.target.value)}
                required
                className='w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#d9b8ae] focus:ring-2 focus:ring-[#d9b8ae]/30'
              />
            </div>

            <button
              type='submit'
              className='w-full rounded-md bg-[#d9b8ae] py-3 text-xs font-medium uppercase tracking-[0.18em] text-white transition hover:bg-[#c9a398]'
            >
              Continue to Payment
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ShippingPage;