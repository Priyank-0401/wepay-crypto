import React, { useState, useEffect } from 'react';
import '../styles/Pages.css';
import '../styles/Budgets.css';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('');
  
  useEffect(() => {
    const fetchBudgets = async () => {
      setLoading(true);
      try {
        // Get current month for display
        const now = new Date();
        setCurrentMonth(now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
        
        // Mock data for budgets
        const mockBudgets = [
          {
            id: '1',
            category: 'Trading',
            allocated: 2.5,
            spent: 1.75,
            remaining: 0.75,
            currency: 'ETH',
            period: 'Monthly',
            transactions: 12
          },
          {
            id: '2',
            category: 'DeFi Investments',
            allocated: 5.0,
            spent: 5.0,
            remaining: 0.0,
            currency: 'ETH',
            period: 'Monthly',
            transactions: 8
          },
          {
            id: '3',
            category: 'NFT Purchases',
            allocated: 1.0,
            spent: 0.2,
            remaining: 0.8,
            currency: 'ETH',
            period: 'Monthly',
            transactions: 2
          },
          {
            id: '4',
            category: 'Gas Fees',
            allocated: 0.5,
            spent: 0.35,
            remaining: 0.15,
            currency: 'ETH',
            period: 'Monthly',
            transactions: 25
          }
        ];
        
        setBudgets(mockBudgets);
      } catch (error) {
        console.error('Error fetching budgets:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBudgets();
  }, []);

  // Calculate the percentage spent for progress bars
  const calculatePercentage = (spent, allocated) => {
    return Math.min(Math.round((spent / allocated) * 100), 100);
  };
  
  // Get the appropriate color for the progress bar based on percentage spent
  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'var(--danger)';
    if (percentage >= 75) return 'var(--warning)';
    return 'var(--success)';
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Budgets</h1>
        <div className="page-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddBudget(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New Budget
          </button>
          <button className="btn btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Budget History
          </button>
        </div>
      </div>
      
      <div className="page-card">
        <div className="page-card-header">
          <h2 className="page-card-title">Budget Summary for {currentMonth}</h2>
        </div>
        
        <div className="budget-summary-grid">
          <div className="budget-summary-card">
            <div className="summary-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <div className="summary-label">Total Budget</div>
            <div className="summary-value">9.00 ETH</div>
            <div className="summary-subtitle">${(9 * 2842.15).toFixed(2)}</div>
          </div>
          
          <div className="budget-summary-card">
            <div className="summary-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
            <div className="summary-label">Spent So Far</div>
            <div className="summary-value">7.30 ETH</div>
            <div className="summary-subtitle">${(7.3 * 2842.15).toFixed(2)}</div>
          </div>
          
          <div className="budget-summary-card">
            <div className="summary-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                <path d="M20 2a10 10 0 0 1 0 20"></path>
                <path d="M2 12h10v10"></path>
              </svg>
            </div>
            <div className="summary-label">Remaining</div>
            <div className="summary-value">1.70 ETH</div>
            <div className="summary-subtitle">${(1.7 * 2842.15).toFixed(2)}</div>
          </div>
          
          <div className="budget-summary-card">
            <div className="summary-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div className="summary-label">Days Remaining</div>
            <div className="summary-value">12</div>
            <div className="summary-subtitle">in current period</div>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="page-card">
          <div className="empty-state">
            <div className="empty-state-icon">⏳</div>
            <div className="empty-state-title">Loading budgets...</div>
            <div className="empty-state-text">Please wait while we fetch your budget data.</div>
          </div>
        </div>
      ) : (
        <div className="page-card">
          <div className="page-card-header">
            <h2 className="page-card-title">Your Budgets</h2>
          </div>
          
          {budgets.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📊</div>
              <div className="empty-state-title">No budgets found</div>
              <div className="empty-state-text">
                You haven't created any budgets yet. Start managing your crypto spending by creating a budget.
              </div>
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddBudget(true)}
              >
                Create Your First Budget
              </button>
            </div>
          ) : (
            <div className="budgets-list">
              {budgets.map(budget => {
                const percentage = calculatePercentage(budget.spent, budget.allocated);
                const progressColor = getProgressColor(percentage);
                
                return (
                  <div key={budget.id} className="budget-item">
                    <div className="budget-header">
                      <h3 className="budget-category">{budget.category}</h3>
                      <div className="budget-actions">
                        <button className="btn btn-secondary btn-sm">Edit</button>
                      </div>
                    </div>
                    
                    <div className="budget-amounts">
                      <div className="budget-amount-item">
                        <span className="amount-label">Allocated:</span>
                        <span className="amount-value">{budget.allocated} {budget.currency}</span>
                      </div>
                      <div className="budget-amount-item">
                        <span className="amount-label">Spent:</span>
                        <span className="amount-value">{budget.spent} {budget.currency}</span>
                      </div>
                      <div className="budget-amount-item">
                        <span className="amount-label">Remaining:</span>
                        <span className={`amount-value ${budget.remaining === 0 ? 'amount-depleted' : ''}`}>
                          {budget.remaining} {budget.currency}
                        </span>
                      </div>
                    </div>
                    
                    <div className="budget-progress-container">
                      <div 
                        className="budget-progress" 
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: progressColor
                        }}
                      ></div>
                    </div>
                    
                    <div className="budget-stats">
                      <div className="budget-percentage">
                        <span style={{ color: progressColor }}>{percentage}%</span> used
                      </div>
                      <div className="budget-transactions">
                        {budget.transactions} transactions
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      
      {showAddBudget && (
        <div className="modal-overlay" onClick={() => setShowAddBudget(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Budget</h3>
              <button className="modal-close" onClick={() => setShowAddBudget(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-control">
                <label htmlFor="budget-category">Category</label>
                <select id="budget-category">
                  <option value="">Select a category</option>
                  <option value="trading">Trading</option>
                  <option value="defi">DeFi Investments</option>
                  <option value="nft">NFT Purchases</option>
                  <option value="gas">Gas Fees</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-control">
                <label htmlFor="budget-amount">Budget Amount</label>
                <div className="input-group">
                  <input type="number" id="budget-amount" placeholder="0.00" step="0.01" min="0" />
                  <div className="input-suffix">ETH</div>
                </div>
              </div>
              
              <div className="form-control">
                <label htmlFor="budget-period">Budget Period</label>
                <select id="budget-period">
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              
              <div className="form-control">
                <label htmlFor="budget-start">Start Date</label>
                <input type="date" id="budget-start" />
              </div>
              
              <div className="form-actions">
                <button className="btn btn-secondary" onClick={() => setShowAddBudget(false)}>Cancel</button>
                <button className="btn btn-primary">Create Budget</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;
