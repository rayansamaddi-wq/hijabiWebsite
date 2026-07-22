import React from 'react';

const FormContainer = ({ children }) => {
  return (
    <div className='w-full flex justify-center px-4'>
      <div className='w-full max-w-md md:max-w-lg lg:max-w-xl'>
        {children}
      </div>
    </div>
  );
};

export default FormContainer;