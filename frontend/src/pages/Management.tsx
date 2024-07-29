import React, { useState } from 'react';
import { login as adminLogin, register as adminRegister } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import '../styles/tailwind.css';

const Management: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [mode, setMode] = useState<'admin-login' | 'admin-signup'>('admin-login');

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await adminLogin(username, password);
      navigate('/admin-dashboard', { replace: true });
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await adminRegister(username, password);
      setMode('admin-login');
      setUsername('');
      setPassword('');
      setError(null);
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    
    <div className="container">
      
      <div className="background"></div>
      
      <div className="form-container">
        
        {mode === 'admin-login' ? (
          <div>
            
            <h2 className="title">Management Login</h2>
            <form className="form" onSubmit={handleLoginSubmit}>
              {error && <p className="error">{error}</p>}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="input"
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="input"
              />
              <div className="checkbox">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
                <label>Show Password</label>
              </div>
              <button type="submit" className="button">
                Login
              </button>
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  className="link"
                  onClick={() => setMode('admin-signup')}
                >
                  Sign Up
                </button>
              </p>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="title">Management Signup</h2>
            <form className="form" onSubmit={handleSignupSubmit}>
              {error && <p className="error">{error}</p>}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="input"
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="input"
              />
              <div className="checkbox">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
                <label>Show Password</label>
              </div>
              <button type="submit" className="button">
                Signup
              </button>
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  className="link"
                  onClick={() => setMode('admin-login')}
                >
                  Login
                </button>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Management;
