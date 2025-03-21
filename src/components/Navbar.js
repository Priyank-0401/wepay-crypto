// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ onLogout }) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2 className="page-title">Dashboard</h2>
      </div>
      
      <div className="navbar-right">
        <div className="navbar-search">
          <input type="text" placeholder="Search..." />
          <button className="search-btn">🔍</button>
        </div>
        
        <div className="navbar-notifications">
          <button className="notification-btn">🔔</button>
          <span className="notification-badge">3</span>
        </div>
        
        <div className="navbar-user">
          <div className="user-avatar">U</div>
          <div className="user-dropdown">
            <Link to="/profile">Profile</Link>
            <Link to="/settings">Settings</Link>
            <button onClick={onLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;