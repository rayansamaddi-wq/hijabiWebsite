import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminHeader = () => {
  const { userInfo } = useSelector(state => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <header className='fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50'>
      <div className='flex items-center justify-between px-4 py-3 md:px-6'>
        
        {/* Brand */}
        <Link
          to='/admin/dashboard'
          className='text-lg font-bold tracking-wide'
        >
          MERN Shop Admin
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className='md:hidden text-white text-2xl'
        >
          ☰
        </button>

        {/* Desktop nav */}
        <div className='hidden md:flex items-center gap-6'>
          <span className='text-sm text-gray-300'>
            Hello, 👋 {userInfo?.name}
          </span>

          <AdminSidebar />
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className='md:hidden bg-gray-800 px-4 py-3 space-y-3'>
          <p className='text-gray-300'>
            Hello, 👋 {userInfo?.name}
          </p>

          <AdminSidebar />
        </div>
      )}
    </header>
  );
};

export default AdminHeader;