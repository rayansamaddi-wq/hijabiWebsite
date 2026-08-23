import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useClearCartMutation } from '../slices/cartApiSlice';

import {
  useCreateOrderMutation,
  useCreateTapChargeMutation,
} from '../slices/ordersApiSlice';

import { clearCartItems } from '../slices/cartSlice';

import Loader from '../components/Loader';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';
import { addCurrency } from '../utils/addCurrency';
import { BASE_URL } from '../constants';

const PlaceOrderPage = () => {
  const {
   cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice

} = useSelector((state) => state.cart);

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [createTapCharge, { isLoading: loadingTap }] =
    useCreateTapChargeMutation();
   const [clearCart] = useClearCartMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate('/shipping');
      return;
    }

    if (!paymentMethod) {
      navigate('/payment');
    }
  }, [shippingAddress, paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      // =========================
      // 1. CREATE ORDER FIRST
      // =========================
      console.log({
  cartItems,
  shippingAddress,
  paymentMethod,
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
});
 const order = await createOrder({
cartItems,
  shippingAddress,
  paymentMethod,
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
}).unwrap();

      // =========================
      // 💵 CASH ON DELIVERY
      // =========================
      if (paymentMethod === 'Cash on Delivery') {

  await clearCart().unwrap();

  dispatch(clearCartItems());

  navigate(`/order/${order._id}`);

  return;
}

      // =========================
      // 💳 TAP PAYMENT
      // =========================
      if (paymentMethod === 'Tap') {
        const res = await createTapCharge({
          amount: totalPrice,
          currency: 'USD',
          orderId: order._id,
          customer: {
            firstName: shippingAddress?.fullName || 'Customer',
            lastName: '',
            email: order.user?.email || order.email || 'test@example.com',
            phone: shippingAddress?.phone || '00000000',
            countryCode: '961',
          },
        }).unwrap();

        if (!res?.paymentUrl) {
          throw new Error('Payment URL not received from Tap');
        }

        // Redirect to Tap hosted checkout
        window.location.href = res.paymentUrl;
        return;
      }

      // =========================
      // 💰 WISH MONEY (placeholder)
      // =========================
    if (paymentMethod === 'Wish Money') {

  toast.info('Wish Money integration coming soon 🚧');

  await clearCart().unwrap();

  dispatch(clearCartItems());

  navigate(`/order/${order._id}`);

  return;
}

    } catch (error) {
      toast.error(
        error?.data?.message || error.error || 'Payment failed'
      );
    }
  };

  return (
    <>
      <Meta title='Place Order' />

      <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8'>
        <CheckoutSteps step1 step2 step3 step4 />

        <h1 className='mb-8 mt-10 text-3xl font-light text-[#3d342f]'>
          Place Order
        </h1>

        <div className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
          {/* LEFT */}
          <div className='space-y-6 lg:col-span-2'>
            <section className='rounded-lg border bg-white p-6 shadow-sm'>
              <h2 className='mb-4 text-xl font-medium text-[#3d342f]'>
                Shipping
              </h2>
              <p className='text-sm text-gray-700'>
                {shippingAddress?.address}, {shippingAddress?.city},{' '}
                {shippingAddress?.postalCode}, {shippingAddress?.country}
              </p>
            </section>

            <section className='rounded-lg border bg-white p-6 shadow-sm'>
              <h2 className='mb-4 text-xl font-medium text-[#3d342f]'>
                Payment Method
              </h2>
              <p className='text-sm text-gray-700'>{paymentMethod}</p>
            </section>

            <section className='rounded-lg border bg-white p-6 shadow-sm'>
              <h2 className='mb-5 text-xl font-medium text-[#3d342f]'>
                Order Items
              </h2>

              {cartItems.map((item) => (
                <div key={item._id} className='flex gap-4 py-3'>
                  <img
                 src={`${BASE_URL}${item.image}`}
                    className='h-20 w-20 object-cover'
                    alt={item.name}
                  />

                  <Link to={`/product/${item._id}`} className='flex-1'>
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
      <span>{addCurrency(itemsPrice)}</span>
    </div>

    <div className='flex justify-between border-t pt-3 font-bold'>
      <span>Total</span>
      <span>{addCurrency(totalPrice)}</span>
    </div>

  </div>

  <button
    onClick={placeOrderHandler}
    disabled={isLoading || loadingTap}
    className='mt-6 w-full rounded-md bg-[#d9b8ae] py-3 text-white'
  >
    {isLoading || loadingTap
      ? 'Processing...'
      : 'Place Order'}
  </button>

  {(isLoading || loadingTap) && <Loader />}

</aside>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;