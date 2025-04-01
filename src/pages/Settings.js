import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    username: '',
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!userString || !token) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userString);
      if (parsedUser) {
        const userData = {
          name: parsedUser.name || '',
          email: parsedUser.email || '',
          username: parsedUser.username || ''
        };
        
        setUserData(userData);
        setFormData({
          ...formData, 
          name: userData.name,
          email: userData.email,
          username: userData.username
        });
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Password validation
    if (formData.new_password && formData.new_password !== formData.confirm_password) {
      setMessage({
        type: 'error',
        text: 'New password and confirmation do not match'
      });
      return;
    }
    
    // Here you would normally send a request to your API
    // For this demo, we'll just update localStorage
    
    try {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        
        // Update user data
        const updatedUser = {
          ...user,
          name: formData.name,
          email: formData.email,
          username: formData.username
        };
        
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        setMessage({
          type: 'success',
          text: 'Profile updated successfully!'
        });
        
        // Update the display data
        setUserData({
          name: formData.name,
          email: formData.email,
          username: formData.username
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({
        type: 'error',
        text: 'Failed to update profile'
      });
    }
  };

  if (loading) {
    return <div className="settings-loading">Loading settings...</div>;
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Account Settings</h1>
        <p>Update your profile information and password</p>
      </div>
      
      {message.text && (
        <div className={`alert ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className="settings-card">
        <form onSubmit={handleSubmit}>
          <div className="settings-section">
            <h2>Profile Information</h2>
            
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </div>
          </div>
          
          <div className="settings-section">
            <h2>Change Password</h2>
            <p className="section-description">Leave these fields empty if you don't want to change your password</p>
            
            <div className="form-group">
              <label htmlFor="current_password">Current Password</label>
              <input
                type="password"
                id="current_password"
                name="current_password"
                value={formData.current_password}
                onChange={handleChange}
                placeholder="Enter your current password"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="new_password">New Password</label>
              <input
                type="password"
                id="new_password"
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
                placeholder="Enter new password"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirm_password">Confirm New Password</label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm new password"
              />
            </div>
          </div>
          
          <div className="settings-actions">
            <button type="submit" className="save-changes-btn">
              Save Changes
            </button>
            <button 
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/profile')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
