// components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ onLogout }) => {
  // Add state variables
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userInitial, setUserInitial] = useState('U');
  const [isHovered, setIsHovered] = useState(false);
  
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
    <div className="navbar dark-mode">
      <div className="navbar-left">
        <h2 className="page-title">Dashboard</h2>
      </div>
      
      <div className="navbar-right">
        <div className="navbar-user">
          <div 
            onClick={toggleDropdown}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              width: '34px',
              height: '34px',
              background: 'linear-gradient(135deg, #3498db, #2c3e50)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '14px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: isHovered ? '0 3px 8px rgba(0, 0, 0, 0.3)' : '0 2px 5px rgba(0, 0, 0, 0.2)',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              borderColor: isHovered ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)'
            }}
          >
            {userInitial}
          </div>
          {dropdownOpen && (
            <div className="user-dropdown">
              <Link to="/profile" onClick={() => setDropdownOpen(false)}>Profile</Link>
              <Link to="/settings" onClick={() => setDropdownOpen(false)}>Settings</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;