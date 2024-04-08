import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({  element }) => {
  const user = useSelector(state => state?.auth);
  const {role} = useSelector(state => state?.auth?.user)
  console.log('user: ', user)


  return user?.isAuthenticated && role === 'admin' ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;

