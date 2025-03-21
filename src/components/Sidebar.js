// components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">WePay</div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
              <span className="icon">📊</span>
              <span className="label">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/transactions" className={({ isActive }) => isActive ? 'active' : ''}>
              <span className="icon">💸</span>
              <span className="label">Transactions</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/accounts" className={({ isActive }) => isActive ? 'active' : ''}>
              <span className="icon">💳</span>
              <span className="label">Accounts</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/budgets" className={({ isActive }) => isActive ? 'active' : ''}>
              <span className="icon">📝</span>
              <span className="label">Budgets</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}>
              <span className="icon">📈</span>
              <span className="label">Reports</span>
            </NavLink>
          </li>
        </ul>
        
        <div className="divider"></div>
        
        <ul>
          <li>
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
              <span className="icon">👤</span>
              <span className="label">Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
              <span className="icon">⚙️</span>
              <span className="label">Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/help" className={({ isActive }) => isActive ? 'active' : ''}>
              <span className="icon">❓</span>
              <span className="label">Help</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="quick-transfer">
        <NavLink to="/quick-transfer" className="quick-transfer-btn">
          <span className="icon">📤</span>
          <span className="label">Quick Transfer</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;