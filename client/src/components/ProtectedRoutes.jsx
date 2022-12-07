import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const ProtectedRoutes = ({ children }) => {
  const { user } = UserAuth();

  return(
    !user ? <Navigate to="/signin"/> : children
  )
};

export default ProtectedRoutes;
