import React from 'react';
import { Navigate, Route, Outlet } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';

const PrivateRoute = () => {
  const auth = useAuth();
  return auth.loggedIn
        ? <Outlet />
        : <Navigate to={{ pathname: '/login', state: { from: location } }} />
    
  
};

export default PrivateRoute;