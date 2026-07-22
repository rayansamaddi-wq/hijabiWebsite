import React from 'react';
import { Link } from 'react-router-dom';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import { addCurrency } from '../utils/addCurrency';
import Loader from './Loader';
import Message from './Message';

const ProductCarousel = () => {
  const { data: products } = useGetTopProductsQuery();

  return (
    <div className='relative mb-5 overflow-hidden bg-gray-600 text-center'>
      {products?.map(product => (
        <div key={product._id} className='relative'>
          <Link to={`/product/${product._id}`}>
            <img
             src={`http://localhost:5000${product.image}`}
              alt={product.name}
             
  className='w-full max-w-[400px] h-auto object-cover'
            />

            <div className='absolute bottom-0 left-0 w-full px-5 pb-5 text-white bg-black/40'>
              <h3 className='product-title text-2xl font-semibold'>
                {product.name}
              </h3>

              <h1 className='text-4xl font-bold'>
                {addCurrency(product.price)}
              </h1>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductCarousel;