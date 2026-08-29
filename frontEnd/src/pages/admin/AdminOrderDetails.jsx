import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useUpdateDeliverMutation,
} from '../slices/ordersApiSlice';

import Loader from '../components/Loader';
import Message from '../components/Message';
import { addCurrency } from '../utils/addCurrency';
import { BASE_URL } from '../constants';


const AdminOrderDetails = () => {

  const { id: orderId } = useParams();


  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);


  const [payOrder, { isLoading: loadingPay }] =
    usePayOrderMutation();


  const [updateDeliver, { isLoading: loadingDeliver }] =
    useUpdateDeliverMutation();



  const markPaidHandler = async () => {

    try {

      await payOrder(orderId).unwrap();

      toast.success('Order marked as paid');

      refetch();

    } catch (error) {

      toast.error(
        error?.data?.message ||
        error.error
      );

    }

  };



  const markDeliveredHandler = async () => {

    try {

      await updateDeliver(orderId).unwrap();

      toast.success('Order marked as delivered');

      refetch();

    } catch (error) {

      toast.error(
        error?.data?.message ||
        error.error
      );

    }

  };



  if (isLoading) {
    return <Loader />;
  }


  if (error) {

    return (
      <Message variant="danger">
        {error?.data?.message || error.error}
      </Message>
    );

  }



  return (

    <div className="mx-auto max-w-7xl px-4 py-10">

      <Link
        to="/admin/orders"
        className="inline-block mb-6 rounded-md bg-gray-100 px-4 py-2 hover:bg-gray-200"
      >
        Go Back
      </Link>



      <h1 className="mb-8 text-3xl font-semibold">
        Order #{order._id}
      </h1>




      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">



        {/* LEFT SIDE */}

        <div className="lg:col-span-2 space-y-6">



          {/* Customer */}

          <div className="rounded-lg border p-6 shadow-sm">

            <h2 className="mb-4 text-xl font-semibold">
              Customer
            </h2>


            <p>
              <strong>Name:</strong>{" "}
              {order.user?.name}
            </p>


            <p>
              <strong>Email:</strong>{" "}
              {order.user?.email}
            </p>


          </div>




          {/* Shipping */}

          <div className="rounded-lg border p-6 shadow-sm">

            <h2 className="mb-4 text-xl font-semibold">
              Shipping
            </h2>


            <p>
              {order.shippingAddress.address},
              {" "}
              {order.shippingAddress.city},
              {" "}
              {order.shippingAddress.postalCode},
              {" "}
              {order.shippingAddress.country}
            </p>



            {order.isDelivered ? (

              <p className="mt-3 font-medium text-green-600">
                Delivered on{" "}
                {new Date(
                  order.deliveredAt
                ).toLocaleDateString()}
              </p>

            ) : (

              <p className="mt-3 font-medium text-red-600">
                Not Delivered
              </p>

            )}


          </div>





          {/* Order Items */}

          <div className="rounded-lg border p-6 shadow-sm">

            <h2 className="mb-4 text-xl font-semibold">
              Order Items
            </h2>



            <div className="space-y-4">


              {order.orderItems.map((item,index)=>(

                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-4"
                >


                  <div className="flex items-center gap-4">


                    <img
                      src={`${BASE_URL}${item.image}`}
                      alt={item.name}
                      className="h-20 w-20 rounded-md object-cover"
                    />


                    <div>

                      <p className="font-medium">
                        {item.name}
                      </p>


                      <p>
                        Qty: {item.qty}
                      </p>

                    </div>


                  </div>



                  <p className="font-semibold">
                    {addCurrency(
                      item.price * item.qty
                    )}
                  </p>



                </div>

              ))}


            </div>


          </div>



        </div>





        {/* RIGHT SIDE */}

        <div className="space-y-6">



          {/* Payment */}

          <div className="rounded-lg border p-6 shadow-sm">


            <h2 className="mb-4 text-xl font-semibold">
              Payment
            </h2>


            <p>
              <strong>Method:</strong>{" "}
              {order.paymentMethod}
            </p>



            {order.isPaid ? (

              <p className="mt-3 font-medium text-green-600">
                Paid on{" "}
                {new Date(
                  order.paidAt
                ).toLocaleDateString()}
              </p>


            ) : (

              <>

                <p className="mt-3 font-medium text-red-600">
                  Not Paid
                </p>



                {order.paymentMethod ===
                  "Cash on Delivery" && (

                  <button
                    onClick={markPaidHandler}
                    disabled={loadingPay}
                    className="mt-4 w-full rounded-md bg-green-600 py-3 text-white disabled:opacity-50"
                  >
                    Mark As Paid
                  </button>

                )}


              </>

            )}



          </div>





          {/* Delivery */}

          <div className="rounded-lg border p-6 shadow-sm">


            <h2 className="mb-4 text-xl font-semibold">
              Delivery
            </h2>



            {order.isDelivered ? (

              <p className="font-medium text-green-600">
                Delivered
              </p>

            ) : (

              <>

                <p className="mb-4 font-medium text-red-600">
                  Not Delivered
                </p>


                <button
                  onClick={markDeliveredHandler}
                  disabled={loadingDeliver}
                  className="w-full rounded-md bg-[#d9b8ae] py-3 font-medium text-white disabled:opacity-50"
                >
                  Mark Delivered
                </button>


              </>

            )}



          </div>





          {/* Summary */}

          <div className="rounded-lg border p-6 shadow-sm">


            <h2 className="mb-4 text-xl font-semibold">
              Order Summary
            </h2>



            <p>
              Items:
              {" "}
              {addCurrency(order.itemsPrice)}
            </p>


            <p>
              Shipping:
              {" "}
              {addCurrency(order.shippingPrice)}
            </p>


            <p>
              Tax:
              {" "}
              {addCurrency(order.taxPrice)}
            </p>


            <hr className="my-3"/>


            <p className="text-xl font-bold">
              Total:
              {" "}
              {addCurrency(order.totalPrice)}
            </p>


          </div>



        </div>


      </div>


    </div>

  );
};


export default AdminOrderDetails;