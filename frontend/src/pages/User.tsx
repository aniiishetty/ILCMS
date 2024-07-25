import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as userLogin, register as userRegister } from '../services/userService';
import '../styles/tailwind.css';

const User: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [university, setUniversity] = useState('');
  const [usn, setUsn] = useState('');
  const [verificationType, setVerificationType] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [gender, setGender] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'user-login' | 'user-signup'>('user-login');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await userLogin(email, password);
      navigate('/user');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const userDetails = {
        name: username,
        email,
        dob,
        address,
        collegeName,
        university,
        usn,
        verificationType,
        verificationId,
        password,
        gender,
        branch,
        semester,
        phoneNumber,
      };
      await userRegister(userDetails);
      setMode('user-login');
      setUsername('');
      setPassword('');
      setEmail('');
      setDob('');
      setAddress('');
      setCollegeName('');
      setUniversity('');
      setUsn('');
      setVerificationType('');
      setVerificationId('');
      setGender('');
      setBranch('');
      setSemester('');
      setPhoneNumber('');
      setError(null);
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="container">
      <img src="https://iimstc.com/wp-content/uploads/2021/10/log.png" alt="Logo" className="absolute top-4 right-4 w-29 h-20" />
      <div className="background"></div>
      <div className="form-container">
        {mode === 'user-login' ? (
          <div>
            <h2 className="title">User Login</h2>
            <form className="form" onSubmit={handleLoginSubmit}>
              {error && <p className="error">{error}</p>}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
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
                  onClick={() => setMode('user-signup')}
                >
                  Sign Up
                </button>
              </p>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="title">User Signup</h2>
            <form className="form" onSubmit={handleSignupSubmit}>
              {error && <p className="error">{error}</p>}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Name"
                required
                className="input input-sm"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="input input-sm"
              />
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="Date of Birth"
                required
                className="input input-sm"
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                required
                className="input input-sm"
              />
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                placeholder="College Name"
                required
                className="input input-sm"
              />
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="University"
                required
                className="input input-sm"
              />
              <input
                type="text"
                value={usn}
                onChange={(e) => setUsn(e.target.value)}
                placeholder="USN"
                required
                className="input input-sm"
              />
              <input
                type="text"
                value={verificationType}
                onChange={(e) => setVerificationType(e.target.value)}
                placeholder="Verification Type"
                required
                className="input input-sm"
              />
              <input
                type="text"
                value={verificationId}
                onChange={(e) => setVerificationId(e.target.value)}
                placeholder="Verification ID"
                required
                className="input input-sm"
              />
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Gender"
                required
                className="input input-sm"
              />
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="Branch"
                required
                className="input input-sm"
              />
              <input
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="Semester"
                required
                className="input input-sm"
              />
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                required
                className="input input-sm"
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="input input-sm"
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
                  onClick={() => setMode('user-login')}
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

export default User;
