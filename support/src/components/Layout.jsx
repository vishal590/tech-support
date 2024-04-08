import React from 'react';
import LogoutButton from './LogoutButton';
import { Outlet, useLocation } from 'react-router-dom';
import {useSelector} from 'react-redux'

const Layout = ({children}) => {
  const location = useLocation();
  const user = useSelector(state => state?.auth?.user)
  const shouldRenderLogoutButton = !['/login', '/'].includes(location.pathname);
console.log('user:', user)

  const renderUserRole = () => {
    if(user?.role === 'admin'){
      return 'Admin';
    }else if(user?.role === 'tech_support'){
      return 'Tech Support';
    }else {
      return (user?.name.charAt(0).toUpperCase() + user?.name.slice(1));
    }
  }

  return (
    <div className="layout">
      {shouldRenderLogoutButton && (
        <div className="flex justify-end">
          {user && (
            <div className="mr-2">
              <button className="bg-blue-500 font-bold text-white py-2 px-4 rounded">{renderUserRole()}</button>
            </div>
          )}
          <div className="logout-button">
            <LogoutButton />
          </div>
        </div>
      )}
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
