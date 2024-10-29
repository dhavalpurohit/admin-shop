import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../common/ProtectedRoute';
import PageTitle from '../components/PageTitle';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import Calendar from '../pages/Calendar';
import Chart from '../pages/Chart';
import ECommerce from '../pages/Dashboard/ECommerce';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Products from '../pages/Products';
import SingleProduct from '../pages/AddProduct/SingleProduct';
import BulkUpload from '../pages/AddProduct/BulkUpload';
import Banner from '../pages/Banner';

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
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <>
              <PageTitle title="Dashboard | Store Panel" />
              <ECommerce />
            </>
          </ProtectedRoute>
        }
      />
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
              <PageTitle title="Chart | Store Panel" />
              <Banner />
            </>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default RoutesView;
