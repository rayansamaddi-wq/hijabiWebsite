import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import {
  useGetUsersQuery,
  useDeleteUserMutation
} from '../../slices/usersApiSlice';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Meta from '../../components/Meta';

const UserListPage = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();

console.log(users);
console.log(error);

  const [deleteUser, { isLoading: isDeleteLoading }] =
    useDeleteUserMutation();

  const deleteHandler = async userId => {
    try {
      const res = await deleteUser(userId).unwrap();
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className='space-y-6'>

      <Meta title={'User List'} />

      {/* Header */}
      <h2 className='text-2xl font-bold text-gray-800'>
        Users
      </h2>

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
                <th className='p-3'>EMAIL</th>
                <th className='p-3 text-center'>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {users?.map(user => (
                <tr
                  key={user._id}
                  className='border-t hover:bg-gray-50 transition'
                >
                  <td className='p-3 text-xs text-gray-500'>
                    {user._id}
                  </td>

                  <td className='p-3 font-medium'>
                    {user.name}
                  </td>

                  <td className='p-3'>
                    {user.email}
                  </td>

                  <td className='p-3'>
                    <div className='flex items-center justify-center gap-3'>

                      <Link
                        to={`/admin/user/update/${user._id}`}
                        className='rounded-md bg-gray-100 p-2 hover:bg-gray-200'
                      >
                        <FaEdit />
                      </Link>

                      <button
                        onClick={() => deleteHandler(user._id)}
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

export default UserListPage;