import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Settings.css';

const Settings = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
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
  const [activeSection, setActiveSection] = useState('profile');

  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!userString || !token) {
      // Don't navigate directly - let ProtectedRoute handle this
      console.log('User not authenticated in Settings page');
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
        setFormData(prevFormData => ({
          ...prevFormData,
          name: userData.name,
          email: userData.email,
          username: userData.username
        }));
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      // Clear invalid data but don't redirect
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

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
    return (
      <div className="settings-page">
        <div className="empty-state">
          <div className="empty-state-icon">⏳</div>
          <div className="empty-state-title">Loading settings...</div>
          <div className="empty-state-text">Please wait while we fetch your settings data.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      {/* Settings Header Section */}
      <section className="settings-header-section">
        <div className="settings-header-container">
          <h1 className="settings-header-title">Account Settings</h1>
          <p className="settings-header-description">
            Manage your profile information, preferences, security settings, and connected wallets
          </p>
      </div>
      </section>
      
      {/* Settings Content Section */}
      <section className="settings-content-section">
        <div className="settings-content-container">
          {/* Settings Navigation */}
          <nav className="settings-navigation">
            <div className="settings-nav-header">
              <h2 className="settings-nav-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                Settings
              </h2>
            </div>
            
            <div className="settings-nav-list">
              <div className="settings-nav-item">
                <button 
                  className={`settings-nav-link ${activeSection === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveSection('profile')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Profile
                </button>
              </div>
              
              <div className="settings-nav-item">
                <button 
                  className={`settings-nav-link ${activeSection === 'security' ? 'active' : ''}`}
                  onClick={() => setActiveSection('security')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Security
                </button>
              </div>
              
              <div className="settings-nav-item">
                <button 
                  className={`settings-nav-link ${activeSection === 'wallets' ? 'active' : ''}`}
                  onClick={() => setActiveSection('wallets')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 12h4"></path>
                    <circle cx="18" cy="12" r="1"></circle>
                  </svg>
                  Wallets
                </button>
              </div>
              
              <div className="settings-nav-item">
                <button 
                  className={`settings-nav-link ${activeSection === 'notifications' ? 'active' : ''}`}
                  onClick={() => setActiveSection('notifications')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  Notifications
                </button>
              </div>
              
              <div className="settings-nav-item">
                <button 
                  className={`settings-nav-link ${activeSection === 'preferences' ? 'active' : ''}`}
                  onClick={() => setActiveSection('preferences')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                  </svg>
                  Preferences
                </button>
              </div>
            </div>
          </nav>
          
          {/* Settings Main Content */}
          <div className="settings-main-content">
      {message.text && (
              <div className={`settings-alert ${message.type}`}>
                <div className="settings-alert-icon">
                  {message.type === 'success' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  )}
                </div>
                <div className="settings-alert-content">
                  <div className="settings-alert-title">{message.type === 'success' ? 'Success!' : 'Error'}</div>
                  <div className="settings-alert-message">{message.text}</div>
                </div>
        </div>
      )}
      
            {activeSection === 'profile' && (
              <div className="settings-section">
                <div className="settings-section-header">
                  <h2 className="settings-section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Profile Information
                  </h2>
                </div>
                <div className="settings-section-content">
        <form onSubmit={handleSubmit}>
                    <div className="settings-form-group">
                      <label className="settings-form-label" htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                        className="settings-form-input"
              />
            </div>
            
                    <div className="settings-form-group">
                      <label className="settings-form-label" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                        className="settings-form-input"
              />
                      <p className="settings-info-text">Your email is used for notifications and account recovery.</p>
            </div>
            
                    <div className="settings-form-group">
                      <label className="settings-form-label" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                        className="settings-form-input"
                      />
                      <p className="settings-info-text">Your username is visible to other users in the ecosystem.</p>
                    </div>
                    
                    <div className="settings-actions">
                      <button type="submit" className="settings-action-btn primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                          <polyline points="17 21 17 13 7 13 7 21"></polyline>
                          <polyline points="7 3 7 8 15 8"></polyline>
                        </svg>
                        Save Changes
                      </button>
                      <button
                        type="button"
                        className="settings-action-btn secondary"
                        onClick={() => navigate('/profile')}
                      >
                        Cancel
                      </button>
                      <button 
                        type="button" 
                        className="settings-action-btn danger"
                        onClick={() => setMessage({ type: 'warning', text: 'This feature is not yet implemented.' })}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                        Delete Account
                      </button>
                      <button 
                        type="button" 
                        className="settings-action-btn primary" 
                        disabled={true}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                        Disabled Button
                      </button>
                    </div>
                  </form>
            </div>
          </div>
            )}
          
            {activeSection === 'security' && (
          <div className="settings-section">
                <div className="settings-section-header">
                  <h2 className="settings-section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    Security Settings
                  </h2>
                </div>
                <div className="settings-section-content">
                  <div className="settings-form-group">
                    <label className="settings-form-label" htmlFor="current_password">Current Password</label>
              <input
                type="password"
                id="current_password"
                name="current_password"
                value={formData.current_password}
                onChange={handleChange}
                placeholder="Enter your current password"
                      className="settings-form-input"
              />
            </div>
            
                  <div className="settings-form-group">
                    <label className="settings-form-label" htmlFor="new_password">New Password</label>
              <input
                type="password"
                id="new_password"
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
                placeholder="Enter new password"
                      className="settings-form-input"
              />
                    <p className="settings-info-text">Use a strong password that includes letters, numbers, and special characters.</p>
            </div>
            
                  <div className="settings-form-group">
                    <label className="settings-form-label" htmlFor="confirm_password">Confirm New Password</label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm new password"
                      className="settings-form-input"
                    />
                  </div>
                  
                  <div className="settings-divider"></div>
                  
                  <div className="settings-form-group">
                    <div className="settings-toggle-group">
                      <div>
                        <div className="settings-toggle-label">Two-Factor Authentication</div>
                        <div className="settings-toggle-description">Enable 2FA for additional account security</div>
                      </div>
                      <div className="settings-toggle"></div>
            </div>
          </div>
          
          <div className="settings-actions">
                    <button type="button" className="settings-action-btn primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      Update Security Settings
            </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection !== 'profile' && activeSection !== 'security' && (
              <div className="settings-section">
                <div className="settings-section-header">
                  <h2 className="settings-section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                    Coming Soon
                  </h2>
                </div>
                <div className="settings-section-content">
                  <div className="empty-state">
                    <div className="empty-state-icon">🚧</div>
                    <div className="empty-state-title">Under Construction</div>
                    <div className="empty-state-text">
                      This section is currently being developed and will be available soon.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
      </div>
      </section>
    </div>
  );
};

export default Settings;
