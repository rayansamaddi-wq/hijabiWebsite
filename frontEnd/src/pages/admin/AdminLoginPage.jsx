import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';

import FormContainer from '../../components/FormContainer';
import Meta from '../../components/Meta';
import Footer from '../../components/Footer';
import Loader from '../../components/Loader';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/admin/dashboard';

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async e => {
    e.preventDefault();

    try {
      const res = await login({ email, password, remember }).unwrap();

      dispatch(setCredentials({ ...res }));

      navigate('/admin/dashboard');

      toast.success('Login successful');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Meta title={'Admin Sign In'} />

      <main className='min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4'>
        <FormContainer>
          <div className='w-full max-w-md rounded-2xl bg-white p-6 md:p-10 shadow-xl'>
            <h1 className='mb-8 text-center text-3xl font-bold text-gray-800'>
              Sign In
            </h1>

            <form onSubmit={submitHandler}>
              {/* Email */}
              <div className='mb-5'>
                <label
                  htmlFor='email'
                  className='mb-2 block text-sm font-medium text-gray-700'
                >
                  Email Address
                </label>

                <input
                  type='email'
                  id='email'
                  value={email}
                  placeholder='Enter email'
                  onChange={e => setEmail(e.target.value)}
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-yellow-500'
                />
              </div>

              {/* Password */}
              <div className='mb-5'>
                <label
                  htmlFor='password'
                  className='mb-2 block text-sm font-medium text-gray-700'
                >
                  Password
                </label>

                <div className='flex items-center overflow-hidden rounded-lg border border-gray-300 focus-within:border-yellow-500'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    value={password}
                    placeholder='Enter password'
                    onChange={e => setPassword(e.target.value)}
                    className='w-full px-4 py-3 outline-none'
                  />

                  <button
                    type='button'
                    onClick={togglePasswordVisibility}
                    className='px-4 text-gray-600'
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className='mb-6 flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='remember'
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className='h-4 w-4 accent-yellow-500'
                />

                <label
                  htmlFor='remember'
                  className='text-sm text-gray-700'
                >
                  Keep me signed in
                </label>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={isLoading}
                className='w-full rounded-lg bg-yellow-500 py-3 font-semibold text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-70'
              >
                {isLoading ? <Loader /> : 'Sign In'}
              </button>
            </form>
          </div>
        </FormContainer>
      </main>

      <Footer />
    </>
  );
};

export default AdminLoginPage;