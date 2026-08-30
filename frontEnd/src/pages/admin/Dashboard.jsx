import React from 'react';
import {
  FaStore,
  FaUsers,
  FaWallet,
  FaShoppingCart,
  FaChartLine,
  FaBoxOpen,
  FaUserCog,
  FaClipboardList,
} from 'react-icons/fa';

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
        w-64 
        flex-col 
        bg-slate-900 
        p-6 
        text-white 
        lg:flex
      ">

        <h1 className="
          mb-10 
          text-2xl 
          font-bold
        ">
          Hijabi Admin
        </h1>


        <nav className="space-y-3">


          <button className="
            flex 
            w-full 
            items-center 
            gap-3 
            rounded-lg 
            bg-cyan-500 
            px-4 
            py-3
          ">
            <FaChartLine />
            Dashboard
          </button>



          <button className="
            flex 
            w-full 
            items-center 
            gap-3 
            rounded-lg 
            px-4 
            py-3
            transition
            hover:bg-slate-800
          ">
            <FaBoxOpen />
            Product List
          </button>



          <button className="
            flex 
            w-full 
            items-center 
            gap-3 
            rounded-lg 
            px-4 
            py-3
            transition
            hover:bg-slate-800
          ">
            <FaClipboardList />
            Order List
          </button>



          <button className="
            flex 
            w-full 
            items-center 
            gap-3 
            rounded-lg 
            px-4 
            py-3
            transition
            hover:bg-slate-800
          ">
            <FaUsers />
            User List
          </button>



          <button className="
            flex 
            w-full 
            items-center 
            gap-3 
            rounded-lg 
            px-4 
            py-3
            transition
            hover:bg-slate-800
          ">
            <FaUserCog />
            Settings
          </button>


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
          p-5
          shadow
        ">

          <div>

            <h2 className="
              text-3xl
              font-bold
              text-gray-800
            ">
              Dashboard Overview
            </h2>

            <p className="
              text-gray-500
            ">
              Monitor your ecommerce performance
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
            Admin
          </div>


        </div>




        {/* STAT CARDS */}


        <div className="
          grid
          grid-cols-1
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        ">


          <DashboardCard
            title="Products"
            icon={<FaStore size={30}/>}
            value={products?.length || 0}
            bgColor="bg-blue-500"
          />


          <DashboardCard
            title="Users"
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





        {/* CHART SECTION */}


        <div className="
          mt-8
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-2
        ">


          <div className="
            rounded-xl
            bg-white
            p-6
            shadow-md
          ">

            <h3 className="
              mb-5
              text-xl
              font-bold
            ">
              Product Price Analytics
            </h3>


            <ProductPriceChart
              products={products || []}
            />

          </div>





          <div className="
            flex
            min-h-[350px]
            items-center
            justify-center
            rounded-xl
            bg-white
            shadow-md
          ">


            <div className="text-center">


              <FaChartLine 
                size={50}
                className="mx-auto mb-4 text-gray-300"
              />


              <h3 className="
                text-xl
                font-bold
                text-gray-400
              ">
                Revenue Analytics
              </h3>


              <p className="
                text-gray-400
              ">
                Connect orders API to display sales charts
              </p>


            </div>


          </div>


        </div>




        {/* TABLE PLACEHOLDERS */}


        <div className="
          mt-8
          grid
          grid-cols-1
          gap-6
          lg:grid-cols-3
        ">


          <div className="
            rounded-xl
            bg-white
            p-6
            shadow
          ">

            <h3 className="font-bold">
              Latest Orders
            </h3>

            <p className="mt-5 text-gray-400">
              Orders API coming soon...
            </p>

          </div>



          <div className="
            rounded-xl
            bg-white
            p-6
            shadow
          ">

            <h3 className="font-bold">
              Top Products
            </h3>

            <p className="mt-5 text-gray-400">
              Product analytics coming soon...
            </p>

          </div>




          <div className="
            rounded-xl
            bg-white
            p-6
            shadow
          ">

            <h3 className="font-bold">
              Recent Users
            </h3>

            <p className="mt-5 text-gray-400">
              Users API coming soon...
            </p>

          </div>


        </div>



      </main>


    </div>

  );
};


export default Dashboard;