import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.scss';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms agreement validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMessage('');
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user already exists (demo simulation)
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userExists = existingUsers.some(user => 
        user.email === formData.email || user.username === formData.username
      );
      
      if (userExists) {
        throw new Error('User with this email or username already exists');
      }
      
      // Save user to localStorage (in real app, this would be backend)
      const newUser = {
        id: Date.now(),
        username: formData.username,
        email: formData.email,
        createdAt: new Date().toISOString()
      };
      
      existingUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
      
      // Store user data
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('isLoggedIn', 'true');
      
      setSuccessMessage('🎉 Registration successful! Redirecting...');
      
      // Redirect to home page after 2 seconds
      setTimeout(() => {
        navigate('/');
        window.location.reload(); // Refresh to update auth state
      }, 2000);
      
    } catch (error) {
      console.error('Registration error:', error);
      setServerError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoRegistration = () => {
    setFormData({
      username: 'sql_learner',
      email: 'demo@example.com',
      password: 'Password123',
      confirmPassword: 'Password123',
      agreeTerms: true
    });
    
    // Clear any existing errors
    setErrors({});
    setServerError('');
  };

  const passwordStrength = () => {
    if (!formData.password) return 0;
    
    let strength = 0;
    if (formData.password.length >= 6) strength += 1;
    if (/[a-z]/.test(formData.password)) strength += 1;
    if (/[A-Z]/.test(formData.password)) strength += 1;
    if (/\d/.test(formData.password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(formData.password)) strength += 1;
    
    return strength;
  };

  const getPasswordStrengthText = () => {
    const strength = passwordStrength();
    if (strength === 0) return 'No password';
    if (strength <= 2) return 'Weak';
    if (strength === 3) return 'Fair';
    if (strength === 4) return 'Good';
    return 'Strong';
  };

  const getPasswordStrengthColor = () => {
    const strength = passwordStrength();
    if (strength <= 2) return '#ef4444';
    if (strength === 3) return '#f59e0b';
    if (strength === 4) return '#10b981';
    return '#059669';
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join CipherSQLStudio and start your SQL learning journey</p>
        </div>

        {serverError && (
          <div className="alert alert-error">
            <span>❌</span>
            <p>{serverError}</p>
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success">
            <span>✅</span>
            <p>{successMessage}</p>
          </div>
        )}

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              Username <span className="required">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              disabled={loading}
              className={errors.username ? 'error' : ''}
            />
            {errors.username && (
              <div className="error-message">
                <span>⚠️</span> {errors.username}
              </div>
            )}
            <div className="input-hint">
              <small>3-20 characters, letters, numbers, and underscores only</small>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={loading}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <div className="error-message">
                <span>⚠️</span> {errors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password <span className="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              disabled={loading}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && (
              <div className="error-message">
                <span>⚠️</span> {errors.password}
              </div>
            )}
            
            {formData.password && (
              <div className="password-strength">
                <div className="strength-meter">
                  <div 
                    className="strength-bar"
                    style={{
                      width: `${passwordStrength() * 20}%`,
                      backgroundColor: getPasswordStrengthColor()
                    }}
                  ></div>
                </div>
                <div className="strength-info">
                  <span>Strength: </span>
                  <strong style={{ color: getPasswordStrengthColor() }}>
                    {getPasswordStrengthText()}
                  </strong>
                </div>
              </div>
            )}
            
            <div className="password-requirements">
              <small>Password must contain:</small>
              <ul>
                <li className={formData.password.length >= 6 ? 'met' : ''}>
                  At least 6 characters
                </li>
                <li className={/[a-z]/.test(formData.password) ? 'met' : ''}>
                  One lowercase letter
                </li>
                <li className={/[A-Z]/.test(formData.password) ? 'met' : ''}>
                  One uppercase letter
                </li>
                <li className={/\d/.test(formData.password) ? 'met' : ''}>
                  One number
                </li>
              </ul>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm Password <span className="required">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              disabled={loading}
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && (
              <div className="error-message">
                <span>⚠️</span> {errors.confirmPassword}
              </div>
            )}
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                disabled={loading}
                className={errors.agreeTerms ? 'error' : ''}
              />
              <span>
                I agree to the{' '}
                <Link to="/terms" className="link">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="link">
                  Privacy Policy
                </Link>{' '}
                <span className="required">*</span>
              </span>
            </label>
            {errors.agreeTerms && (
              <div className="error-message">
                <span>⚠️</span> {errors.agreeTerms}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-small"></span>
                Creating Account...
              </>
            ) : 'Create Account'}
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <button 
            type="button" 
            className="btn btn-secondary btn-block"
            onClick={handleDemoRegistration}
            disabled={loading}
          >
            Fill Demo Data
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="link">
              Sign in here
            </Link>
          </p>
          
          <div className="benefits">
            <h4>🎯 Benefits of joining:</h4>
            <ul>
              <li>Track your SQL learning progress</li>
              <li>Save your query attempts</li>
              <li>Earn achievement badges</li>
              <li>Access advanced assignments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;