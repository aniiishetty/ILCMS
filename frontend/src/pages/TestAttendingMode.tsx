import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchUserProfile, updateUserProfile, UserProfile } from '../services/userService';
import '../styles/student.css'; // Import the custom styles
import { CiLogout } from 'react-icons/ci';
import { AiOutlineUser, AiOutlineClose } from 'react-icons/ai';
import { MdAccountBox } from 'react-icons/md';
import { IoMdHelpCircleOutline } from 'react-icons/io'; // Import the help icon
import { FaTools } from 'react-icons/fa'; // Import the work in progress icon
import InternshipProgram from '../components/InternshipProgram';
import NormInternship from '../components/NormInternship'; // Import NormInternship component
import AccountDetails from '../components/AccountDetails';
import AICTE from '../components/AICTE'; // Import AicteInternForm component
import PaymentComponent from '../components/PaymentComponent';
import FullCalendarComponent from '../components/FullCalendarComponent'; // Import the FullCalendarComponent
import axios from 'axios';
import PreScreening from '../components/PreScreening'; // Import PreScreening component


// Custom event type
type CustomChangeEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | { target: { name: string; value: string | File | null; } };

const TestAttendingMode = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState<UserProfile | null>(null);
  const [activeSection, setActiveSection] = useState<'account' | 'internshipProgram' | 'normInternship' | 'aicteIntern' | 'payment' | 'calendar' | 'preScreening'>('account');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [aicteFormSubmitted, setAicteFormSubmitted] = useState(false); // Add this state variable
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

  const handleSidebarClick = (section: 'account' | 'internshipProgram' | 'normInternship' | 'aicteIntern' | 'payment' | 'calendar' | 'preScreening') => {
    setActiveSection(section);
  };

  const handleAicteFormSubmit = () => {
    setAicteFormSubmitted(true);
  };

  return (
    <div className="relative flex">
      {/* Logo positioned absolutely at the top right */}
      <img 
        src="https://iimstc.com/wp-content/uploads/2021/10/log.png" 
        alt="Logo" 
        className="absolute top-4 right-4 w-30 h-20" 
      />

      <div className="sidebar bg-lime-800 text-white w-64 transition-all duration-300 flex flex-col p-4 fixed h-full z-10">
        <div className="flex flex-col items-center flex-1">
          <div className="flex flex-col flex-1">
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
            {aicteFormSubmitted && (
              <button
                onClick={() => handleSidebarClick('calendar')}
                className={`w-full text-left p-2 mt-4 ${activeSection === 'calendar' ? 'bg-lime-700' : 'bg-lime-800'} hover:bg-lime-600 rounded-md`}
              >
                <span>Daily Logs</span>
              </button>
            )}
            <button
              onClick={() => handleSidebarClick('preScreening')}
              className={`w-full text-left p-2 mt-4 ${activeSection === 'preScreening' ? 'bg-lime-700' : 'bg-lime-800'} hover:bg-lime-600 rounded-md`}
            >
              <span>Pre Screening Form</span>
            </button>
          </div>
          <div className="mt-auto">
            <div className="flex justify-center mb-4">
              <button
                onClick={() => setIsHelpOpen(true)}
                className="bg-gray-800 text-white font-semibold py-2 px-4 rounded hover:bg-gray-700 transition"
                aria-label="Help"
              >
                <IoMdHelpCircleOutline size={24} />
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white font-semibold p-2 rounded hover:bg-red-500 transition ml-4"
                aria-label="Logout"
              >
                <CiLogout size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 ml-64 pt-24 p-6">
        <div>
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
                  onClick={() => handleSidebarClick('aicteIntern')}
                  className="bg-lime-600 text-white font-semibold py-2 px-4 rounded hover:bg-lime-500 transition"
                  aria-label="Enroll Now"
                >
                  Enroll Now
                </button>
              </div>
              <NormInternship />
            </>
          )}
          {activeSection === 'aicteIntern' && userProfile && (
  <div className="flex justify-center">
    <div className="w-full max-w-4xl">
      <AICTE userId={Number(userProfile.id)} onSubmit={handleAicteFormSubmit} />
    </div>
  </div>
)}
          {activeSection === 'payment' && <PaymentComponent />}
          {activeSection === 'calendar' && <FullCalendarComponent />}
          {activeSection === 'preScreening' && <PreScreening />}
        </div>
      </div>

      {isHelpOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Help</h2>
            <p>If you need assistance, please contact our support team at Care@arinyacosmetics.com.</p>
            <button
              onClick={() => setIsHelpOpen(false)}
              className="bg-gray-800 text-white font-semibold py-2 px-4 rounded mt-4 hover:bg-gray-700 transition"
              aria-label="Close Help"
            >
              <AiOutlineClose size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestAttendingMode;