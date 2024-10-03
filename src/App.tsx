import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Products from './pages/Products';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import SingleProduct from './pages/AddProduct/SingleProduct';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | Store Panel" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | Store Panel" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | Store Panel" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | Store Panel" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | Store Panel" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <PageTitle title="Products | Store Panel" />
              <Products />
            </>
          }
        />
        <Route
          path="/single-product"
          element={
            <>
              <PageTitle title="Single Products | Store Panel" />
              <SingleProduct />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | Store Panel" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | Store Panel" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | Store Panel" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | Store Panel" />
              <Buttons />
            </>
          }
        />
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
      </Routes>
    </DefaultLayout>
  );
}

export default App;
