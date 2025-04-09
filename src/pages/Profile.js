import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  const [copiedAddress, setCopiedAddress] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!userString || !token) {
      // Don't navigate directly - let ProtectedRoute handle this
      console.log('User not authenticated in Profile page');
      return;
    }

    try {
      const parsedUser = JSON.parse(userString);
      if (parsedUser) {
        setUserData({
          name: parsedUser.name || 'Crypto User',
          email: parsedUser.email || 'user@example.com',
          username: parsedUser.username || 'cryptouser',
          wallet_address: parsedUser.wallet_address || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
        });
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="empty-state">
          <div className="empty-state-icon">⏳</div>
          <div className="empty-state-title">Loading profile...</div>
          <div className="empty-state-text">Please wait while we fetch your profile data.</div>
        </div>
      </div>
    );
  }

  // Create initials from user's name for avatar
  const getInitials = () => {
    if (!userData.name) return 'U';
    const names = userData.name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  // Mock data for statistics and wallet addresses
  const mockWallets = [
    {
      network: 'Ethereum',
      address: userData.wallet_address,
      balance: '4.35 ETH'
    },
    {
      network: 'Polygon',
      address: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
      balance: '1,250 MATIC'
    }
  ];

  const mockStats = [
    { label: 'Total Transactions', value: '152' },
    { label: 'Successful Swaps', value: '47' },
    { label: 'Average Gas Paid', value: '0.0032 ETH' },
    { label: 'Member Since', value: 'June 2023' }
  ];

  const mockActivity = [
    {
      type: 'transaction',
      title: 'ETH Transfer',
      details: 'To: 0x1a2...3b4c • 0.25 ETH',
      timestamp: '2 hours ago'
    },
    {
      type: 'login',
      title: 'New Login',
      details: 'IP: 192.168.1.*** • Chrome Browser',
      timestamp: 'Yesterday'
    },
    {
      type: 'transaction',
      title: 'Token Swap',
      details: '500 USDT → 0.18 ETH',
      timestamp: '3 days ago'
    }
  ];

  return (
    <div className="profile-page">
      {/* Profile Header Section */}
      <section className="profile-header-section">
        <div className="profile-header-container">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              {getInitials()}
            </div>
            <div className="profile-avatar-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
          
          <div className="profile-header-info">
            <h1 className="profile-name">{userData.name}</h1>
            
            <div className="profile-meta">
              <div className="profile-username">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                @{userData.username}
              </div>
              
              <div className="profile-email">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                {userData.email}
              </div>
            </div>
            
            <div className="profile-badges">
              <div className="profile-badge verified">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Verified
              </div>
              
              <div className="profile-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
                Active User
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Profile Content Section */}
      <section className="profile-content-section">
        <div className="profile-content-container">
          {/* Profile Sidebar */}
          <aside className="profile-sidebar">
            <div className="profile-sidebar-card">
              <div className="profile-sidebar-card-header">
                <h2 className="profile-sidebar-card-title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  Activity Stats
                </h2>
              </div>
              
              <div className="profile-sidebar-card-content">
                <div className="profile-stats-list">
                  {mockStats.map((stat, index) => (
                    <div key={index} className="profile-stat-item">
                      <div className="profile-stat-label">{stat.label}</div>
                      <div className="profile-stat-value">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="profile-sidebar-card">
              <div className="profile-sidebar-card-header">
                <h2 className="profile-sidebar-card-title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                  Wallet Addresses
                </h2>
              </div>
              
              <div className="profile-sidebar-card-content">
                <div className="wallet-addresses-list">
                  {mockWallets.map((wallet, index) => (
                    <div key={index} className="wallet-address-item">
                      <div className="wallet-network">
                        <div className="wallet-network-icon">{wallet.network.charAt(0)}</div>
                        {wallet.network}
                      </div>
                      
                      <div className="wallet-address-row">
                        <div className="wallet-address-text" title={wallet.address}>
                          {wallet.address}
                        </div>
                        <button 
                          className="wallet-address-copy"
                          onClick={() => handleCopyAddress(wallet.address)}
                          title="Copy wallet address"
                        >
                          {copiedAddress === wallet.address ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                          )}
                        </button>
                      </div>
                      
                      <div className="wallet-balance">
                        <span>Balance:</span>
                        <span className="wallet-balance-value">{wallet.balance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          
          {/* Profile Main Content */}
          <main className="profile-main-content">
            <div className="profile-section">
              <div className="profile-section-header">
                <h2 className="profile-section-title">Personal Information</h2>
              </div>
              
              <div className="profile-section-content">
                <div className="profile-info-grid">
                  <div className="profile-info-item">
                    <div className="profile-info-label">Full Name</div>
                    <div className="profile-info-value">{userData.name}</div>
                  </div>
                  
                  <div className="profile-info-item">
                    <div className="profile-info-label">Username</div>
                    <div className="profile-info-value">@{userData.username}</div>
                  </div>
                  
                  <div className="profile-info-item">
                    <div className="profile-info-label">Email Address</div>
                    <div className="profile-info-value">{userData.email}</div>
                  </div>
                </div>
                
                <div className="profile-actions">
                  <Link to="/settings" className="profile-action-btn primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Edit Profile
                  </Link>
                  
                  <button className="profile-action-btn secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
                      <path d="M16.5 9.4L7.55 4.24"></path>
                      <polyline points="3.29 7 12 12 20.71 7"></polyline>
                      <line x1="12" y1="22" x2="12" y2="12"></line>
                      <circle cx="18.5" cy="15.5" r="2.5"></circle>
                      <path d="M20.27 17.27L22 19"></path>
                    </svg>
                    Verify Identity
                  </button>
                </div>
              </div>
            </div>
            
            <div className="profile-section">
              <div className="profile-section-header">
                <h2 className="profile-section-title">Recent Activity</h2>
              </div>
              
              <div className="profile-section-content">
                <div className="activity-feed">
                  {mockActivity.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className={`activity-icon ${activity.type}`}>
                        {activity.type === 'transaction' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                            <polyline points="17 6 23 6 23 12"></polyline>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        )}
                      </div>
                      
                      <div className="activity-content">
                        <div className="activity-title">{activity.title}</div>
                        <div className="activity-details">{activity.details}</div>
                      </div>
                      
                      <div className="activity-timestamp">{activity.timestamp}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Profile;
