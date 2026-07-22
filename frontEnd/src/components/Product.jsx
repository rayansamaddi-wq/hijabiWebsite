import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCurrency } from '../utils/addCurrency';
import { addToCart } from '../slices/cartSlice';
import Rating from './Rating';
import { toast } from 'react-toastify';

const Product = ({ product }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success('Added to cart!');
  };

  return (
    <div className='my-3 rounded-lg border border-gray-200 p-3 text-center shadow-sm'>
      <Link
        to={`/product/${product._id}`}
        className='text-black no-underline'
      >
        <img
         src={`http://localhost:5000${product.image}`}
          alt={product.name}
          className='w-full max-w-[400px] h-auto object-cover'
        />

        <div className='mt-3'>
          <div className='product-title'>
            <strong>{product.name}</strong>
          </div>

          <div className='mb-3'>
            <Rating
              value={product.rating}
              text={`(${product.numReviews} reviews)`}
            />
          </div>

          <h3 className='text-2xl font-bold'>
            {addCurrency(product.price)}
          </h3>
        </div>
      </Link>

      <button
        type='button'
        disabled={product.countInStock === 0}
        onClick={addToCartHandler}
        className='mt-4 w-full rounded-md bg-[#d9b8ae] hover:bg-[#6d564b] px-4 py-2 font-semibold text-black transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50'
      >
        Add To Cart
      </button>
    </div>
  );
};

export default Product;