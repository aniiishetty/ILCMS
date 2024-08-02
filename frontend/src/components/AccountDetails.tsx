import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserProfile } from '../services/userService';
import '../styles/AccountDetails.css';

const isFile = (photo: any): photo is File => photo instanceof File;

const isBuffer = (photo: any): photo is { type: 'Buffer'; data: number[] } =>
  photo && photo.type === 'Buffer' && Array.isArray(photo.data);

interface AccountDetailsProps {
  userProfile: UserProfile;
  isEditing: boolean;
  editProfile: UserProfile | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSave: () => Promise<void>;
  handleEdit: () => void;
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

const convertToInputDateFormat = (dateString: string) => {
  if (!dateString) return '';
  const [day, month, year] = dateString.split('-');
  return `${year}-${month}-${day}`;
};

const AccountDetails: React.FC<AccountDetailsProps> = ({
  userProfile,
  isEditing,
  editProfile,
  handleChange,
  handleSave,
  handleEdit,
}) => {
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(userProfile);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post('/api/users/profile', { IIMSTC_ID: userProfile.IIMSTC_ID });
        if (response.data.success) {
          setCurrentProfile(response.data.user);
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userProfile.IIMSTC_ID]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedValue = name === 'dob' ? convertToInputDateFormat(value) : value;
    handleChange({ target: { name, value: formattedValue } } as React.ChangeEvent<HTMLInputElement>);
  };

  const renderPassportPhoto = (passportPhoto: File | { type: 'Buffer'; data: number[] } | null | undefined) => {
    if (!passportPhoto) {
      return 'No photo available';
    }

    if (isFile(passportPhoto)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        if (dataUrl) {
          return <img src={dataUrl} alt="Passport Photo Preview" className="imgPreview" />;
        }
      };
      reader.readAsDataURL(passportPhoto);
      return null; // The image will be displayed once FileReader finishes loading
    } else if (isBuffer(passportPhoto)) {
      const base64String = btoa(String.fromCharCode(...passportPhoto.data));
      const dataUrl = `data:image/jpeg;base64,${base64String}`;
      return <img src={dataUrl} alt="Passport Photo Preview" className="imgPreview" />;
    } else {
      return 'No photo available';
    }
  };

  return (
    <div className="container">
      <h2 className="title">Account Details</h2>
      {currentProfile ? (
        isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="inputGroup">
                <label className="label" htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={editProfile?.IIMSTC_ID || ''}
                  onChange={handleChange}
                  placeholder="Email"
                  className="input text-black"
                  aria-label="Email"
                />
              </div>

              <div className="inputGroup">
                <label className="label" htmlFor="dob">Date of Birth:</label>
                <input
                  id="dob"
                  type="date"
                  name="dob"
                  value={editProfile?.dob ? convertToInputDateFormat(editProfile.dob) : ''}
                  onChange={handleDateChange}
                  placeholder="Date of Birth"
                  className="input text-black"
                  aria-label="Date of Birth"
                />
              </div>

              <div className="inputGroup">
                <label className="label" htmlFor="address">Address:</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={editProfile?.address || ''}
                  onChange={handleChange}
                  placeholder="Address"
                  className="input text-black"
                  aria-label="Address"
                />
              </div>

              <div className="inputGroup">
                <label className="label" htmlFor="fullName">Full Name:</label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={editProfile?.name || ''}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="input text-black"
                  aria-label="Full Name"
                />
              </div>

              <div className="inputGroup">
                <label className="label" htmlFor="phoneNumber">Phone Number:</label>
                <input
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  value={editProfile?.phoneNumber || ''}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="input text-black"
                  aria-label="Phone Number"
                />
              </div>

              <div className="inputGroup">
                <label className="label" htmlFor="collegeName">College Name:</label>
                <input
                  id="collegeName"
                  type="text"
                  name="collegeName"
                  value={editProfile?.collegeName || ''}
                  onChange={handleChange}
                  placeholder="College Name"
                  className="input text-black"
                  aria-label="College Name"
                />
              </div>

              <div className="inputGroup">
                <label className="label" htmlFor="branch">Branch:</label>
                <input
                  id="branch"
                  type="text"
                  name="branch"
                  value={editProfile?.branch || ''}
                  onChange={handleChange}
                  placeholder="Branch"
                  className="input text-black"
                  aria-label="Branch"
                />
              </div>

              <div className="inputGroup">
                <label className="label" htmlFor="semester">Semester:</label>
                <input
                  id="semester"
                  type="text"
                  name="semester"
                  value={editProfile?.semester || ''}
                  onChange={handleChange}
                  placeholder="Semester"
                  className="input text-black"
                  aria-label="Semester"
                />
              </div>

              <div className="inputGroup">
                <label className="label" htmlFor="usn">USN:</label>
                <input
                  id="usn"
                  type="text"
                  name="usn"
                  value={editProfile?.usn || ''}
                  onChange={handleChange}
                  placeholder="USN"
                  className="input text-black"
                  aria-label="USN"
                />
              </div>

              <div className="inputGroup">
                <label className="label" htmlFor="verificationType">Verification Type:</label>
                <input
                  id="verificationType"
                  type="text"
                  name="verificationType"
                  value={editProfile?.verificationType || ''}
                  onChange={handleChange}
                  placeholder="Verification Type"
                  className="input text-black"
                  aria-label="Verification Type"
                />
              </div>
            </div>
            <button onClick={handleSave} className="saveButton">Save</button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="inputGroup">
                <span className="label">Email:</span>
                <span className="value">{currentProfile.IIMSTC_ID}</span>
              </div>

              <div className="inputGroup">
                <span className="label">Date of Birth:</span>
                <span className="value">{currentProfile.dob ? formatDate(currentProfile.dob) : ''}</span>
              </div>

              <div className="inputGroup">
                <span className="label">Address:</span>
                <span className="value">{currentProfile.address}</span>
              </div>

              <div className="inputGroup">
                <span className="label">Full Name:</span>
                <span className="value">{currentProfile.name}</span>
              </div>

              <div className="inputGroup">
                <span className="label">Phone Number:</span>
                <span className="value">{currentProfile.phoneNumber}</span>
              </div>

              <div className="inputGroup">
                <span className="label">College Name:</span>
                <span className="value">{currentProfile.collegeName}</span>
              </div>

              <div className="inputGroup">
                <span className="label">Branch:</span>
                <span className="value">{currentProfile.branch}</span>
              </div>

              <div className="inputGroup">
                <span className="label">Semester:</span>
                <span className="value">{currentProfile.semester}</span>
              </div>

              <div className="inputGroup">
                <span className="label">USN:</span>
                <span className="value">{currentProfile.usn}</span>
              </div>

              <div className="inputGroup">
                <span className="label">Verification Type:</span>
                <span className="value">{currentProfile.verificationType}</span>
              </div>
            </div>
            <button onClick={handleEdit} className="editButton">Edit</button>
          </div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default AccountDetails;
