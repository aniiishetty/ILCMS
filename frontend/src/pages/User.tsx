import React, { useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  loginUser,
  registerUser,
  verifyOTP,
  fetchColleges,
  fetchDegrees,
  fetchBranches,
  fetchBranchesByDegree,
  fetchDegreeStatusesByDegree,
} from '../services/userService';
import '../styles/tailwind.css';

interface FormData {
  email: string;
  name: string;
  dob: string;
  address: string;
  collegeId: string;
  degreeId: string;
  branchId: string;
  degreeStatusId: string;
  university: string;
  usn: string;
  aadharNo: string;
  gender: string;
  semester: string;
  phoneNumber: string;
  IIMSTC_ID: string;
  password: string;
  passportPhoto: File | null;
  aadharProof: File | null;
}

const User: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    dob: '',
    address: '',
    collegeId: '',
    degreeId: '',
    branchId: '',
    degreeStatusId: '',
    university: '',
    usn: '',
    aadharNo: '',
    gender: '',
    semester: '',
    phoneNumber: '',
    IIMSTC_ID: '',
    password: '',
    passportPhoto: null,
    aadharProof: null,
  });
  const [colleges, setColleges] = useState<{ id: string; name: string }[]>([]);
  const [degrees, setDegrees] = useState<{ DegreeName: ReactNode; id: string; name: string }[]>([]);
  const [branches, setBranches] = useState<{ BranchName: ReactNode; id: string; name: string }[]>([]);
  const [filteredBranches, setFilteredBranches] = useState<{ BranchName: ReactNode; BranchID: string; name: string }[]>([]);
  const [degreeStatuses, setDegreeStatuses] = useState<{ DegreeStatusID: string; StatusName: string }[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();

    fetchColleges()
      .then(data => {
        if (Array.isArray(data)) {
          const sortedColleges = data.sort((a, b) => a.name.localeCompare(b.name));
          setColleges(sortedColleges);
        } else {
          console.error('Unexpected response structure:', data);
        }
      })
      .catch(error => console.error('Error fetching colleges:', error));

    fetchDegrees()
      .then(data => {
        if (Array.isArray(data)) {
          setDegrees(data);
        } else {
          console.error('Unexpected response structure:', data);
        }
      })
      .catch(error => console.error('Error fetching degrees:', error));

    fetchBranches()
      .then(data => {
        if (Array.isArray(data)) {
          setBranches(data);
        } else {
          console.error('Unexpected response structure:', data);
        }
      })
      .catch(error => console.error('Error fetching branches:', error));
  }, []);

  useEffect(() => {
    if (formData.degreeId) {
      fetchBranchesByDegree(formData.degreeId)
        .then(data => {
          if (Array.isArray(data)) {
            setFilteredBranches(data);
          } else {
            console.error('Unexpected response structure:', data);
          }
        })
        .catch(error => console.error('Error fetching branches:', error));

      fetchDegreeStatusesByDegree(formData.degreeId)
        .then(data => {
          if (Array.isArray(data)) {
            setDegreeStatuses(data);
          } else {
            console.error('Unexpected response structure:', data);
          }
        })
        .catch(error => console.error('Error fetching degree statuses:', error));
    } else {
      setFilteredBranches([]);
      setDegreeStatuses([]);
    }
  }, [formData.degreeId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement) {
      if (e.target.type === 'file') {
        const files = (e.target as HTMLInputElement).files;
        setFormData(prevData => ({
          ...prevData,
          [name]: files ? files[0] : null,
        }));
      } else {
        setFormData(prevData => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key as keyof FormData] !== null) {
        formDataToSend.append(key, formData[key as keyof FormData] as string | Blob);
      }
    }
  
    try {
      if (isLogin) {
        // Handling login
        const response = await loginUser({
          IIMSTC_ID: formData.IIMSTC_ID,
          password: formData.password,
        });
  
        if (response && response.message === 'Login successful') {
          // Store user credentials in local storage
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
  
          // Navigate to the user page
          navigate('/user', { replace: true });
        } else {
          setMessage('Login failed: Invalid credentials');
        }
      } else {
        // Handling registration
        const response = await registerUser(formDataToSend);
        console.log('Registration Response:', response); // Log the response to understand its structure
        if (response && response.message) {
          setMessage('Please verify your account by entering the OTP sent to your email ID.');
          setIsVerifying(true);
        } else {
          setMessage('Registration failed: Please try again');
        }
      }
    } catch (error) {
      console.error('Error during submission:', error);
      setMessage(isLogin ? 'Login failed' : 'Registration failed');
    }
  };
  

  const handleVerifyOtp = async () => {
    try {
      const response = await verifyOTP({ email: formData.email, otp });
      if (response.data && response.data.success) {
        setMessage('Verification successful! Check your email for your credentials.');
        setIsVerifying(false);
      } else {
        setMessage('Verification successful! Check your email for your credentials..');
      }
    } catch (error) {
      setMessage('OTP verification failed. Please try again.');
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
              setIsVerifying(false);
            }}
          >
            Login
          </button>
          <button
            className={`button ${!isLogin ? 'button-login' : 'button-register'}`}
            onClick={() => {
              setIsLogin(false);
              setMessage('');
              setIsVerifying(false);
            }}
          >
            Register
          </button>
        </div>
        {isVerifying ? (
          <div className="verification-container">
            <input
              name="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="input"
            />
            <button type="button" onClick={handleVerifyOtp} className="button-submit">
              Verify OTP
            </button>
          </div>
        ) : (
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
                  placeholder="Full Name"
                  className="input"
                />
                <input
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  placeholder="Date of Birth"
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
                <select name="collegeId" value={formData.collegeId} onChange={handleChange} className="input">
                  <option value="">Select College</option>
                  {colleges.map(college => (
                    <option key={college.id} value={college.id}>
                      {college.name}
                    </option>
                  ))}
                </select>
                <select name="degreeId" value={formData.degreeId} onChange={handleChange} className="input">
                  <option value="">Select Degree</option>
                  {degrees.map(degree => (
                    <option key={degree.id} value={degree.id}>
                      {degree.DegreeName}
                    </option>
                  ))}
                </select>
                <select name="branchId" value={formData.branchId} onChange={handleChange} className="input">
                  <option value="">Select Branch</option>
                  {filteredBranches.map(branch => (
                    <option key={branch.BranchID} value={branch.BranchID}>
                      {branch.BranchName}
                    </option>
                  ))}
                </select>
                <select name="degreeStatusId" value={formData.degreeStatusId} onChange={handleChange} className="input">
                  <option value="">Select Degree Status</option>
                  {degreeStatuses.map(status => (
                    <option key={status.DegreeStatusID} value={status.DegreeStatusID}>
                      {status.StatusName}
                    </option>
                  ))}
                </select>
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
                  name="aadharNo"
                  type="text"
                  value={formData.aadharNo}
                  onChange={handleChange}
                  placeholder="Aadhar No."
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
                <input
                  name="passportPhoto"
                  type="file"
                  onChange={handleChange}
                  className="input"
                />
                <input
                  name="aadharProof"
                  type="file"
                  onChange={handleChange}
                  className="input"
                />
              </>
            )}
            <button type="submit" className="button-submit">
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default User;
