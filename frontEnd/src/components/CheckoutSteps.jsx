import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const steps = [
    { label: 'Sign In', path: '/login', completed: step1 },
    { label: 'Shipping', path: '/shipping', completed: step2 },
    { label: 'Payment', path: '/payment', completed: step3 },
    { label: 'Place Order', path: '/place-order', completed: step4 },
  ];

  return (
    <div className='mb-8 w-full'>
      <div className='mx-auto flex max-w-3xl items-center justify-between gap-2'>
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            {/* Step */}
            <div className='flex flex-col items-center'>
              {step.completed ? (
                <Link
                  to={step.path}
                  className='flex h-9 w-9 items-center justify-center rounded-full bg-[#d9b8ae] text-sm font-medium text-white transition hover:bg-[#c9a398]'
                >
                  {index + 1}
                </Link>
              ) : (
                <span className='flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-400'>
                  {index + 1}
                </span>
              )}

              {step.completed ? (
                <Link
                  to={step.path}
                  className='mt-2 whitespace-nowrap text-xs font-medium text-[#3d342f] transition hover:text-[#c9a398]'
                >
                  {step.label}
                </Link>
              ) : (
                <span className='mt-2 whitespace-nowrap text-xs font-medium text-gray-400'>
                  {step.label}
                </span>
              )}
            </div>

            {/* Line between steps */}
            {index < steps.length - 1 && (
              <div
                className={`mb-6 h-[2px] flex-1 ${
                  step.completed ? 'bg-[#d9b8ae]' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;