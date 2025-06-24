import React, { useState } from 'react';
import { useAuth } from '../UserAuth/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/header';
import './Dashboard.css';
import Profile from './Profile';
import DashboardHome from './DashboardHome';
import DashboardBookings from './DashboardBookings';
import DashboardPayments from './DashboardPayments';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/UserAuth/UserSignIn');
  };

  const renderContent = () => {
    switch(activeView) {
      case 'profile':
        return <Profile />;
      case 'bookings':
        return <DashboardBookings />;
      case 'payments':
        return <DashboardPayments />;
      case 'dashboard':
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="dashboard-container">
      <Header />
      
      <div className="dashboard-main">
        <div className="dashboard-left-panel">
          <div className="user-profile-card">
            <div className="profile-pic-container">
              <div className="profile-pic-placeholder">
                {currentUser?.firstName?.charAt(0)}{currentUser?.lastName?.charAt(0)}
              </div>
              <h3>{currentUser?.firstName} {currentUser?.lastName}</h3>
              <p className="user-email">{currentUser?.email}</p>
            </div>
            
            <div className="user-menu">
              <ul className="menu-items">
                <li 
                  className={`menu-item ${activeView === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setActiveView('dashboard')}
                >
                  <span className="menu-icon">🏠</span> Home
                </li>
                <li 
                  className={`menu-item ${activeView === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveView('profile')}
                >
                  <span className="menu-icon">👤</span> Profile
                </li>
                <li 
                  className={`menu-item ${activeView === 'bookings' ? 'active' : ''}`}
                  onClick={() => setActiveView('bookings')}
                >
                  <span className="menu-icon">🎟️</span> Bookings
                </li>
                <li 
                  className={`menu-item ${activeView === 'payments' ? 'active' : ''}`}
                  onClick={() => setActiveView('payments')}
                >
                  <span className="menu-icon">💳</span> Payments
                </li>
                <li 
                  className="menu-item logout-item" 
                  onClick={handleLogout}
                >
                  <span className="menu-icon">🚪</span> Logout
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="dashboard-right-panel">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;