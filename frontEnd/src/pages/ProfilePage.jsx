import React from 'react';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import ProfileForm from '../components/ProfileForm';
import { addCurrency } from '../utils/addCurrency';

const ProfilePage = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <Meta title={'User Profile'} />

      <div className="
        grid 
        grid-cols-1 
        md:grid-cols-3 
        gap-8
      ">

        {/* Profile Section */}
        <div className="md:col-span-1">

          <h2 className="
            text-2xl 
            font-semibold 
            mb-6
            text-gray-800
          ">
            My Profile
          </h2>

          <ProfileForm />

        </div>


        {/* Orders Section */}
        <div className="md:col-span-2">

          <h2 className="
            text-2xl 
            font-semibold 
            mb-6
            text-gray-800
          ">
            My Orders
          </h2>


          {isLoading ? (
            <Loader />

          ) : error ? (

            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>

          ) : (

            <div className="
              overflow-x-auto
              rounded-lg
              shadow
              border
              border-gray-200
            ">

              <table className="
                min-w-full
                divide-y
                divide-gray-200
              ">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      ID
                    </th>

                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      DATE
                    </th>

                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      TOTAL
                    </th>

                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      PAID
                    </th>

                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      DELIVERED
                    </th>

                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      DETAILS
                    </th>

                  </tr>

                </thead>


                <tbody className="bg-white divide-y divide-gray-200">

                  {orders.map(order => (

                    <tr 
                      key={order._id}
                      className="hover:bg-gray-50"
                    >

                      <td className="
                        px-4 
                        py-3 
                        text-sm 
                        text-gray-700
                      ">
                        {order._id}
                      </td>


                      <td className="
                        px-4 
                        py-3 
                        text-sm 
                        text-gray-700
                      ">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>


                      <td className="
                        px-4 
                        py-3 
                        text-sm 
                        text-gray-700
                      ">
                        {addCurrency(order.totalPrice)}
                      </td>


                      <td className="px-4 py-3">

                        {order.isPaid ? (

                          <FaCheck className="text-green-600 text-lg" />

                        ) : (

                          <FaXmark className="text-red-600 text-lg" />

                        )}

                      </td>


                      <td className="px-4 py-3">

                        {order.isDelivered ? (

                          <FaCheck className="text-green-600 text-lg" />

                        ) : (

                          <FaXmark className="text-red-600 text-lg" />

                        )}

                      </td>


                      <td className="px-4 py-3">

                        <Link
                          to={`/order/${order._id}`}
                          className="
                            inline-block
                            px-3
                            py-1
                            rounded
                            bg-[#d9b8ae]
                            hover:bg-[#c7a095]
                            text-black
                            text-sm
                            font-medium
                            transition
                          "
                        >
                          Details
                        </Link>

                      </td>


                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default ProfilePage;