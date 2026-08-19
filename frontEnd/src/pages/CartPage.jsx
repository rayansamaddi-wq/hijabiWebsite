import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

import Meta from '../components/Meta';
import Message from '../components/Message';

import { addCurrency } from '../utils/addCurrency';
import { BASE_URL } from '../constants';

import {
  setCart,
  showCartAdded,
  hideCartAdded,
} from '../slices/cartSlice';

import {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveCartItemMutation,
} from '../slices/cartApiSlice';


import { toast } from 'react-toastify';


const CartPage = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();


  const { userInfo } = useSelector(
    state => state.auth
  );


  const { cartItems } = useSelector(
    state => state.cart
  );


  // Load user cart from MongoDB
  const {
    data: cart,
    isLoading,
    error,
  } = useGetCartQuery(undefined, {
    skip: !userInfo,
  });



  const [addToCartApi] = useAddToCartMutation();


  const [
    removeCartItemApi
  ] = useRemoveCartItemMutation();



  useEffect(() => {

    if(cart){

      dispatch(
        setCart(cart.cartItems)
      );

    }

  }, [cart, dispatch]);




  const addToCartHandler = async(item, qty)=>{

    try{

      const updatedCart =
        await addToCartApi({

          product:item.product || item._id,

          name:item.name,

          image:item.image,

          price:item.price,

          countInStock:item.countInStock,

          qty,

        }).unwrap();



      dispatch(
        setCart(updatedCart.cartItems)
      );


      dispatch(showCartAdded());


      setTimeout(()=>{

        dispatch(hideCartAdded());

      },1200);



    }catch(error){

      toast.error(
        error?.data?.message || error.error
      );

    }

  };




  const removeFromCartHandler = async(id)=>{


    try{


      const updatedCart =
        await removeCartItemApi(id).unwrap();


      dispatch(
        setCart(updatedCart.cartItems)
      );


      toast.success(
        "Item removed"
      );


    }catch(error){


      toast.error(
        error?.data?.message || error.error
      );


    }

  };





  const checkoutHandler = ()=>{


    if(!userInfo){

      navigate(
        '/login?redirect=/shipping'
      );

    }else{


      navigate('/shipping');

    }


  };





  if(isLoading){

    return <Message>Loading cart...</Message>;

  }



  if(error){

    return (
      <Message variant="danger">

        {error?.data?.message || error.error}

      </Message>
    );

  }




  return (

    <>

      <Meta title="Shopping Cart"/>


      <div className="max-w-6xl mx-auto px-4 py-10">


        <h1 className="text-3xl font-light mb-8 text-[#3d342f]">

          Shopping Cart

        </h1>



        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">


          <div className="lg:col-span-2">



          {cartItems.length === 0 && (

            <Message>

              Your cart is empty 👉

              <Link
                to="/"
                className="text-blue-600 underline ml-2"
              >

                Go Back

              </Link>


            </Message>

          )}





          <div className="space-y-6">


          {cartItems.map(item=>(


            <div
              key={item.product || item._id}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4"
            >



              <img

                src={`${BASE_URL}${item.image}`}

                alt={item.name}

                className="w-24 h-24 object-cover rounded"

              />




              <Link

                to={`/product/${item.product || item._id}`}

                className="flex-1 text-sm font-medium text-gray-800"

              >

                {item.name}

              </Link>





              <div className="w-24 text-gray-600">

                {addCurrency(item.price)}

              </div>





              <select

                value={item.qty}

                onChange={(e)=>
                  addToCartHandler(
                    item,
                    Number(e.target.value)
                  )
                }

                className="border px-2 py-1 rounded"

              >

              {
                [...Array(item.countInStock).keys()]
                .map(x=>(

                  <option
                    key={x+1}
                    value={x+1}
                  >

                    {x+1}

                  </option>

                ))

              }


              </select>





              <button

                onClick={()=>
                  removeFromCartHandler(
                    item.product || item._id
                  )
                }

                className="text-red-500 hover:text-red-700"

              >

                <FaTrash/>

              </button>



            </div>


          ))}


          </div>


          </div>







          <div className="border rounded p-6 h-fit bg-white shadow-sm">


            <h2 className="text-xl font-medium mb-4">

              Cart Summary

            </h2>



            <p className="text-gray-700 mb-4">

              Subtotal (

              {
                cartItems.reduce(
                  (acc,item)=>acc+item.qty,
                  0
                )
              }

              ) items

            </p>




            <p className="text-lg font-semibold mb-6">

            {

              addCurrency(

                cartItems.reduce(

                  (acc,item)=>
                  acc + item.qty * item.price,

                  0

                )

              )

            }

            </p>




            <button

              onClick={checkoutHandler}

              disabled={
                cartItems.length===0
              }

              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 text-sm uppercase tracking-wide disabled:opacity-50"

            >

              Proceed To Checkout

            </button>


          </div>



        </div>



      </div>


    </>

  );

};


export default CartPage;