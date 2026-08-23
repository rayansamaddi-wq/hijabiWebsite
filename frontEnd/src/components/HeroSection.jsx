import React from 'react';
import { Link } from 'react-router-dom';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import { BASE_URL } from '../constants';

const HeroSection = () => {
  const { data: products, isLoading } = useGetTopProductsQuery();

  const heroProduct = products?.[0];

  if (isLoading || !heroProduct) {
    return (
      <div className='h-screen flex items-center justify-center bg-[#f3eee8] text-[#4a3d36] text-xl'>
        Loading...
      </div>
    );
  }

  return (
    <section className='relative w-full h-[90vh] overflow-hidden bg-[#4a3d36]'>

      {/* CLICKABLE IMAGE (same pattern as your NewArrivalsSection) */}
      <Link to={`/product/${heroProduct._id}`}>
        <img
          src={`${BASE_URL}${heroProduct.image}`}
          alt={heroProduct.name}
          className='absolute right-0 top-0 h-full w-full object-cover lg:object-contain object-right 
                     transition duration-500 hover:scale-[1.02] cursor-pointer'
        />
      </Link>

      {/* OVERLAY */}
      <div className='absolute inset-0 bg-black/30'></div>

      {/* CONTENT */}
      <div className='relative z-10 h-full flex items-center'>
        <div className='w-full max-w-7xl mx-auto px-6 md:px-16'>

          <div className='max-w-xl text-white'>

            <h1 className='text-4xl sm:text-5xl md:text-6xl font-light leading-tight tracking-wide'>
              Elevating modesty
              <br />
              and empowering
              <br />
              the hijab
            </h1>

            <p className='mt-6 text-sm md:text-base text-white/80 tracking-wide'>
              Wear it like the queen you are
            </p>

            {/* OPTIONAL: make button also go to product */}
            <Link to='/category-page'>
              <button className='mt-8 bg-[#d9b8ae] hover:bg-[#6d564b] transition-all duration-300 text-xs uppercase tracking-[4px] px-8 py-4 cursor-pointer'>
                Shop Now
              </button>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;