import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoute = () => {
  const currentUser = useSelector((state) => state.user.currentUser); // Get user from Redux

  return currentUser ? <Outlet /> : <Navigate to='/login' />;
};


