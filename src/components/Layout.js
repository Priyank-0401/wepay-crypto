// components/Layout.js
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../styles/Layout.css';

const Layout = ({ onLogout }) => {
  const [darkMode, setDarkMode] = useState(false);

  // On component mount, check if user has a dark mode preference
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    } else {
      // Check if user's system prefers dark mode
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDarkMode);
    }
  }, []);

  // Update body class and save preference when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app-layout ${darkMode ? 'dark-mode' : ''}`}>
      <Sidebar darkMode={darkMode} />
      <div className="main-content">
        <Navbar onLogout={onLogout} darkMode={darkMode} />
        <div className="content-area">
          <Outlet context={{ darkMode }} />
        </div>
        <button 
          className="dark-mode-toggle" 
          onClick={toggleDarkMode}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  );
};

export default Layout;