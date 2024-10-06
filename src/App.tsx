import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import RoutesView from './routes';
import DefaultLayout from './layout/DefaultLayout';
import { Provider } from 'react-redux';
import store from './redux/store';

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
    <Provider store={store}>
      <DefaultLayout>
        <RoutesView />
      </DefaultLayout>
    </Provider>
  );
}

export default App;
