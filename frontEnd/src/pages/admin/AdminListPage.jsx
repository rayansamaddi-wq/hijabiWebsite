import React from 'react';
import Meta from '../../components/Meta';
import { useAdminsQuery } from '../../slices/usersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminListPage = () => {
  const { data: admins, isLoading, error } = useAdminsQuery({});

  return (
    <div className='space-y-6'>
      <Meta title={'Admin List'} />

      {/* Header */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <h1 className='text-2xl font-bold text-gray-800'>Admins</h1>

        <Link
          to='/admin/create'
          className='inline-flex items-center justify-center rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600 transition'
        >
          Add Admin
        </Link>
      </div>

      {/* Content */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className='overflow-x-auto rounded-xl bg-white shadow-md'>
          <table className='min-w-full text-sm text-left text-gray-700'>
            <thead className='bg-gray-100 text-xs uppercase text-gray-600'>
              <tr>
                <th className='px-4 py-3'>ID</th>
                <th className='px-4 py-3'>Name</th>
                <th className='px-4 py-3'>Email</th>
                <th className='px-4 py-3 text-center'>Actions</th>
              </tr>
            </thead>

            <tbody>
              {admins?.map(admin => (
                <tr
                  key={admin._id}
                  className='border-b hover:bg-gray-50 transition'
                >
                  <td className='px-4 py-3 text-xs text-gray-500'>
                    {admin._id}
                  </td>

                  <td className='px-4 py-3 font-medium'>
                    {admin.name}
                  </td>

                  <td className='px-4 py-3'>
                    {admin.email}
                  </td>

                  <td className='px-4 py-3'>
                    <div className='flex items-center justify-center gap-2'>
                      <Link
                        to={`/admin/user/update/${admin._id}`}
                        className='rounded-md bg-gray-100 p-2 text-gray-700 hover:bg-gray-200'
                      >
                        <FaEdit />
                      </Link>

                      <button
                        className='rounded-md bg-gray-100 p-2 text-red-500 hover:bg-red-100'
                        onClick={() => {}}
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

export default AdminListPage;