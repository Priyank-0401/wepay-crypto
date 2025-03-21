// components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../styles/Layout.css';

const Layout = ({ onLogout }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar onLogout={onLogout} />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;