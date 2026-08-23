import React, { useState } from 'react';

import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetProductDetailsQuery,
  useCreateProductReviewMutation
} from '../slices/productsApiSlice';
import { setCart, showCartAdded, hideCartAdded } from '../slices/cartSlice';
import { useAddToCartMutation } from '../slices/cartApiSlice';
import { toast } from 'react-toastify';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addCurrency } from '../utils/addCurrency';
import Reviews from '../components/Reviews';
import { BASE_URL } from '../constants';

const ProductPage = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { userInfo } = useSelector(state => state.auth);

  const {
    data: product,
    isLoading,
    error
  } = useGetProductDetailsQuery(productId);

  const [createProductReview, { isLoading: isCreateProductReviewLoading }] =
    useCreateProductReviewMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addToCartApi] = useAddToCartMutation();
const addToCartHandler = async () => {
  if (!userInfo) {
    toast.error('Please login first');
    navigate('/login');
    return;
  }

  try {
    const cart = await addToCartApi({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty,
    }).unwrap();

    dispatch(setCart(cart.cartItems));

    dispatch(showCartAdded());

    setTimeout(() => {
      dispatch(hideCartAdded());
    }, 1200);

    toast.success('Product added to cart!');
  } catch (error) {
    toast.error(error?.data?.message || error.error);
  }
};
  const submitHandler = async e => {
    e.preventDefault();
    try {
      const res = await createProductReview({
        productId,
        rating,
        comment
      });

      if (res.error) {
        toast.error(res.error?.data?.message);
      }

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }

    setRating(0);
    setComment('');
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Link
            to='/'
            className='inline-block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md mb-6'
          >
            Go Back
          </Link>

          <Meta title={product.name} description={product.description} />

          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
            
            {/* Image Section */}
            <div className='lg:col-span-5 relative'>
             <img
  src={`${BASE_URL}${product.image}`}
  alt={product.name}
  className={`w-full rounded-lg object-cover ${
    product.countInStock === 0
      ? 'opacity-60'
      : ''
  }`}
/>
              {product.countInStock === 0 && (
  <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-md font-semibold shadow">
    SOLD OUT
  </div>
)}

              <div className='hidden md:block mt-8'>
                <Reviews
                  product={product}
                  userInfo={userInfo}
                  rating={rating}
                  laoding={isCreateProductReviewLoading}
                  setRating={setRating}
                  comment={comment}
                  setComment={setComment}
                  submitHandler={submitHandler}
                />
              </div>
            </div>

            {/* Product Details */}
            <div className='lg:col-span-4'>
              <div className='space-y-6'>
                <div>
                  <h3 className='text-3xl font-semibold'>{product.name}</h3>
                </div>

                <div>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </div>

                <div className='text-lg font-medium'>
                  Price: {addCurrency(product.price)}
                </div>

                <div>
                  <strong className='block mb-2'>About this item:</strong>
                  <p className='text-gray-700'>{product.description}</p>
                </div>
              </div>
            </div>

            {/* Card */}
            <div className='lg:col-span-3'>
              <div className='border rounded-lg shadow-sm overflow-hidden'>
                <div className='divide-y'>
                  
                  <div className='p-4 flex justify-between items-center'>
                    <span>Price:</span>
                    <strong>{addCurrency(product.price)}</strong>
                  </div>

                  <div className='p-4 flex justify-between items-center'>
                    <span>Status:</span>
                   <span
  className={`font-medium ${
    product.countInStock > 0
      ? 'text-green-600'
      : 'text-red-600'
  }`}
>
  {product.countInStock > 0
    ? 'In Stock'
    : 'Sold Out'}
</span>
                  </div>

                  {product.countInStock > 0 && (
                    <div className='p-4 flex justify-between items-center gap-4'>
                      <span>Qty:</span>

                      <select
                        value={qty}
                        onChange={e => setQty(Number(e.target.value))}
                        className='border rounded-md px-3 py-2 w-24'
                      >
                        {Array.from(
                          { length: product.countInStock },
                          (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  )}

                  <div className='p-4'>
                    <button
  className='w-full bg-[#d9b8ae] hover:bg-[#c7a095] transition-colors py-3 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed'
  type='button'
  disabled={product.countInStock === 0}
  onClick={addToCartHandler}
>
  {product.countInStock > 0
    ? 'Add To Cart'
    : 'Sold Out'}
</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Reviews */}
          <div className='block md:hidden mt-10'>
            <Reviews
              product={product}
              userInfo={userInfo}
              rating={rating}
              laoding={isCreateProductReviewLoading}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              submitHandler={submitHandler}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductPage;