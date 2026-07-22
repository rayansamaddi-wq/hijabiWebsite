import React from 'react';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useGetProductsQuery, useDeleteProductMutation } from '../../slices/productsApiSlice';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Meta from '../../components/Meta';
import { addCurrency } from '../../utils/addCurrency';

const ProductListPage = () => {
  const { data, isLoading, error } = useGetProductsQuery({});

  const [deleteProduct, { isLoading: isDeleteLoading }] =
    useDeleteProductMutation();

  const deleteHandler = async (productId) => {
    try {
      const res = await deleteProduct(productId).unwrap();
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className='space-y-6'>

      <Meta title={'Product List'} />

      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-gray-800'>
          Products
        </h1>

        <Link
          to='/admin/product/create'
          className='rounded-lg bg-yellow-500 px-4 py-2 text-white font-medium hover:bg-yellow-600 transition'
        >
          + Add Product
        </Link>
      </div>

      {isDeleteLoading && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className='overflow-x-auto rounded-xl bg-white shadow-md'>
          <table className='w-full text-sm text-left'>
            <thead className='bg-gray-100 text-gray-700'>
              <tr>
                <th className='p-3'>ID</th>
                <th className='p-3'>NAME</th>
                <th className='p-3'>PRICE</th>
                <th className='p-3'>CATEGORY</th>
                <th className='p-3'>BRAND</th>
                <th className='p-3 text-center'>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {data?.map(product => (
                <tr
                  key={product._id}
                  className='border-t hover:bg-gray-50 transition'
                >
                  <td className='p-3 text-xs text-gray-500'>
                    {product._id}
                  </td>

                  <td className='p-3 font-medium'>
                    {product.name}
                  </td>

                  <td className='p-3'>
                    {addCurrency(product.price)}
                  </td>

                  <td className='p-3'>
                    {product.category}
                  </td>

                  <td className='p-3'>
                    {product.brand}
                  </td>

                  <td className='p-3'>
                    <div className='flex items-center justify-center gap-3'>

                      <Link
                        to={`/admin/product/update/${product._id}`}
                        className='rounded-md bg-gray-100 p-2 hover:bg-gray-200'
                      >
                        <FaEdit />
                      </Link>

                      <button
                        onClick={() => deleteHandler(product._id)}
                        className='rounded-md bg-gray-100 p-2 text-red-500 hover:bg-red-100'
                      >
                        <FaTrash />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;