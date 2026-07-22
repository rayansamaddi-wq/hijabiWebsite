import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Screens
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordRequestPage from './pages/ResetPasswordRequestPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import MyOrdersPage from './pages/MyOrdersPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import ProfilePage from './pages/ProfilePage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import Dashboard from './pages/admin/Dashboard';
//import OrderListPage from './pages/admin/OrderListPage';
import ProductListPage from './pages/admin/ProductListPage';
import UserListPage from './pages/admin/UserListPage';
import ProductFormPage from './pages/admin/ProductFormPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';
import AdminListPage from './pages/admin/AdminListPage';
import UpdateUserFormPage from './pages/admin/UpdateUserFormPage';
import PaymentResult from "./pages/PaymentResult";

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <Header />

      <ToastContainer />

      {/* Main */}
      <main className='flex-grow max-w-12xl mx-auto w-full px-4 py-6'>
        <Routes >
          {/* User Routes */}
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
           < Route path= '/cart' element={<CartPage />} />
      
          <Route
            path='/reset-password'
            element={<ResetPasswordRequestPage />}
          />
          <Route
            path='/reset-password/:id/:token'
            element={<ResetPasswordPage />}
          />
          <Route path='/product/:id' element={<ProductPage />} />
           <Route path= '/place-order' element={ <PlaceOrderPage />} />
           <Route path= '/shipping' element={ <ShippingPage />} />
            <Route path= '/payment' element={ <PaymentPage />} />
              <Route path= '/order/:id' element={ <OrderDetailsPage />} />
               <Route path= '/my-orders' element={ <MyOrdersPage />} />
               <Route path= '/category-page' element={ <CategoryProductsPage />} />
               <Route path="/payment-result" element={<PaymentResult />} />
                <Route path="/Profile-page" element={<ProfilePage />} />

       
       

          {/* Admin Login */}
          <Route path='/admin/login' element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path='/admin/dashboard' element={<Dashboard />} />

           

            <Route
              path='/admin/product-list'
              element={<ProductListPage />}
            />

            <Route
              path='/admin/user-list'
              element={<UserListPage />}
            />

            <Route
              path='/admin/product/create'
              element={<ProductFormPage />}
            />

            <Route
              path='/admin/profile'
              element={<AdminProfilePage />}
            />

            <Route
              path='/admin/admin-list'
              element={<AdminListPage />}
            />

            <Route
              path='/admin/user/update/:id'
              element={<UpdateUserFormPage />}
            />

            <Route
              path='/admin/product/update/:id'
              element={<ProductFormPage />}
            />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;