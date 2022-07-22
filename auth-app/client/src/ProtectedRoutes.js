import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const ProtectedRoutes = ({ children }) => {
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');

  if (!token) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoutes;
