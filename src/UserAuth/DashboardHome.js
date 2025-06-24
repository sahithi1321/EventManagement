import React from 'react';
import { useAuth } from './AuthContext';

const DashboardHome = () => {
  const { currentUser } = useAuth();

  return (
    <div className="dashboard-home">
      <h1 className="welcome-message">
        Welcome back, {currentUser?.firstName || 'User'}!
      </h1>
      <p className="welcome-subtext">
        Here's what's happening with your events today
      </p>
    </div>
  );
};

export default DashboardHome;