import React from 'react';
import { Link } from 'react-router-dom';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const BestsellerSection = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return (
      <section className="py-20 text-center">
        <p className="text-gray-500">Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 text-center">
        <p className="text-red-500">Something went wrong</p>
      </section>
    );
  }

  return (
    <section className="bg-[#f8f6f4] py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-light tracking-wide text-[#3d342f]">
          Our bestsellers
        </h2>

        <p className="text-sm text-gray-500 mt-3 mb-14">
          Discover our top picks — the most loved products by our customers.
        </p>

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products?.slice(0, 2).map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="group block"
            >
              {/* Image */}
              <div className="overflow-hidden bg-[#ddd]">
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="w-full h-[520px] object-cover transition duration-500 group-hover:scale-105 cursor-pointer"
                />
              </div>

              {/* Text */}
              <div className="mt-5 text-center group-hover:translate-x-1 transition duration-300">
                <h3 className="text-xs tracking-[0.25em] text-[#4b403a] uppercase">
                  {product.name}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Button (optional link to shop page) */}
        <Link
          to="/category-page"
          className="mt-14 inline-block px-8 py-3 bg-[#d9b8ae] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#c9a398] transition duration-300"
        >
          Shop Hijabs
        </Link>

      </div>
    </section>
  );
};

export default BestsellerSection;