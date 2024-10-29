import { Navigate } from 'react-router-dom';

// Assuming you store the token in localStorage
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem('access_token');

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/auth/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
