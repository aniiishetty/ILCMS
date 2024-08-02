import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/userService';
import '../styles/tailwind.css';

const User: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    dob: '',
    address: '',
    collegeName: '',
    university: '',
    usn: '',
    verificationType: '',
    verificationId: '',
    gender: '',
    branch: '',
    semester: '',
    phoneNumber: '',
    IIMSTC_ID: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Clear local storage when component mounts
    localStorage.clear();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await loginUser({
          IIMSTC_ID: formData.IIMSTC_ID,
          password: formData.password,
        });
        if (response && response.id) {
          localStorage.setItem('email', response.email);
          navigate('/user', { replace: true });
        } else {
          setMessage('Login failed: Invalid credentials');
        }
      } else {
        const response = await registerUser(formData);
        if (response.data && response.data.message) {
          setMessage(response.data.message);
        } else {
          setMessage('Registration failed: Please try again');
        }
      }
    } catch (error) {
      setMessage(isLogin ? 'Login failed' : 'Registration failed');
    }
  };

  return (
    <div className="relative h-screen">
      <div className="background"></div>
      <div className="container">
        <div className="mb-4 flex justify-center">
          <button
            className={`button mr-2 ${isLogin ? 'button-login' : 'button-register'}`}
            onClick={() => {
              setIsLogin(true);
              setMessage('');
            }}
          >
            Login
          </button>
          <button
            className={`button ${!isLogin ? 'button-login' : 'button-register'}`}
            onClick={() => {
              setIsLogin(false);
              setMessage('');
            }}
          >
            Register
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {isLogin ? (
            <>
              <input
                name="IIMSTC_ID"
                type="text"
                value={formData.IIMSTC_ID}
                onChange={handleChange}
                placeholder="IIMSTC ID"
                className="input"
              />
              <div className="input-container">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="button-show-password"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </>
          ) : (
            <>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="input"
              />
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="input"
              />
              <input
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className="input"
              />
              <input
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="input"
              />
              <input
                name="collegeName"
                type="text"
                value={formData.collegeName}
                onChange={handleChange}
                placeholder="College Name"
                className="input"
              />
              <input
                name="university"
                type="text"
                value={formData.university}
                onChange={handleChange}
                placeholder="University"
                className="input"
              />
              <input
                name="usn"
                type="text"
                value={formData.usn}
                onChange={handleChange}
                placeholder="USN"
                className="input"
              />
              <input
                name="verificationType"
                type="text"
                value={formData.verificationType}
                onChange={handleChange}
                placeholder="Verification Type"
                className="input"
              />
              <input
                name="verificationId"
                type="text"
                value={formData.verificationId}
                onChange={handleChange}
                placeholder="Verification ID"
                className="input"
              />
              <input
                name="gender"
                type="text"
                value={formData.gender}
                onChange={handleChange}
                placeholder="Gender"
                className="input"
              />
              <input
                name="branch"
                type="text"
                value={formData.branch}
                onChange={handleChange}
                placeholder="Branch"
                className="input"
              />
              <input
                name="semester"
                type="text"
                value={formData.semester}
                onChange={handleChange}
                placeholder="Semester"
                className="input"
              />
              <input
                name="phoneNumber"
                type="text"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="input"
              />
            </>
          )}
          <button type="submit" className="button-login">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default User;
