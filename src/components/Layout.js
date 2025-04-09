// components/Layout.js
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../styles/Layout.css';

const Layout = ({ onLogout }) => {
  // Force dark mode to be enabled
  useEffect(() => {
    // Apply dark mode to body
    document.body.classList.add('dark-mode');
  }, []);

  return (
    <div className="app-layout dark-mode">
      <Sidebar />
      <div className="main-content">
        <main className="content">
          <Outlet context={{ onLogout }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;