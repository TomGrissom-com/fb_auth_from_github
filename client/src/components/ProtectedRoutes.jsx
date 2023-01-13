import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const ProtectedRoutes = ({ children }) => {
  const { user, emailVerified } = UserAuth();
  


  if(!user || emailVerified === false){
    return <Navigate to="/signin"/>;
  }else{
        console.log("email is "+emailVerified)  
        return children
    }
  };

export default ProtectedRoutes;
