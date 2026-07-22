import React from 'react';
import FormContainer from '../../components/FormContainer';
import ProfileForm from '../../components/ProfileForm';
import Meta from '../../components/Meta';

const AdminProfilePage = () => {
  return (
    <div className='min-h-screen bg-gray-100 px-4 py-10'>
      <FormContainer>
        <Meta title={'Admin Profile'} />

        <div className='w-full max-w-2xl rounded-2xl bg-white p-6 md:p-10 shadow-xl'>
          
          <h2 className='mb-6 text-2xl font-bold text-gray-800'>
            Admin Profile
          </h2>

          <ProfileForm />
        </div>
      </FormContainer>
    </div>
  );
};

export default AdminProfilePage;