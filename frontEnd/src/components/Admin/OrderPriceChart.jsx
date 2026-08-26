import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const OrderPriceChart = ({ orders }) => {
  return (
    <div className='mb-3 rounded bg-white px-2 py-3 text-center shadow-sm'>
      <h5 className='mb-2 text-lg font-semibold'>Order Price Chart</h5>

      <ResponsiveContainer width='100%' height={350}>
        <BarChart
          data={orders}
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar
            type='monotone'
            dataKey='itemsPrice'
            fill='#7AC6E1'
            activeDot={{ r: 8 }}
          />

          <Bar
            type='monotone'
            dataKey='taxPrice'
            fill='#EB6F80'
            activeDot={{ r: 8 }}
          />

          <Bar
            type='monotone'
            dataKey='totalPrice'
            fill='#FFD949'
            activeDot={{ r: 8 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderPriceChart;
