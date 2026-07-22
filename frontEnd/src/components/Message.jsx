import React from 'react';

const Message = ({ variant = 'info', children }) => {
  const baseStyle = 'p-3 rounded-lg text-sm font-medium mb-3';

  const variants = {
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`${baseStyle} ${variants[variant] || variants.info}`}>
      {children}
    </div>
  );
};

export default Message;