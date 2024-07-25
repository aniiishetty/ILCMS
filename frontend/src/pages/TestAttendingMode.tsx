import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchUserProfile, updateUserProfile, UserProfile } from '../services/userService';
import '../styles/student.css'; // Import the custom styles
import { CiLogout } from 'react-icons/ci';
import { AiOutlineUser, AiOutlineClose } from 'react-icons/ai';
import { MdAccountBox } from 'react-icons/md';
import { IoMdHelpCircleOutline } from 'react-icons/io'; // Import the help icon
import InternshipProgram from '../components/InternshipProgram';
import NormInternship from '../components/NormInternship'; // Import NormInternship component
import AccountDetails from '../components/AccountDetails';
import AicteInternForm from '../components/AicteInternForm'; // Import AicteInternForm component
import PaymentComponent from '../components/PaymentComponent';
import FullCalendarComponent from '../components/FullCalendarComponent'; // Import the FullCalendarComponent

// Custom event type
type CustomChangeEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | { target: { name: string; value: string | File | null; } };

const TestAttendingMode = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState<UserProfile | null>(null);
  const [activeSection, setActiveSection] = useState<'account' | 'internshipProgram' | 'normInternship' | 'aicteIntern' | 'payment' | 'calendar'>('account');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
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

  const handleEdit = () => {
    setIsEditing(true);
    setEditProfile(userProfile);
  };

  const handleSave = async () => {
    if (editProfile) {
      try {
        const updatedProfile = await updateUserProfile(editProfile);
        setUserProfile(updatedProfile.user);
        setIsEditing(false);
      } catch (error) {
        setError('Error updating profile. Please try again.');
        console.error('Error updating profile:', error);
      }
    }
  };

  const handleChange = (e: CustomChangeEvent) => {
    if (editProfile && 'target' in e) {
      const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
      setEditProfile({
        ...editProfile,
        [name]: value
      });
    }
  };

  const handleSidebarClick = (section: 'account' | 'internshipProgram' | 'normInternship' | 'aicteIntern' | 'payment' | 'calendar') => {
    setActiveSection(section);
  };

  const handleDynamicRoute = (userId: string) => {
    navigate(`/aicteIntern/${userId}`);
  };

  return (
    <div className="flex">
      <div className="sidebar bg-lime-800 text-white w-64 transition-all duration-300 flex flex-col p-4 fixed h-full">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 flex items-center justify-center bg-lime-600 rounded-full mb-4">
            <AiOutlineUser size={40} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-100 mb-2">Hi, {userProfile?.name}</h2>
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
            <span className="ml-2">Sprint Internship Program</span>
          </button>
          <button
            onClick={() => handleSidebarClick('normInternship')}
            className={`w-full text-left p-2 mt-4 ${activeSection === 'normInternship' ? 'bg-lime-700' : 'bg-lime-800'} hover:bg-lime-600 rounded-md`}
          >
            <span>Research Internship Program</span>
          </button>
          <button
            onClick={() => handleSidebarClick('calendar')}
            className={`w-full text-left p-2 mt-4 ${activeSection === 'calendar' ? 'bg-lime-700' : 'bg-lime-800'} hover:bg-lime-600 rounded-md`}
          >
            <span>Daily Logs</span>
          </button>
        </div>
      </div>a

      <div className="flex-1 ml-64 p-6">
        <div className="flex justify-end items-center mb-6">
          <div className="flex items-center space-x-4">
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

        <div className="bg-white p-4 rounded-lg shadow-lg">
          {activeSection === 'account' && userProfile && (
            <AccountDetails
              userProfile={userProfile}
              isEditing={isEditing}
              editProfile={editProfile}
              handleChange={handleChange}
              handleSave={handleSave}
              handleEdit={handleEdit}
            />
          )}
          {activeSection === 'internshipProgram' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-black">Sprint Internship Program</h1>
                <button
                  onClick={() => handleSidebarClick('payment')}
                  className="bg-lime-600 text-white font-semibold py-2 px-4 rounded hover:bg-lime-500 transition"
                  aria-label="Enroll Now"
                >
                  Enroll Now
                </button>
              </div>
              <InternshipProgram />
            </div>
          )}
          {activeSection === 'normInternship' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-black">Research Internship Program</h1>
                <button
                  onClick={() => handleDynamicRoute(userProfile?.id || '')}
                  className="bg-lime-600 text-white font-semibold py-2 px-4 rounded hover:bg-lime-500 transition"
                  aria-label="Enroll Now"
                >
                  Enroll Now
                </button>
              </div>
              <NormInternship />
              
            </>
          )}
          {activeSection === 'aicteIntern' && <AicteInternForm />}
          {activeSection === 'payment' && <PaymentComponent />}
          {activeSection === 'calendar' && <FullCalendarComponent />} {/* Render FullCalendarComponent */}
        </div>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default TestAttendingMode;
