import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.scss';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account and track your progress</p>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-avatar-section">
              <div className="avatar-large">
                {user.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="avatar-info">
                <h2>{user.username}</h2>
                <p className="email">{user.email}</p>
                <p className="member-since">
                  Member since: {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="stats-section">
              <h3>Learning Statistics</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Assignments Completed</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Total Queries Executed</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">Beginner</div>
                  <div className="stat-label">Current Level</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Achievement Badges</div>
                </div>
              </div>
            </div>

            <div className="actions-section">
              <h3>Account Actions</h3>
              <div className="actions-grid">
                <button className="action-btn">
                  ✏️ Edit Profile
                </button>
                <button className="action-btn">
                  🔑 Change Password
                </button>
                <button className="action-btn">
                  📧 Email Settings
                </button>
                <button className="action-btn danger">
                  🗑️ Delete Account
                </button>
              </div>
            </div>
          </div>

          <div className="progress-card">
            <h3>Learning Progress</h3>
            <div className="progress-section">
              <div className="progress-item">
                <div className="progress-header">
                  <span>Beginner Level</span>
                  <span>0/3 completed</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
                </div>
              </div>
              
              <div className="progress-item">
                <div className="progress-header">
                  <span>Intermediate Level</span>
                  <span>0/3 completed</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
                </div>
              </div>
              
              <div className="progress-item">
                <div className="progress-header">
                  <span>Advanced Level</span>
                  <span>0/3 completed</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="recent-activity">
              <h4>Recent Activity</h4>
              <div className="activity-empty">
                <p>No activity yet. Start practicing SQL!</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/')}
                >
                  Browse Assignments
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;