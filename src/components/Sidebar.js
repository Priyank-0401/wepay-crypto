// components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';
import logoImage from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar dark-mode">
      <div className="sidebar-header">
        <Link to="/dashboard" className="logo-link">
          <img src={logoImage} alt="WePay Logo" className="sidebar-logo-img" />
          <span className="logo-text">WePay</span>
        </Link>
      </div>
      
      <div className="sidebar-section">
        <div className="section-title">GENERAL</div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </span>
                <span className="label">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/transactions" className={({ isActive }) => isActive ? 'active' : ''}>
                <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </span>
                <span className="label">Transactions</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/accounts" className={({ isActive }) => isActive ? 'active' : ''}>
                <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                    <line x1="2" y1="10" x2="22" y2="10"></line>
                  </svg>
                </span>
                <span className="label">Accounts</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/budgets" className={({ isActive }) => isActive ? 'active' : ''}>
                <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                </span>
                <span className="label">Budgets</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="sidebar-section">
        <div className="section-title">USERS</div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
                <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                <span className="label">Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
                <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </span>
                <span className="label">Settings</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/help" className={({ isActive }) => isActive ? 'active' : ''}>
                <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </span>
                <span className="label">Help</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;