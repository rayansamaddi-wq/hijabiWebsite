import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  useUpdateUserMutation,
  useGetUserByIdQuery
} from '../../slices/usersApiSlice';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Meta from '../../components/Meta';

const UpdateUserFormPage = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, error } = useGetUserByIdQuery(userId);

  const [updateUser, { isLoading: isUpdateLoading }] =
    useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async e => {
    e.preventDefault();

    try {
      const res = await updateUser({
        userId,
        name,
        email,
        isAdmin
      }).unwrap();

      toast.success(res.message);
      navigate('/admin/user-list');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 px-4 py-8'>

      <Meta title={'Update User'} />

      {/* Back button */}
      <Link
        to='/admin/user-list'
        className='inline-block rounded-lg bg-white px-4 py-2 text-sm shadow hover:bg-gray-100 transition'
      >
        ← Go Back
      </Link>

      {(isUpdateLoading || isLoading) && <Loader />}

      {error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className='mx-auto mt-6 w-full max-w-xl rounded-2xl bg-white p-6 md:p-10 shadow-xl'>

          <Meta title={'Update User'} />

          <h1 className='mb-8 text-2xl font-bold text-gray-800'>
            Update User
          </h1>

          <form onSubmit={submitHandler} className='space-y-5'>

            {/* Name */}
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Name
              </label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                type='text'
                placeholder='Enter name'
                className='w-full rounded-lg border px-4 py-3 outline-none focus:border-yellow-500'
              />
            </div>

            {/* Email */}
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Email address
              </label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type='email'
                placeholder='Enter email'
                className='w-full rounded-lg border px-4 py-3 outline-none focus:border-yellow-500'
              />
            </div>

            {/* Admin checkbox */}
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
                className='h-4 w-4 accent-yellow-500'
              />
              <label className='text-sm text-gray-700'>
                Is Admin
              </label>
            </div>

            {/* Submit */}
            <button
              type='submit'
              className='w-full rounded-lg bg-yellow-500 py-3 font-semibold text-white hover:bg-yellow-600 transition'
            >
              Update
            </button>

          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUserFormPage;