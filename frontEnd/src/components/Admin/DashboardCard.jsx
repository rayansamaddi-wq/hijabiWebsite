import React from 'react';

const DashboardCard = ({ title, icon, value, bgColor }) => {
  return (
    <div
      className={`mb-3 p-4 rounded-lg text-white shadow flex items-center justify-between ${bgColor}`}
    >
      {/* Icon */}
      <div className="text-3xl flex items-center justify-center w-1/3">
        {icon}
      </div>

      {/* Content */}
      <div className="w-2/3 text-right">
        <h3 className="text-sm font-medium opacity-90">{title}</h3>
        <h2 className="text-xl font-bold">{value}</h2>
      </div>
    </div>
  );
};

export default DashboardCard;