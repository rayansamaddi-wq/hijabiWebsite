import React from 'react';
import {
  FaCartShopping,
  FaCircleUser,
  FaGauge,
  FaPowerOff,
  FaUserGroup,
  FaUsers
} from 'react-icons/fa6';

import { useLogoutMutation } from '../../slices/usersApiSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());

      navigate('/admin/login');
      toast.success('Logout successful');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const linkClass =
    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-200 hover:bg-gray-800 hover:text-white transition';

  return (
    <div className='flex flex-col space-y-2 w-full'>
      <Link to='/admin/dashboard' className={linkClass}>
        <FaGauge size={16} />
        Dashboard
      </Link>

      <Link to='/admin/product-list' className={linkClass}>
        <FaCartShopping size={16} />
        Products
      </Link>

      <Link to='/admin/order-list' className={linkClass}>
        <FaUsers size={16} />
        Orders
      </Link>

      <Link to='/admin/user-list' className={linkClass}>
        <FaUserGroup size={16} />
        Users
      </Link>

      <Link to='/admin/admin-list' className={linkClass}>
        <FaUserGroup size={16} />
        Admins
      </Link>

      <Link to='/admin/profile' className={linkClass}>
        <FaCircleUser size={16} />
        Profile
      </Link>

      <button
        onClick={logoutHandler}
        className='flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-600/20 hover:text-red-300 transition'
      >
        <FaPowerOff size={16} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;