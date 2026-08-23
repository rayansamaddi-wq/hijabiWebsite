import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useGetProductsQuery,
  useGetProductCategoriesQuery
} from '../slices/productsApiSlice';

import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addCurrency } from '../utils/addCurrency';
import { BASE_URL } from '../constants';

const ProductsPage = () => {
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError
  } = useGetProductsQuery({
    limit: 50,
    skip: 0,
    search,
    category,
    sort
  });

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError
  } = useGetProductCategoriesQuery();

  return (
    <>
      <Meta title='Shop All | Pure Hijabi' />

      <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <p className='mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[#c9a398]'>
            Pure Hijabi Collection
          </p>

          <h1 className='text-3xl font-light text-[#3d342f]'>
            Shop All Products
          </h1>
        </div>

        {/* Filters */}
        <div className='mb-10 grid grid-cols-1 gap-4 rounded-lg border bg-white p-5 shadow-sm md:grid-cols-3'>
          {/* Category dropdown from backend */}
          <div>
            <label
              htmlFor='category'
              className='mb-2 block text-sm font-medium text-[#3d342f]'
            >
              Category
            </label>

            <select
              id='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={categoriesLoading}
              className='w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm outline-none focus:border-[#c9a398] disabled:cursor-not-allowed disabled:bg-gray-100'
            >
              <option value=''>
                {categoriesLoading ? 'Loading categories...' : 'All Categories'}
              </option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {categoriesError && (
              <p className='mt-2 text-xs text-red-500'>
                Could not load categories.
              </p>
            )}
          </div>

          {/* Search */}
          <div>
            <label
              htmlFor='search'
              className='mb-2 block text-sm font-medium text-[#3d342f]'
            >
              Search products
            </label>

            <input
              id='search'
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search by product name...'
              className='w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none focus:border-[#c9a398]'
            />
          </div>

          {/* Price sorting */}
          <div>
            <label
              htmlFor='sort'
              className='mb-2 block text-sm font-medium text-[#3d342f]'
            >
              Sort by price
            </label>

            <select
              id='sort'
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className='w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm outline-none focus:border-[#c9a398]'
            >
              <option value=''>Default</option>
              <option value='price-low'>Price: Low to High</option>
              <option value='price-high'>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products */}
        {productsLoading ? (
          <Loader />
        ) : productsError ? (
          <Message variant='danger'>
            {productsError?.data?.message || productsError.error}
          </Message>
        ) : (
          <>
            <p className='mb-6 text-sm text-gray-600'>
              {products.length} product{products.length !== 1 ? 's' : ''} found
            </p>

            {products.length === 0 ? (
              <div className='rounded-lg border bg-white p-10 text-center'>
                <p className='text-gray-600'>
                  No products found. Try another category or search word.
                </p>
              </div>
            ) : (
              <div className='grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4'>
                {products.map((product) => (
                  <article key={product._id} className='group'>
                    <Link to={`/product/${product._id}`} className='block'>
                      <div className='relative aspect-[3/4] overflow-hidden rounded-lg bg-[#f8f5f3]'>
                        <img
                         src={`${BASE_URL}${product.image}`}
                          alt={product.name}
                        className={`h-full w-full object-cover transition duration-300 group-hover:scale-105 ${
  product.countInStock === 0 ? 'opacity-60' : ''
}`}
                        />
                        {product.countInStock === 0 && (
  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded">
    SOLD OUT
  </div>
)}
                      </div>

                      <div className='pt-4'>
                        <h2 className='truncate text-sm font-medium text-[#3d342f]'>
                          {product.name}
                        </h2>

                        <p className='mt-2 text-sm text-gray-600'>
                          {addCurrency(product.price)}
                        </p>

                        {product.countInStock === 0 && (
  <p className="mt-1 text-sm font-medium text-red-600">
    Sold Out
  </p>
)}

                        <p className='mt-1 text-xs text-[#c9a398]'>
                          {product.category}
                        </p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProductsPage;