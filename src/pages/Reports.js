import React, { useState, useEffect } from 'react';
import '../styles/Pages.css';
import '../styles/Reports.css';

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState(null);
  const [reportType, setReportType] = useState('spending');
  const [timeRange, setTimeRange] = useState('month');
  const [showSaveReport, setShowSaveReport] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!userString || !token) {
      // Don't navigate directly - let ProtectedRoute handle this
      console.log('User not authenticated in Reports page');
      return;
    }
    
    const fetchReportData = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for reports
        const mockData = {
          spending: {
            month: {
              labels: ['Trading', 'DeFi Investments', 'NFT Purchases', 'Gas Fees', 'Other'],
              values: [1.75, 5.0, 0.2, 0.35, 0],
              total: 7.3,
              previousTotal: 6.9,
              change: 5.8
            },
            quarter: {
              labels: ['Trading', 'DeFi Investments', 'NFT Purchases', 'Gas Fees', 'Other'],
              values: [4.5, 12.3, 1.8, 0.95, 0.45],
              total: 20.0,
              previousTotal: 18.5,
              change: 8.1
            },
            year: {
              labels: ['Trading', 'DeFi Investments', 'NFT Purchases', 'Gas Fees', 'Other'],
              values: [15.2, 42.5, 7.8, 3.6, 2.9],
              total: 72.0,
              previousTotal: 65.2,
              change: 10.4
            }
          },
          income: {
            month: {
              labels: ['Staking Rewards', 'Trading Profit', 'DeFi Yield', 'Airdrops', 'Other'],
              values: [0.45, 0.85, 1.2, 0, 0.1],
              total: 2.6,
              previousTotal: 2.2,
              change: 18.2
            },
            quarter: {
              labels: ['Staking Rewards', 'Trading Profit', 'DeFi Yield', 'Airdrops', 'Other'],
              values: [1.35, 2.45, 3.6, 0.5, 0.3],
              total: 8.2,
              previousTotal: 7.1,
              change: 15.5
            },
            year: {
              labels: ['Staking Rewards', 'Trading Profit', 'DeFi Yield', 'Airdrops', 'Other'],
              values: [5.2, 9.8, 12.5, 2.1, 1.4],
              total: 31.0,
              previousTotal: 25.5,
              change: 21.6
            }
          },
          networth: {
            month: {
              labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
              values: [45.5, 47.2, 46.8, 48.5],
              total: 48.5,
              previousTotal: 45.2,
              change: 7.3
            },
            quarter: {
              labels: ['Month 1', 'Month 2', 'Month 3'],
              values: [42.5, 45.2, 48.5],
              total: 48.5,
              previousTotal: 41.7,
              change: 16.3
            },
            year: {
              labels: ['Q1', 'Q2', 'Q3', 'Q4'],
              values: [38.2, 40.5, 44.8, 48.5],
              total: 48.5,
              previousTotal: 35.2,
              change: 37.8
            }
          }
        };
        
        setReportData(mockData);
      } catch (error) {
        console.error('Error fetching report data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReportData();
  }, []);

  const getCurrentReportData = () => {
    if (!reportData) return null;
    return reportData[reportType][timeRange];
  };
  
  const calculatePercentage = (value, total) => {
    return Math.round((value / total) * 100);
  };
  
  const getReportTitle = () => {
    const titles = {
      spending: 'Spending Report',
      income: 'Income Report',
      networth: 'Net Worth Analysis'
    };
    
    const periods = {
      month: 'Monthly',
      quarter: 'Quarterly',
      year: 'Annual'
    };
    
    return `${periods[timeRange]} ${titles[reportType]}`;
  };
  
  const formatCurrency = (value) => {
    return `${value.toFixed(2)} ETH`;
  };
  
  const getRandomColor = (index) => {
    const colors = [
      'rgba(79, 70, 229, 0.8)',  // Primary
      'rgba(45, 212, 191, 0.8)',  // Teal
      'rgba(234, 88, 12, 0.8)',   // Orange
      'rgba(217, 70, 239, 0.8)',  // Purple
      'rgba(16, 185, 129, 0.8)',  // Green
      'rgba(59, 130, 246, 0.8)',  // Blue
      'rgba(245, 158, 11, 0.8)',  // Amber
      'rgba(239, 68, 68, 0.8)'    // Red
    ];
    
    return colors[index % colors.length];
  };
  
  const renderChartBars = () => {
    const data = getCurrentReportData();
    if (!data) return null;
    
    return (
      <div className="chart-container">
        {data.labels.map((label, index) => {
          const percentage = calculatePercentage(data.values[index], data.total);
          if (percentage === 0) return null;
          
          return (
            <div key={label} className="chart-bar-container">
              <div className="chart-bar-label">{label}</div>
              <div className="chart-bar-wrapper">
                <div 
                  className="chart-bar" 
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: getRandomColor(index)
                  }}
                >
                  <span className="chart-bar-value">
                    {formatCurrency(data.values[index])}
                  </span>
                </div>
              </div>
              <div className="chart-bar-percentage">{percentage}%</div>
            </div>
          );
        })}
      </div>
    );
  };
  
  const renderNetWorthChart = () => {
    const data = getCurrentReportData();
    if (!data || reportType !== 'networth') return null;
    
    const maxValue = Math.max(...data.values) * 1.1; // Add 10% padding
    
    return (
      <div className="line-chart-container">
        <div className="line-chart-grid">
          <div className="line-chart-markers">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="line-chart-marker">
                {Math.round(maxValue - (i * (maxValue / 3))).toFixed(1)} ETH
              </div>
            ))}
          </div>
          
          <div className="line-chart">
            <svg width="100%" height="200" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(79, 70, 229, 0.8)" />
                  <stop offset="100%" stopColor="rgba(79, 70, 229, 0.1)" />
                </linearGradient>
              </defs>
              
              {/* Area under the line */}
              <path
                d={`
                  M0,${100 - (data.values[0] / maxValue) * 100}
                  ${data.values.map((value, i) => {
                    const x = (i / (data.values.length - 1)) * 100;
                    const y = 100 - (value / maxValue) * 100;
                    return `L${x},${y}`;
                  }).join(' ')}
                  L100,100 L0,100 Z
                `}
                fill="url(#gradient)"
                opacity="0.7"
              />
              
              {/* Line chart */}
              <path
                d={`
                  M0,${100 - (data.values[0] / maxValue) * 100}
                  ${data.values.map((value, i) => {
                    const x = (i / (data.values.length - 1)) * 100;
                    const y = 100 - (value / maxValue) * 100;
                    return `L${x},${y}`;
                  }).join(' ')}
                `}
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2"
              />
              
              {/* Data points */}
              {data.values.map((value, i) => {
                const x = (i / (data.values.length - 1)) * 100;
                const y = 100 - (value / maxValue) * 100;
                return (
                  <circle 
                    key={i} 
                    cx={x} 
                    cy={y} 
                    r="2" 
                    fill="white" 
                    stroke="var(--primary)"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>
          </div>
        </div>
        
        <div className="line-chart-labels">
          {data.labels.map((label, i) => (
            <div key={label} className="line-chart-label">{label}</div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="page-container reports-container">
      <div className="page-header">
        <h1 className="page-title">Reports</h1>
        <div className="page-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowSaveReport(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Save Report
          </button>
          <button className="btn btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export
          </button>
        </div>
      </div>
      
      <div className="page-card controls-card">
        <div className="report-controls">
          <div className="report-control-group">
            <label>Report Type</label>
            <div className="report-toggle">
              <button 
                className={`toggle-btn ${reportType === 'spending' ? 'active' : ''}`}
                onClick={() => setReportType('spending')}
              >
                Spending
              </button>
              <button 
                className={`toggle-btn ${reportType === 'income' ? 'active' : ''}`}
                onClick={() => setReportType('income')}
              >
                Income
              </button>
              <button 
                className={`toggle-btn ${reportType === 'networth' ? 'active' : ''}`}
                onClick={() => setReportType('networth')}
              >
                Net Worth
              </button>
            </div>
          </div>
          
          <div className="report-control-group">
            <label>Time Range</label>
            <div className="report-toggle">
              <button 
                className={`toggle-btn ${timeRange === 'month' ? 'active' : ''}`}
                onClick={() => setTimeRange('month')}
              >
                Monthly
              </button>
              <button 
                className={`toggle-btn ${timeRange === 'quarter' ? 'active' : ''}`}
                onClick={() => setTimeRange('quarter')}
              >
                Quarterly
              </button>
              <button 
                className={`toggle-btn ${timeRange === 'year' ? 'active' : ''}`}
                onClick={() => setTimeRange('year')}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="page-card">
          <div className="empty-state">
            <div className="empty-state-icon">⏳</div>
            <div className="empty-state-title">Loading report data...</div>
            <div className="empty-state-text">Please wait while we generate your report.</div>
          </div>
        </div>
      ) : (
        <>
          <div className="page-card">
            <div className="page-card-header">
              <h2 className="page-card-title">{getReportTitle()}</h2>
              <div className="report-date">June 2023</div>
            </div>
            
            <div className="report-summary">
              <div className="summary-stat">
                <div className="summary-stat-label">Total {reportType === 'networth' ? 'Value' : reportType}</div>
                <div className="summary-stat-value">{formatCurrency(getCurrentReportData().total)}</div>
                <div className={`summary-stat-change ${getCurrentReportData().change > 0 ? 'positive' : 'negative'}`}>
                  {getCurrentReportData().change > 0 ? '↑' : '↓'} {getCurrentReportData().change}% from previous {timeRange}
                </div>
              </div>
              
              <div className="summary-stat">
                <div className="summary-stat-label">USD Value</div>
                <div className="summary-stat-value">${(getCurrentReportData().total * 2842.15).toFixed(2)}</div>
                <div className="summary-stat-secondary">@ $2,842.15 per ETH</div>
              </div>
              
              <div className="summary-stat">
                <div className="summary-stat-label">Number of Categories</div>
                <div className="summary-stat-value">{getCurrentReportData().labels.length}</div>
              </div>
            </div>
            
            <div className="report-visualization">
              {reportType === 'networth' ? renderNetWorthChart() : renderChartBars()}
            </div>
          </div>
          
          <div className="form-grid">
            <div className="page-card">
              <div className="page-card-header">
                <h2 className="page-card-title">Recommendations</h2>
              </div>
              
              <div className="recommendations-list">
                {reportType === 'spending' && (
                  <>
                    <div className="recommendation-item">
                      <div className="recommendation-icon warning">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                          <line x1="12" y1="9" x2="12" y2="13"></line>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                      </div>
                      <div className="recommendation-content">
                        <div className="recommendation-title">High DeFi Investment Spending</div>
                        <div className="recommendation-text">
                          Your DeFi investments account for {calculatePercentage(getCurrentReportData().values[1], getCurrentReportData().total)}% of your total spending. Consider diversifying your investments across multiple protocols.
                        </div>
                      </div>
                    </div>
                    <div className="recommendation-item">
                      <div className="recommendation-icon success">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <div className="recommendation-content">
                        <div className="recommendation-title">Gas Fee Optimization</div>
                        <div className="recommendation-text">
                          Your gas fees are well optimized. Consider using our Gas Tracker to continue monitoring and optimizing transaction costs.
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {reportType === 'income' && (
                  <>
                    <div className="recommendation-item">
                      <div className="recommendation-icon success">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <div className="recommendation-content">
                        <div className="recommendation-title">DeFi Yield Performance</div>
                        <div className="recommendation-text">
                          Your DeFi yield strategy is performing well. Consider allocating more of your portfolio to yield-generating assets.
                        </div>
                      </div>
                    </div>
                    <div className="recommendation-item">
                      <div className="recommendation-icon info">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                      </div>
                      <div className="recommendation-content">
                        <div className="recommendation-title">Income Diversification</div>
                        <div className="recommendation-text">
                          Consider exploring other income sources such as liquid staking or participating in protocol governance to earn additional rewards.
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {reportType === 'networth' && (
                  <>
                    <div className="recommendation-item">
                      <div className="recommendation-icon success">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <div className="recommendation-content">
                        <div className="recommendation-title">Positive Growth Trend</div>
                        <div className="recommendation-text">
                          Your net worth has increased by {getCurrentReportData().change}% over the last {timeRange}. Keep up the good investment strategy.
                        </div>
                      </div>
                    </div>
                    <div className="recommendation-item">
                      <div className="recommendation-icon info">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                      </div>
                      <div className="recommendation-content">
                        <div className="recommendation-title">Portfolio Rebalancing</div>
                        <div className="recommendation-text">
                          Consider rebalancing your portfolio to maintain optimal risk exposure as your net worth grows.
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="page-card">
              <div className="page-card-header">
                <h2 className="page-card-title">Saved Reports</h2>
              </div>
              
              <div className="saved-reports-list">
                <div className="saved-report-item">
                  <div className="saved-report-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div className="saved-report-details">
                    <div className="saved-report-title">Monthly Spending Report</div>
                    <div className="saved-report-date">May 2023</div>
                  </div>
                  <div className="saved-report-actions">
                    <button className="btn btn-secondary btn-sm">View</button>
                  </div>
                </div>
                
                <div className="saved-report-item">
                  <div className="saved-report-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div className="saved-report-details">
                    <div className="saved-report-title">Quarterly Income Report</div>
                    <div className="saved-report-date">Q1 2023</div>
                  </div>
                  <div className="saved-report-actions">
                    <button className="btn btn-secondary btn-sm">View</button>
                  </div>
                </div>
                
                <div className="saved-report-item">
                  <div className="saved-report-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div className="saved-report-details">
                    <div className="saved-report-title">Annual Net Worth Analysis</div>
                    <div className="saved-report-date">2022</div>
                  </div>
                  <div className="saved-report-actions">
                    <button className="btn btn-secondary btn-sm">View</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {showSaveReport && (
        <div className="modal-overlay" onClick={() => setShowSaveReport(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Save Report</h3>
              <button className="modal-close" onClick={() => setShowSaveReport(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-control">
                <label htmlFor="report-name">Report Name</label>
                <input 
                  type="text" 
                  id="report-name" 
                  placeholder="Enter report name"
                  defaultValue={getReportTitle()}
                />
              </div>
              
              <div className="form-control">
                <label htmlFor="report-description">Description (Optional)</label>
                <textarea 
                  id="report-description" 
                  placeholder="Add a brief description"
                  rows="3"
                ></textarea>
              </div>
              
              <div className="form-control">
                <label htmlFor="report-format">Export Format</label>
                <select id="report-format">
                  <option value="pdf">PDF Document</option>
                  <option value="csv">CSV Spreadsheet</option>
                  <option value="json">JSON Data</option>
                </select>
              </div>
              
              <div className="form-actions">
                <button className="btn btn-secondary" onClick={() => setShowSaveReport(false)}>Cancel</button>
                <button className="btn btn-primary">Save Report</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
