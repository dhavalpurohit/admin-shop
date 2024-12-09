import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../common/ProtectedRoute';
import PageTitle from '../components/PageTitle';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import Calendar from '../pages/Calendar';
import Chart from '../pages/Chart';
// import ECommerce from '../pages/Dashboard/ECommerce';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Products from '../pages/Products';
import BulkUpload from '../pages/AddProduct/BulkUpload';
import Banner from '../pages/Banner';
import SingleProduct from '../pages/AddProduct/SingleProduct';
import Order from '../pages/Order';
import AddBanner from '../pages/Banner/AddBanner';
import AddProductBanner from '../pages/Banner/AddProductBanner';

const RoutesView = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/auth/signin"
        element={
          <>
            <PageTitle title="Signin | Store Panel" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <>
            <PageTitle title="Signup | Store Panel" />
            <SignUp />
          </>
        }
      />

      {/* Protected Routes */}
      {/* <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <>
              <PageTitle title="Dashboard | Store Panel" />
              <ECommerce />
            </>
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <>
              <PageTitle title="Profile | Store Panel" />
              <Profile />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <>
              <PageTitle title="Calendar | Store Panel" />
              <Calendar />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <>
              <PageTitle title="Settings | Store Panel" />
              <Settings />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <>
              <PageTitle title="Products | Store Panel" />
              <Products />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <>
              <PageTitle title="Products | Store Panel" />
              <Products />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/single-product/"
        element={
          <>
            <PageTitle title="Single Products | Store Panel" />
            <SingleProduct />
          </>
        }
      />
      <Route
        path="/bulk-products/"
        element={
          <>
            <PageTitle title="Bulk-Upload Products | Store Panel" />
            <BulkUpload />
          </>
        }
      />
      <Route
        path="/chart"
        element={
          <ProtectedRoute>
            <>
              <PageTitle title="Chart | Store Panel" />
              <Chart />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/banners"
        element={
          <ProtectedRoute>
            <>
              <PageTitle title="Banner | Store Panel" />
              <Banner />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/order"
        element={
          <ProtectedRoute>
            <>
              <PageTitle title="Order | Store Panel" />
              <Order />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-banner"
        element={
          <ProtectedRoute>
            <>
              <PageTitle title="Add Banner | Store Panel" />
              <AddBanner />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/banner/add-product-banner"
        element={
          <ProtectedRoute>
            <>
              <PageTitle title="Add Banner | Store Panel" />
              <AddProductBanner />
            </>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default RoutesView;
