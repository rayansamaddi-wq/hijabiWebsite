import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const ProductPriceChart = ({ products }) => {
  return (
    <div className='mb-3 rounded-xl bg-white px-4 py-5 text-center shadow-md'>
      
      <h2 className='mb-4 text-lg font-semibold text-gray-800'>
        Product Price Chart
      </h2>

      <ResponsiveContainer width='100%' height={350}>
        <AreaChart
          data={products}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' hide />
          <YAxis />
          <Tooltip />
          <Legend />

          <Area
            type='monotone'
            dataKey='price'
            stroke='#3b82f6'
            fill='#93c5fd'
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductPriceChart;