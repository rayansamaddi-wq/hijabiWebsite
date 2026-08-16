import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { clearCartItems } from '../slices/cartSlice';

import { toast } from 'react-toastify';


const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { cartItems, cartAdded } = useSelector(
    (state) => state.cart
  );

  const { userInfo } = useSelector(
    (state) => state.auth
  );


  const [logoutApiCall] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();



  const logoutHandler = async () => {

    try {

      // logout from backend
      await logoutApiCall().unwrap();


      // IMPORTANT:
      // remove previous user's cart
      dispatch(clearCartItems());


      // remove user information
      dispatch(logout());


      navigate('/login');


      toast.success('Logout successful');


    } catch (error) {

      toast.error(
        error?.data?.message || error.error
      );

    }

  };



  return (

    <nav className="bg-white text-black fixed top-0 left-0 w-full z-50">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center h-16">


          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-bold"
          >
            Hijabi Shop
          </Link>



          {/* Mobile Toggle */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>



          <div
            className={`${isOpen ? 'block' : 'hidden'} md:flex items-center gap-4`}
          >



            {/* Cart */}

            <Link
              to="/cart"
              className="relative inline-flex items-center gap-1 text-sm text-[#3d342f]"
            >

              Cart


              {
                cartItems.length > 0 && (

                  <span
                    className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d9b8ae] px-1 text-[10px] text-white"
                  >

                    {
                      cartItems.reduce(
                        (total,item)=> total + item.qty,
                        0
                      )
                    }

                  </span>

                )
              }



              {
                cartAdded && (

                  <span
                    className="absolute -right-5 -top-5 animate-cart-added text-sm font-bold text-red-500"
                  >
                    +1
                  </span>

                )
              }


            </Link>





            {/* Orders */}

            <Link
              to="/my-orders"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              My Orders
            </Link>





            {/* User */}

            {
              userInfo ? (

                <div className="relative">


                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="hover:text-gray-300"
                  >

                    Hello 👋, {userInfo.name}

                  </button>




                  {
                    dropdownOpen && (

                      <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg">


                        <Link
                          to="/Profile-page"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Profile
                        </Link>




                        <button

                          onClick={logoutHandler}

                          className="bg-white w-full text-left px-4 py-2 hover:bg-gray-100"

                        >

                          Logout

                        </button>



                      </div>

                    )
                  }


                </div>


              ) : (


                <Link
                  to="/login"
                  className="flex items-center gap-1 hover:text-gray-300"
                >

                  <FaUser />

                  Sign In

                </Link>


              )

            }



          </div>


        </div>

      </div>


    </nav>


  );

};


export default Header;