import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchUserProfile, UserProfile } from '../services/userService';
import '../styles/student.css'; // Import the custom styles
import { CiLogout } from 'react-icons/ci';
import { AiOutlineUser, AiOutlineClose } from 'react-icons/ai';
import { MdAccountBox } from 'react-icons/md';
import { IoMdHelpCircleOutline } from 'react-icons/io'; // Import the help icon

const AdminDashboard = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'account' | 'internshipProgram' | 'normInternship' | 'aicteIntern' | 'payment' | 'calendar'>('account');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [showDashboardImage, setShowDashboardImage] = useState(false); // New state for image visibility
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await fetchUserProfile();
        if (user) {
          setUserProfile(user);
        } else {
          setError('Error fetching user profile. Please try again.');
        }
        setLoading(false);
      } catch (error) {
        setError('Error fetching user profile. Please try again.');
        setLoading(false);
        console.error('Error fetching user profile:', error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (location.pathname.includes('normInternship')) {
      setActiveSection('normInternship');
    }
  }, [location.pathname]);

  const handleSidebarClick = (section: 'account' | 'internshipProgram' | 'normInternship' | 'aicteIntern' | 'payment' | 'calendar') => {
    setActiveSection(section);
    if (section === 'internshipProgram') { // Show image when 'Dashboard' is clicked
      setShowDashboardImage(true);
    } else {
      setShowDashboardImage(false);
    }
  };

  return (
    <div className="flex">
      <div className="sidebar bg-lime-800 text-white w-64 transition-all duration-300 flex flex-col p-4 fixed h-full justify-between">
        <div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 flex items-center justify-center bg-lime-600 rounded-full mb-4">
              <AiOutlineUser size={40} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-100 mb-2">Hi, Rajesh</h2>
            <button
              onClick={() => handleSidebarClick('account')}
              className={`w-full text-left p-2 mt-4 ${activeSection === 'account' ? 'bg-lime-700' : 'bg-lime-800'} hover:bg-lime-600 rounded-md`}
            >
              <MdAccountBox size={24} className="inline mr-2" />
              Account
            </button>
            <button
              onClick={() => handleSidebarClick('internshipProgram')}
              className={`w-full text-left p-2 mt-4 ${activeSection === 'internshipProgram' ? 'bg-lime-700' : 'bg-lime-800'} hover:bg-lime-600 rounded-md`}
            >
              <span className="ml-2">Dashboard</span>
            </button>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsHelpOpen(true)}
            className="bg-gray-800 text-white font-semibold py-2 px-4 rounded hover:bg-gray-700 transition"
            aria-label="Help"
          >
            <IoMdHelpCircleOutline size={24} />
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white font-semibold p-2 rounded hover:bg-red-500 transition"
            aria-label="Logout"
          >
            <CiLogout size={24} />
          </button>
        </div>
      </div>

      <div className="flex-1 ml-64 p-6 relative">
        <img src="https://iimstc.com/wp-content/uploads/2021/10/log.png" alt="Logo" className="absolute top-4 right-4 w-30 h-20" />
        {showDashboardImage && (
          <div className="absolute top-24 right-4">
            <img src="https://ams-multitenant-prod.s3.ap-south-1.amazonaws.com/egenius_multitenant-s3/c8d31366-60d7-4c2b-8c4f-627911d8bdb1/64e9946a-b35d-4d09-a41d-0db31520c180/b2ee9dbb-20d6-4530-ad92-6e3c1503244c/Event/zCFl0wRCwrYseuq6TrbYwzIC9pSoDoOsOkvqlcog.jpg" alt="Dashboard" className="w-200 h-100" />
          </div>
        )}
        {activeSection === 'account' && (
          <div className="mt-6 flex justify-center">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-center">Account Details</h2>
              <table className="table-auto w-300 border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Field</th>
                    <th className="border border-gray-300 px-4 py-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Name</td>
                    <td className="border border-gray-300 px-4 py-2">Rajesh Kumar</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Email</td>
                    <td className="border border-gray-300 px-4 py-2">rajesh.kumar@example.com</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Department</td>
                    <td className="border border-gray-300 px-4 py-2">Computer Science</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Division</td>
                    <td className="border border-gray-300 px-4 py-2">A</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Designation</td>
                    <td className="border border-gray-300 px-4 py-2">HOD </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Address</td>
                    <td className="border border-gray-300 px-4 py-2">123, MG Road, Bengaluru, Karnataka</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Phone Number</td>
                    <td className="border border-gray-300 px-4 py-2">+91 9876543210</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {isHelpOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setIsHelpOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              aria-label="Close Help"
            >
              <AiOutlineClose size={20} />
            </button>
            <h2 className="text-lg font-bold mb-4">Help & Support</h2>
            <p className="text-gray-700">Here you can find help and support for various issues and questions. Contact us if you need further assistance.</p>
            <ul className="mb-4">
              <li>
                <a href="mailto:directoracademic@iimstc.com" className="text-blue-600 hover:underline">
                  directoracademic@iimstc.com
                </a>
                /
                <a href="mailto:aiimscouncil@gmail.com" className="text-blue-600 hover:underline">
                  aiimscouncil@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+918128392438" className="text-blue-600 hover:underline">
                  +91 8128392438
                </a>
              </li>
              <li>
                <a href="tel:+919995606623" className="text-blue-600 hover:underline">
                  +91 9995606623
                </a>
              </li>
              <li>
                <a href="tel:+918138781110" className="text-blue-600 hover:underline">
                  +91 8138781110
                </a>
              </li>
            </ul>
            <p className="text-gray-700">Visit our <a href="https://iimstc.com" className="text-blue-600 hover:underline">website</a> for more information.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
