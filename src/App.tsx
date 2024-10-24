import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import RoutesView from './routes';
import DefaultLayout from './layout/DefaultLayout';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [loading, setLoading] = useState(true); // no need to explicitly define boolean for useState
  const { pathname } = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Simulate loading (this could be API call or authentication check)
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000); // Clear timeout on unmount
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <Loader />; // Show loader while loading is true
  }

  return (
    <AuthProvider>
      <Provider store={store}>
        <DefaultLayout>
          <RoutesView />
        </DefaultLayout>
      </Provider>
    </AuthProvider>
  );
}

export default App;
