// components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ onLogout }) => {
  // Add state variables
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userInitial, setUserInitial] = useState('U');
  const [searchQuery, setSearchQuery] = useState('');
  
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
  
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality here
  };
  
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2 className="page-title">Dashboard</h2>
      </div>
      
      <div className="navbar-right">
        <div className="navbar-search">
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">🔍</button>
          </form>
        </div>
        
        <div className="navbar-notifications">
          <button className="notification-btn">🔔</button>
          <span className="notification-badge">3</span>
        </div>
        
        <div className={`navbar-user ${dropdownOpen ? 'active' : ''}`}>
          <div className="user-avatar" onClick={toggleDropdown}>{userInitial}</div>
          <div className="user-dropdown">
            <Link to="/profile" onClick={() => setDropdownOpen(false)}>Profile</Link>
            <Link to="/settings" onClick={() => setDropdownOpen(false)}>Settings</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;