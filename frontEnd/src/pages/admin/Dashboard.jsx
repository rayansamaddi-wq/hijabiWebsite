import React from 'react';
import {
  FaStore,
  FaUsers,
  FaWallet,
  FaShoppingCart,
  FaChartLine,
  FaBoxOpen,
  FaClipboardList,
  FaUserCog,
  FaPlusCircle,
} from 'react-icons/fa';

import { Link } from 'react-router-dom';

import { useGetProductsQuery } from '../../slices/productsApiSlice';
import { useGetUsersQuery } from '../../slices/usersApiSlice';

import Loader from '../../components/Loader';
import Meta from '../../components/Meta';
import ProductPriceChart from '../../components/Admin/ProductPriceChart';
import DashboardCard from '../../components/Admin/DashboardCard';



const Dashboard = () => {


  const { data: products, isLoading } = useGetProductsQuery({});
  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery({});



  if (isLoading || isUsersLoading) {
    return <Loader />;
  }



  return (

    <div className="flex min-h-screen bg-[#faf7f5]">


      <Meta title="Admin Dashboard" />



      {/* SIDEBAR */}

      <aside className="
        hidden
        w-72
        bg-[#5b463f]
        p-6
        text-white
        lg:block
      ">


        <h1 className="
          mb-10
          text-3xl
          font-bold
          text-[#d9b8ae]
        ">
          Hijabi Admin
        </h1>



        <nav className="space-y-3">


          <AdminLink
            to="/admin/dashboard"
            icon={<FaChartLine />}
            text="Dashboard"
          />



          <AdminLink
            to="/admin/product-list"
            icon={<FaBoxOpen />}
            text="Product List"
          />



          <AdminLink
            to="/admin/order-list"
            icon={<FaClipboardList />}
            text="Order List"
          />



          <AdminLink
            to="/admin/user-list"
            icon={<FaUsers />}
            text="User List"
          />



          <AdminLink
            to="/admin/admin-list"
            icon={<FaUserCog />}
            text="Admin List"
          />



          <AdminLink
            to="/admin/product/create"
            icon={<FaPlusCircle />}
            text="Create Product"
          />



          <AdminLink
            to="/admin/profile"
            icon={<FaUserCog />}
            text="Profile"
          />


        </nav>


      </aside>







      {/* MAIN CONTENT */}


      <main className="
        flex-1
        p-6
      ">




        {/* HEADER */}


        <div className="
          mb-8
          flex
          items-center
          justify-between
          rounded-xl
          bg-white
          p-6
          shadow-md
          border
          border-[#ead6ce]
        ">


          <div>


            <h2 className="
              text-3xl
              font-bold
              text-[#5b463f]
            ">
              Ecommerce Dashboard
            </h2>



            <p className="
              mt-2
              text-gray-500
            ">
              Manage your Hijabi store performance and customers
            </p>


          </div>




          <div className="
            rounded-full
            bg-[#ead6ce]
            px-5
            py-2
            font-semibold
            text-[#5b463f]
          ">

            Administrator

          </div>


        </div>







        {/* STAT CARDS */}



        <div className="
          grid
          grid-cols-1
          gap-6
          sm:grid-cols-2
          xl:grid-cols-4
        ">




          <DashboardCard

            title="Products"

            icon={<FaStore size={30}/>}

            value={products?.length || 0}

            bgColor="bg-[#b58b7c]"

          />





          <DashboardCard

            title="Customers"

            icon={<FaUsers size={30}/>}

            value={users?.length || 0}

            bgColor="bg-[#8c6f63]"

          />





          <DashboardCard

            title="Revenue"

            icon={<FaWallet size={30}/>}

            value="$0"

            bgColor="bg-[#c08457]"

          />





          <DashboardCard

            title="Orders"

            icon={<FaShoppingCart size={30}/>}

            value="0"

            bgColor="bg-[#6d564b]"

          />



        </div>









        {/* CHART SECTION */}



        <div className="
          mt-8
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-2
        ">





          <section className="
            rounded-xl
            bg-white
            p-6
            shadow-md
            border
            border-[#ead6ce]
          ">



            <div className="
              mb-5
              flex
              items-center
              justify-between
            ">



              <h3 className="
                text-xl
                font-bold
                text-[#5b463f]
              ">

                Product Analytics

              </h3>




              <FaChartLine className="text-[#c08457]" />



            </div>





            <ProductPriceChart

              products={products || []}

            />




          </section>









          <section className="
            flex
            min-h-[350px]
            items-center
            justify-center
            rounded-xl
            bg-white
            p-6
            shadow-md
            border
            border-[#ead6ce]
          ">



            <div className="text-center">



              <FaShoppingCart

                size={60}

                className="mx-auto mb-4 text-[#d9b8ae]"

              />




              <h3 className="
                text-xl
                font-bold
                text-[#5b463f]
              ">

                Sales Analytics

              </h3>




              <p className="
                mt-2
                text-gray-400
              ">

                Orders API will power revenue charts

              </p>




            </div>



          </section>





        </div>









        {/* FUTURE TABLES */}



        <div className="
          mt-8
          grid
          grid-cols-1
          gap-6
          lg:grid-cols-3
        ">




          <DashboardBox

            title="Latest Orders"

            text="Orders analytics coming soon"

          />




          <DashboardBox

            title="Top Selling Products"

            text="Product performance coming soon"

          />




          <DashboardBox

            title="New Customers"

            text="Customer growth coming soon"

          />



        </div>





      </main>



    </div>


  );

};









// SIDEBAR LINK


const AdminLink = ({to, icon, text}) => (

  <Link

    to={to}

    className="
      flex
      items-center
      gap-3
      rounded-lg
      px-4
      py-3
      transition
      duration-300
      hover:bg-[#d9b8ae]
      hover:text-[#5b463f]
    "

  >

    {icon}


    <span>

      {text}

    </span>


  </Link>

);









// DASHBOARD BOX


const DashboardBox = ({title,text}) => (

  <div className="
    rounded-xl
    bg-white
    p-6
    shadow-md
    border
    border-[#ead6ce]
  ">


    <h3 className="
      text-lg
      font-bold
      text-[#5b463f]
    ">

      {title}

    </h3>



    <p className="
      mt-4
      text-gray-400
    ">

      {text}

    </p>



  </div>

);




export default Dashboard;