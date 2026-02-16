import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.scss';

const Layout = ({ children, isAuthenticated, onLogout }) => {
  return (
    <div className="layout">
      <Header isAuthenticated={isAuthenticated} onLogout={onLogout} />
      <div className="layout-container">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;