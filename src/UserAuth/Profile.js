import React from 'react';
import { useAuth } from './AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="profile-content">
      <div className="profile-header">
        <h1 className="profile-title">User Profile</h1>
      </div>
      
      {currentUser && (
        <div className="profile-details">
          <div className="profile-section">
            <h2>Personal Information</h2>
            <div className="profile-row">
              <span className="profile-label">First Name:</span>
              <span className="profile-value">{currentUser.firstName || 'Not provided'}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Last Name:</span>
              <span className="profile-value">{currentUser.lastName || 'Not provided'}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{currentUser.email}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Mobile:</span>
              <span className="profile-value">{currentUser.mobile || 'Not provided'}</span>
            </div>
          </div>

          <div className="profile-section">
            <h2>Activity</h2>
            <div className="profile-row">
              <span className="profile-label">Recent Visits:</span>
              <span className="profile-value">5 events</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Booked Events:</span>
              <span className="profile-value">3 upcoming</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Payments:</span>
              <span className="profile-value">$450 total</span>
            </div>
          </div>

          <div className="profile-section">
            <h2>Account Information</h2>
            <div className="profile-row">
              <span className="profile-label">Member Since:</span>
              <span className="profile-value">
                {new Date(currentUser.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Account Status:</span>
              <span className="profile-value">Active</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;