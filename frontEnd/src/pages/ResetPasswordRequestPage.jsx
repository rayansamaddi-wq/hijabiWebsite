import React, { useState } from 'react';
import { useNewPasswordRequestMutation } from '../slices/usersApiSlice';
import Meta from '../components/Meta';
import Message from '../components/Message';
import { toast } from 'react-toastify';

const ResetPasswordRequestPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [requestNewPassword, { isLoading }] =
    useNewPasswordRequestMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await requestNewPassword({ email }).unwrap();
      setMessage(res.message);
      setEmail('');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <Meta title={'Request New Password'} />

      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Request New Password
        </h1>

        {message && <Message>{message}</Message>}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">
              Email address
            </label>

            <input
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
            />
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

export default ResetPasswordRequestPage;