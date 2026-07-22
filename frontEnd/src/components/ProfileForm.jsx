import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { setCredentials } from '../slices/authSlice';
import { useProfileMutation } from '../slices/usersApiSlice';
import Loader from './Loader';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { userInfo } = useSelector(state => state.auth);

  const [updateProfile, { isLoading }] = useProfileMutation();

  const dispatch = useDispatch();

  const submitHandler = async e => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        return toast.error('Passwords do not match!');
      }

      const res = await updateProfile({
        name,
        email,
        password
      }).unwrap();

      dispatch(setCredentials({ ...res }));

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
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

      {/* Password */}
      <div>
        <label className='mb-2 block text-sm font-medium text-gray-700'>
          Password
        </label>

        <div className='relative'>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter password'
            className='w-full rounded-lg border px-4 py-3 pr-10 outline-none focus:border-yellow-500'
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500'
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className='mb-2 block text-sm font-medium text-gray-700'>
          Confirm Password
        </label>

        <div className='relative'>
          <input
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='Confirm password'
            className='w-full rounded-lg border px-4 py-3 pr-10 outline-none focus:border-yellow-500'
          />

          <span
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500'
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
      </div>

      {/* Submit */}
      <button
        type='submit'
        className='w-full rounded-lg bg-[#d9b8ae] hover:bg-[#c7a095] py-3 font-semibold text-white  transition'
      >
        Update Profile
      </button>

      {isLoading && <Loader />}
    </form>
  );
};

export default ProfileForm;