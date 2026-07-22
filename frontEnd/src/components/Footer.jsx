import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-black py-4 text-white'>
      <div className='mx-auto max-w-7xl px-4'>
        <p className='text-center text-sm md:text-base'>
          MERN Shop &copy; {currentYear}
        </p>
      </div>
    </footer>
  );
};

export default Footer;