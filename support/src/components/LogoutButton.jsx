import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../app/features/authSlice';

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login');
  };

  return (
    <button
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    onClick={handleLogout}
  >
    Logout
  </button>

  );
};

export default LogoutButton;
