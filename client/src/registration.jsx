import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('User Profile:', decoded);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSuccessMessage('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok && data.redirect) {
        setSuccessMessage('Registration successful! Redirecting...');
        setTimeout(() => navigate(data.redirect), 1500);
      } else if (!response.ok) {
        setErrors({
          submit: data.message || 'Registration failed. Please try again.',
        });
      }
    } catch (error) {
      console.log(error);
      setErrors({
        submit: 'Something went wrong. Please ensure the server is running.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <nav className="nav">
        <div className="nav-content">
          <h1>ImageHub</h1>
          <div className="nav-links">
            <Link to="/">
              <button>Home</button>
            </Link>
            <Link to="/search">
              <button>Search</button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="form-container">
          <h2>Create Your Account</h2>

          {successMessage && (
            <div className="success-message">✓ {successMessage}</div>
          )}

          {errors.submit && (
            <div className="error-message">✕ {errors.submit}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                className={errors.email ? 'error' : ''}
                disabled={isLoading}
              />
              {errors.email && (
                <div className="error-message">✕ {errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                className={errors.password ? 'error' : ''}
                disabled={isLoading}
              />
              {errors.password && (
                <div className="error-message">✕ {errors.password}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword)
                    setErrors({ ...errors, confirmPassword: '' });
                }}
                className={errors.confirmPassword ? 'error' : ''}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <div className="error-message">✕ {errors.confirmPassword}</div>
              )}
            </div>

            <button type="submit" className="form-submit" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1.5rem',
            }}
          >
            {/* <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => console.log('Login Failed')}
              useOneTap
            /> */}
            <p style={{ color: 'var(--text-light)', textAlign: 'center' }}>
              Already have an account?{' '}
              <Link to="/" style={{ color: 'var(--primary)' }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
