import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = ({ isAuthenticated, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const userEmail = localStorage.getItem('userEmail') || 'User';
  const username = JSON.parse(localStorage.getItem('currentUser') || '{}')?.username || 'User';

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <div className="logo-icon">🧠</div>
            <div className="logo-text">
              <h1>CipherSQLStudio</h1>
              <small>Learn SQL Interactively</small>
            </div>
          </Link>
        </div>
        
        <nav className="nav">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            🏠 Assignments
          </Link>
          
          {isAuthenticated ? (
            <>
              <div className="user-dropdown">
                <button className="user-btn">
                  <span className="user-avatar">
                    {username.charAt(0).toUpperCase()}
                  </span>
                  <span className="user-name">{username}</span>
                </button>
                <div className="dropdown-menu">
                  <div className="user-info">
                    <strong>{username}</strong>
                    <small>{userEmail}</small>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/profile" className="dropdown-item">
                    👤 My Profile
                  </Link>
                  <Link to="/progress" className="dropdown-item">
                    📈 My Progress
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button 
                    className="dropdown-item logout-btn"
                    onClick={handleLogout}
                  >
                    🔒 Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
              >
                🔐 Login
              </Link>
              <Link 
                to="/register" 
                className={`nav-link btn-register ${location.pathname === '/register' ? 'active' : ''}`}
              >
                📝 Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;