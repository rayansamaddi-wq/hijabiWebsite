import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector(state => state.auth);

  const { search } = useLocation();
  const redirect = new URLSearchParams(search).get('redirect') || '/';

  useEffect(() => {
    //if (userInfo) navigate(redirect);
  }, [userInfo, redirect, navigate]);

  const submitHandler = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Registration successful. Welcome!');
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
return (
  <div className="min-h-screen flex bg-[#f6f4f2]">
    
    {/* LEFT SIDE */}
    <div className="hidden md:flex w-1/2 flex-col justify-center px-16">
      <h2 className="text-sm tracking-widest text-gray-500 mb-3">
        JOIN OUR FASHION WORLD
      </h2>

      <h1 className="text-4xl font-semibold leading-snug">
        CREATE YOUR <br />
        <span className="text-yellow-500">ACCOUNT</span> <br />
        AND START SHOPPING.
      </h1>

      <p className="mt-6 text-gray-500">
        Already have an account?
      </p>

      <Link
        to={redirect ? `/login?redirect=${redirect}` : '/login'}
        className="mt-2 inline-block text-black font-medium underline"
      >
        Sign in →
      </Link>

      <div className="mt-10 rounded-2xl overflow-hidden shadow-md w-[300px]">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
          alt="fashion"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="flex w-full md:w-1/2 items-center justify-center p-6">
      <div className="relative w-full max-w-md">

        {/* Background Image */}
        <div className="rounded-3xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f"
            alt="model"
            className="w-full h-[650px] object-cover"
          />
        </div>

        {/* REGISTER CARD */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl w-[90%]">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Create your account
            </h2>

            <form onSubmit={submitHandler} className="space-y-4">

              {/* Name */}
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border-b p-2 outline-none bg-transparent"
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border-b p-2 outline-none bg-transparent"
              />

              {/* Password */}
              <div className="flex items-center border-b">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="flex-1 p-2 outline-none bg-transparent"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              {/* Confirm Password */}
              <div className="flex items-center border-b">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="flex-1 p-2 outline-none bg-transparent"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer"
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-2 rounded-full hover:opacity-90 transition"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
);
};

export default RegisterPage;