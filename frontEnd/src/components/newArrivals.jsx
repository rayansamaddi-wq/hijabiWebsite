import React from 'react';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const NewArrivalsSection = () => {
  const { data: products, isLoading, error } = useGetProductsQuery({
    limit: 6,
    skip: 0,
    search: '',
  });

  if (isLoading) {
    return (
      <section className='py-20 text-center'>
        <p className='text-gray-500'>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className='py-20 text-center'>
        <p className='text-red-500'>Something went wrong</p>
      </section>
    );
  }

  return (
    <section className='bg-[#f8f6f4] px-6 py-24'>
      <div className='mx-auto max-w-6xl text-center'>
        {/* Heading */}
        <h2 className='text-3xl font-light tracking-wide text-[#3d342f] md:text-4xl'>
          Check our newest Hijabs
        </h2>

        <p className='mx-auto mb-16 mt-3 max-w-xl text-sm text-gray-500'>
          Discover our latest elegant arrivals crafted for modern modest fashion.
        </p>

        {/* Products Grid */}
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3'>
          {products?.slice(0, 6).map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className='group block cursor-pointer text-left'
            >
              {/* Image */}
              <div className='overflow-hidden bg-[#ddd]'>
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  className='h-[420px] w-full object-cover transition duration-500 group-hover:scale-105'
                />
              </div>

              {/* Product Info */}
              <div className='mt-5 transition-transform duration-300 group-hover:translate-x-1'>
                <h3 className='text-[11px] uppercase tracking-[0.25em] text-[#4b403a]'>
                  {product.name}
                </h3>

                <p className='mt-2 text-sm text-gray-500'>
                  ${product.price}
                </p>

                {/* Appears only when hovering */}
                <p className='mt-3 text-xs uppercase tracking-[0.2em] text-[#b8877c] opacity-0 transition duration-300 group-hover:opacity-100'>
                  View Product →
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Shop button */}
        <Link
          to='/category-page'
          className='mt-16 inline-block bg-[#d9b8ae] px-8 py-3 text-xs uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-[#c7a095]'
        >
          Shop Hijabs
        </Link>
      </div>
    </section>
  );
};

export default NewArrivalsSection;