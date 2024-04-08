import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({  element }) => {
  const user = useSelector(state => state?.auth);
  const {role} = useSelector(state => state?.auth?.user)
  console.log('user: ', user)
  console.log('role: ', role)

  return user?.isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};

export default PublicRoute;

