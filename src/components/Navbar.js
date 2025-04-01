// components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ onLogout, darkMode, toggleDarkMode }) => {
  // Add state variables
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userInitial, setUserInitial] = useState('U');
  
  // Get user data from localStorage on component mount
  useEffect(() => {
    const getUserData = () => {
      try {
        const userString = localStorage.getItem('user');
        if (userString) {
          const userData = JSON.parse(userString);
          if (userData) {
            // Try to get initial from name first
            if (userData.name) {
              const initial = userData.name.charAt(0).toUpperCase();
              setUserInitial(initial);
            } 
            // Fall back to email if name is not available
            else if (userData.email) {
              const initial = userData.email.charAt(0).toUpperCase();
              setUserInitial(initial);
            }
            // Fallback to username if available
            else if (userData.username) {
              const initial = userData.username.charAt(0).toUpperCase();
              setUserInitial(initial);
            }
          }
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };
    
    getUserData();
  }, []);
  
  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      const userDropdown = document.querySelector('.navbar-user');
      if (userDropdown && !userDropdown.contains(event.target) && dropdownOpen) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);
  
  // Handle logout
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <div className="navbar-left">
        <h2 className="page-title">Dashboard</h2>
      </div>
      
      <div className="navbar-right">        
        <div className={`navbar-user ${dropdownOpen ? 'active' : ''}`}>
          <div className="user-avatar" onClick={toggleDropdown}>{userInitial}</div>
          <div className="user-dropdown">
            <Link to="/profile" onClick={() => setDropdownOpen(false)}>Profile</Link>
            <Link to="/settings" onClick={() => setDropdownOpen(false)}>Settings</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
      
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        <span className="icon">{darkMode ? '☀️' : '🌙'}</span>
      </button>
    </div>
  );
};

export default Navbar;