import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

import { addToCart, removeFromCart } from '../slices/cartSlice';
import Meta from '../components/Meta';
import Message from '../components/Message';
import { addCurrency } from '../utils/addCurrency';
import { BASE_URL } from '../constants';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <>
      <Meta title="Shopping Cart" />

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Title */}
        <h1 className="text-3xl font-light mb-8 text-[#3d342f]">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2">

            {cartItems.length === 0 && (
              <Message>
                Your cart is empty 👉 <Link to="/" className="text-blue-600 underline">Go Back</Link>
              </Message>
            )}

            <div className="space-y-6">
              {cartItems.map(item => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4"
                >

                  {/* IMAGE */}
                  <img
                    src={`${BASE_URL}${item.image}`}
                    alt={item.name}
                    className="w-24 h-24 object/-cover rounded"
                  />

                  {/* NAME */}
                  <Link
                    to={`/product/${item._id}`}
                    className="flex-1 text-sm font-medium text-gray-800 hover:text-black"
                  >
                    {item.name}
                  </Link>

                  {/* PRICE */}
                  <div className="w-24 text-gray-600">
                    {addCurrency(item.price)}
                  </div>

                  {/* QUANTITY */}
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                    className="border px-2 py-1 rounded"
                  >
                    {[...Array(item.countInStock).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromCartHandler(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>

                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE (SUMMARY) */}
          <div className="border rounded p-6 h-fit bg-white shadow-sm">

            <h2 className="text-xl font-medium mb-4">
              Cart Summary
            </h2>

            <p className="text-gray-700 mb-4">
              Subtotal (
              {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              ) items
            </p>

            <p className="text-lg font-semibold mb-6">
              {addCurrency(
                cartItems.reduce(
                  (acc, item) => acc + item.qty * item.price,
                  0
                )
              )}
            </p>

            <button
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 text-sm uppercase tracking-wide disabled:opacity-50"
            >
              Proceed To Checkout
            </button>

          </div>

        </div>
      </div>
    </>
  );
};

export default CartPage;