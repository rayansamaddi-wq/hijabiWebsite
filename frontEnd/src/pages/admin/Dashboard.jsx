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

    <div className="flex min-h-screen bg-gray-100">


      <Meta title="Admin Dashboard" />



      {/* SIDEBAR */}

      <aside className="
        hidden
        w-72
       bg-[#d9b8ae]
       hover:bg-[#6d564b]
        p-6
        text-white
        lg:block
      ">


        <h1 className="
          mb-10
          text-3xl
          font-bold
          text-cyan-400
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





      {/* MAIN */}


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
          shadow
        ">


          <div>

            <h2 className="
              text-3xl
              font-bold
              text-gray-800
            ">
              Ecommerce Dashboard
            </h2>


            <p className="
              text-gray-500
            ">
              Manage your store performance and customers
            </p>


          </div>



          <div className="
            rounded-full
            bg-cyan-100
            px-5
            py-2
            font-semibold
            text-cyan-700
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
            bgColor="bg-blue-500"
          />



          <DashboardCard
            title="Customers"
            icon={<FaUsers size={30}/>}
            value={users?.length || 0}
            bgColor="bg-purple-500"
          />



          <DashboardCard
            title="Revenue"
            icon={<FaWallet size={30}/>}
            value="$0"
            bgColor="bg-green-500"
          />



          <DashboardCard
            title="Orders"
            icon={<FaShoppingCart size={30}/>}
            value="0"
            bgColor="bg-orange-500"
          />



        </div>







        {/* CHART AREA */}


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
              ">
                Product Analytics
              </h3>


              <FaChartLine className="text-gray-400"/>

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
          ">


            <div className="text-center">


              <FaShoppingCart
                size={60}
                className="mx-auto mb-4 text-gray-300"
              />


              <h3 className="
                text-xl
                font-bold
                text-gray-400
              ">
                Sales Analytics
              </h3>


              <p className="
                mt-2
                text-gray-400
              ">
                Connect Orders API to display revenue charts
              </p>



            </div>


          </section>



        </div>






        {/* FUTURE DATA TABLES */}



        <div className="
          mt-8
          grid
          grid-cols-1
          gap-6
          lg:grid-cols-3
        ">


          <DashboardBox
            title="Latest Orders"
            text="Orders API integration coming soon"
          />


          <DashboardBox
            title="Top Selling Products"
            text="Sales analytics coming soon"
          />


          <DashboardBox
            title="New Customers"
            text="Customer growth analytics coming soon"
          />


        </div>



      </main>


    </div>

  );
};





// Sidebar Item

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
      hover:bg-slate-800
      hover:text-cyan-400
    "

  >

    {icon}

    <span>
      {text}
    </span>


  </Link>

);





// Dashboard Placeholder Box

const DashboardBox = ({title,text}) => (

  <div className="
    rounded-xl
    bg-white
    p-6
    shadow
  ">


    <h3 className="
      text-lg
      font-bold
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