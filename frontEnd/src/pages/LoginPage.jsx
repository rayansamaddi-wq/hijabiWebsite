import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector(state => state.auth);


  const { search } = useLocation();

  const redirect =
    new URLSearchParams(search).get('redirect') || '/';



  useEffect(() => {

    if(userInfo) {

      navigate(redirect);

    }

  }, [userInfo, redirect, navigate]);





  const submitHandler = async e => {

    e.preventDefault();


    try {

      const res = await login({
        email,
        password,
        remember
      }).unwrap();


      dispatch(setCredentials({
        ...res
      }));


      toast.success('Login successful');


      navigate(redirect);


    } catch (err) {

      toast.error(
        err?.data?.message || err.error
      );

    }

  };





  return (

    <div className="
      min-h-screen
      bg-[#f6f4f2]
      flex
      flex-col
      md:flex-row
    ">



      {/* LEFT SIDE */}

      <div className="
        w-full
        md:w-1/2

        flex
        flex-col
        justify-center

        px-6
        sm:px-10
        md:px-16

        py-10

      ">


        <h2 className="
          text-xs
          sm:text-sm
          tracking-widest
          text-gray-500
          mb-3
        ">

          LARGEST FASHION STORE

        </h2>




        <h1 className="
          text-3xl
          sm:text-4xl
          font-semibold
          leading-snug
        ">

          OFFERS POWERED <br />

          BY
          <span className="text-yellow-500">
            DESIGNERS
          </span>

          <br />

          AROUND THE WORLD.

        </h1>





        <p className="
          mt-6
          text-gray-500
        ">

          Don’t have an account?

        </p>




        <Link

          to={
            redirect
            ? `/register?redirect=${redirect}`
            : '/register'
          }

          className="
            mt-2
            inline-block
            text-black
            font-medium
            underline
          "

        >

          Create account →

        </Link>







        <div className="
          mt-10
          rounded-2xl
          overflow-hidden
          shadow-md

          w-full
          max-w-[300px]

        ">


          <img

            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"

            alt="fashion"

            className="
              w-full
              h-56
              object-cover
            "

          />


        </div>



      </div>










      {/* RIGHT SIDE */}


      <div className="
        w-full
        md:w-1/2

        flex
        items-center
        justify-center

        px-4
        sm:px-6

        pb-10
      ">



        <div className="
          relative
          w-full
          max-w-md
        ">






          {/* Background image */}


          <div className="
            rounded-3xl
            overflow-hidden
          ">


            <img

              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"

              alt="model"

              className="
                w-full
                h-[520px]
                sm:h-[600px]
                object-cover
              "

            />


          </div>










          {/* LOGIN CARD */}


          <div className="
            absolute
            inset-0

            flex
            items-center
            justify-center
          ">





            <div className="
              bg-white/90
              backdrop-blur-md

              p-5
              sm:p-6

              rounded-2xl

              shadow-xl

              w-[92%]

            ">




              <h2 className="
                text-lg
                font-semibold
                mb-4
                text-center
              ">

                Login to your account

              </h2>







              <form

                onSubmit={submitHandler}

                className="space-y-4"

              >






                {/* Email */}


                <input

                  type="email"

                  placeholder="Email"

                  value={email}

                  onChange={
                    e => setEmail(e.target.value)
                  }

                  className="
                    w-full
                    border-b
                    p-2
                    outline-none
                    bg-transparent
                  "

                />









                {/* Password */}


                <div className="
                  flex
                  items-center
                  border-b
                ">


                  <input

                    type={
                      showPassword
                      ? 'text'
                      : 'password'
                    }

                    placeholder="Password"

                    value={password}

                    onChange={
                      e => setPassword(e.target.value)
                    }

                    className="
                      flex-1
                      p-2
                      outline-none
                      bg-transparent
                    "

                  />



                  <span

                    onClick={
                      () => setShowPassword(!showPassword)
                    }

                    className="cursor-pointer"

                  >

                    {
                      showPassword
                      ? <FaEye />
                      : <FaEyeSlash />
                    }


                  </span>


                </div>









                {/* Options */}


                <div className="
                  flex
                  justify-between
                  items-center
                  text-sm
                ">




                  <label className="
                    flex
                    items-center
                    gap-2
                  ">


                    <input

                      type="checkbox"

                      checked={remember}

                      onChange={
                        () => setRemember(!remember)
                      }

                    />


                    Remember me


                  </label>





                  <Link

                    to="/reset-password"

                    className="text-gray-500"

                  >

                    Forgot?

                  </Link>




                </div>









                {/* Button */}


                <button

                  type="submit"

                  disabled={isLoading}

                  className="
                    w-full

                    bg-black

                    text-white

                    py-2.5

                    rounded-full

                    hover:opacity-90

                    transition

                    disabled:opacity-50
                  "

                >

                  {
                    isLoading
                    ? "Logging in..."
                    : "Login"
                  }


                </button>






              </form>





            </div>





          </div>







        </div>





      </div>





    </div>

  );

};


export default LoginPage;