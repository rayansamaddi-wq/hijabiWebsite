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

      await logoutApiCall().unwrap();

      dispatch(clearCartItems());

      dispatch(logout());

      navigate('/login');

      toast.success("Logged out successfully 👋", {
  position: "bottom-right",
  autoClose: 2000,
  theme: "light",
});


    } catch (error) {

      toast.error(
        error?.data?.message || error.error
      );

    }

  };



  return (

    <nav className="bg-white text-black fixed top-0 left-0 w-full z-50 shadow-sm">


      <div className="max-w-7xl mx-auto px-4">


        <div className="flex justify-between items-center h-16">



          {/* Logo */}

          <Link
            to="/"
            className="text-xl font-bold tracking-wide"
          >
            Hijabi Shop
          </Link>




          {/* Mobile Menu Button */}

          <button

            className="md:hidden flex flex-col gap-1.5"

            onClick={() => setIsOpen(!isOpen)}

          >

            <span
              className={`w-6 h-0.5 bg-black transition ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />

            <span
              className={`w-6 h-0.5 bg-black transition ${
                isOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`w-6 h-0.5 bg-black transition ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />

          </button>





          {/* Menu */}

          <div

            className={`
              absolute md:static
              top-16 left-0
              w-full md:w-auto

              bg-white
              md:bg-transparent

              border-t md:border-none

              shadow-md md:shadow-none

              ${isOpen ? "block" : "hidden"}

              md:flex

              items-center
              gap-5

            `}

          >




            {/* Cart */}

            <Link

              to="/cart"

              onClick={() => setIsOpen(false)}

              className="
              relative
              block
              px-5 py-3
              md:px-0 md:py-0
              text-sm
              text-[#3d342f]
              hover:text-black
              "

            >

              Cart



              {
                cartItems.length > 0 && (

                  <span

                    className="
                    absolute
                    top-1 right-2
                    md:-top-3 md:-right-3

                    flex
                    h-5
                    min-w-5

                    items-center
                    justify-center

                    rounded-full

                    bg-[#d9b8ae]

                    px-1

                    text-[10px]
                    text-white
                    "

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

                    className="
                    absolute
                    -top-2
                    right-0

                    animate-cart-added

                    text-sm
                    font-bold
                    text-red-500
                    "

                  >

                    +1

                  </span>

                )
              }


            </Link>







            {/* Orders */}


            <Link

              to="/my-orders"

              onClick={() => setIsOpen(false)}

              className="
              block
              px-5 py-3
              md:px-0 md:py-0

              hover:text-gray-600

              "

            >

              My Orders

            </Link>








            {/* User */}


            {

              userInfo ? (

                <div className="relative px-5 py-3 md:px-0 md:py-0">


                  <button

                    onClick={() => setDropdownOpen(!dropdownOpen)}

                    className="hover:text-gray-600"

                  >

                    Hello 👋, {userInfo.name}

                  </button>





                  {

                    dropdownOpen && (

                      <div

                        className="
                        absolute
                        right-0

                        mt-3

                        w-44

                        bg-white

                        rounded-lg

                        shadow-lg

                        border

                        overflow-hidden

                        "

                      >



                        <Link

                          to="/Profile-page"

                          onClick={() => setIsOpen(false)}

                          className="
                          block
                          px-4
                          py-3
                          hover:bg-gray-100
                          "

                        >

                          Profile

                        </Link>





                        <button

                          onClick={logoutHandler}

                          className="
                          bg-white
                          w-full

                          text-left

                          px-4
                          py-3

                          hover:bg-gray-100

                          "

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

                  onClick={() => setIsOpen(false)}

                  className="
                  flex
                  items-center
                  gap-2

                  px-5 py-3

                  md:px-0
                  md:py-0

                  hover:text-gray-600

                  "

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