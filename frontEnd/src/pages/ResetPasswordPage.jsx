import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useResetPasswordMutation } from '../slices/usersApiSlice';
import Meta from '../components/Meta';
import { useParams } from 'react-router-dom';
import Message from '../components/Message';

const ResetPasswordPage = () => {
  const { id: userId, token } = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }

      const res = await resetPassword({ userId, token, password }).unwrap();

      setPassword('');
      setConfirmPassword('');
      setMessage(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <Meta title={'Reset Password'} />

      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Reset Password
        </h1>

        {message && <Message>{message}</Message>}

        <form onSubmit={submitHandler} className="space-y-4">
          
          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">
              Password
            </label>

            <div className="flex items-center border rounded-lg overflow-hidden">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 bg-[#d9b8ae] text-white  hover:text-black"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 font-medium">
              Confirm Password
            </label>

            <div className="flex items-center border rounded-lg overflow-hidden">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 outline-none"
              />

              <button
                type="button"
                onClick={() => setConfirmShowPassword(!showConfirmPassword)}
                className="px-3 text-gray-600 hover:text-black"
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#d9b8ae] hover:bg-[#6d564b] text-white font-semibold py-2 rounded-lg transition"
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;