import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    username: '',
    wallet_address: ''
  });
  const [loading, setLoading] = useState(true);

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
        setUserData({
          name: parsedUser.name || '',
          email: parsedUser.email || '',
          username: parsedUser.username || '',
          wallet_address: parsedUser.wallet_address || 'No wallet address found'
        });
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
        <p>Manage your account information and wallet settings</p>
      </div>
      
      <div className="profile-card">
        <div className="profile-avatar">
          {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
        </div>
        
        <div className="profile-details">
          <div className="profile-field">
            <label>Name</label>
            <span>{userData.name || 'Not provided'}</span>
          </div>
          
          <div className="profile-field">
            <label>Email</label>
            <span>{userData.email || 'Not provided'}</span>
          </div>
          
          <div className="profile-field">
            <label>Username</label>
            <span>{userData.username || 'Not provided'}</span>
          </div>
          
          <div className="profile-field">
            <label>Wallet Address</label>
            <div className="wallet-address-container">
              <span className="wallet-address">{userData.wallet_address}</span>
              <button 
                className="copy-address"
                onClick={() => {
                  navigator.clipboard.writeText(userData.wallet_address);
                  alert('Wallet address copied to clipboard!');
                }}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="profile-actions">
        <button 
          className="edit-profile-btn"
          onClick={() => navigate('/settings')}
        >
          Edit Profile
        </button>
        <button 
          className="back-btn"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Profile;
