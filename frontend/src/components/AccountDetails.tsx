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
                  value={editProfile?.email || ''}
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
                <label className="label" htmlFor="name">Full Name:</label>
                <input
                  id="name"
                  type="text"
                  name="name"
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
                <label className="label" htmlFor="collegeId">College Name:</label>
                <input
                  id="collegeId"
                  type="text"
                  name="collegeId"
                  value={editProfile?.collegeId || ''}
                  onChange={handleChange}
                  placeholder="College Name"
                  className="input text-black"
                  aria-label="College Name"
                />
              </div>

              <div className="inputGroup">
                <label className="label" htmlFor="branchId">Branch:</label>
                <input
                  id="branchId"
                  type="text"
                  name="branchId"
                  value={editProfile?.branchId || ''}
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
                <label className="label" htmlFor="aadharNo">Aadhar Number:</label>
                <input
                  id="aadharNo"
                  type="text"
                  name="aadharNo"
                  value={editProfile?.aadharNo || ''}
                  onChange={handleChange}
                  placeholder="Aadhar Number"
                  className="input text-black"
                  aria-label="Aadhar Number"
                />
              </div>

              <div className="inputGroup">
                <label className="label" htmlFor="gender">Gender:</label>
                <input
                  id="gender"
                  type="text"
                  name="gender"
                  value={editProfile?.gender || ''}
                  onChange={handleChange}
                  placeholder="Gender"
                  className="input text-black"
                  aria-label="Gender"
                />
              </div>

              <div className="inputGroup">
                <label className="label" htmlFor="degreeId">Degree:</label>
                <input
                  id="degreeId"
                  type="text"
                  name="degreeId"
                  value={editProfile?.degreeId || ''}
                  onChange={handleChange}
                  placeholder="Degree ID"
                  className="input text-black"
                  aria-label="Degree ID"
                />
              </div>

              <div className="inputGroup">
                <label className="label" htmlFor="degreeStatusId">Degree Status:</label>
                <input
                  id="degreeStatusId"
                  type="text"
                  name="degreeStatusId"
                  value={editProfile?.degreeStatusId || ''}
                  onChange={handleChange}
                  placeholder="Degree Status ID"
                  className="input text-black"
                  aria-label="Degree Status ID"
                />
              </div>

              <div className="inputGroup">
                <label className="label" htmlFor="passportPhoto"> Photo:</label>
                <input
                  id="passportPhoto"
                  type="file"
                  name="passportPhoto"
                  onChange={handleChange}
                  className="input text-black"
                  aria-label="Passport Photo"
                />
              </div>

              <div className="inputGroup">
                <label className="label">Current Photo:</label>
                {renderPassportPhoto(editProfile?.passportPhoto)}
              </div>
            </div>

            <div className="btnContainer">
              <button onClick={handleSave} className="saveBtn">Save</button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="infoGroup">
                <label className="label">Email:</label>
                <span className="info">{currentProfile.email}</span>
              </div>

              <div className="infoGroup">
                <label className="label">Date of Birth:</label>
                <span className="info">{formatDate(currentProfile.dob)}</span>
              </div>

              <div className="infoGroup">
                <label className="label">Address:</label>
                <span className="info">{currentProfile.address}</span>
              </div>

              <div className="infoGroup">
                <label className="label">Full Name:</label>
                <span className="info">{currentProfile.name}</span>
              </div>

              <div className="infoGroup">
                <label className="label">Phone Number:</label>
                <span className="info">{currentProfile.phoneNumber}</span>
              </div>

              <div className="infoGroup">
                <label className="label">College Name:</label>
                <span className="info">{currentProfile.collegeDetails?.name || ''}</span>
              </div>

              <div className="infoGroup">
                <label className="label">Branch:</label>
                <span className="info">{currentProfile.branchDetails?.BranchName || ''}</span>
              </div>

              <div className="infoGroup">
                <label className="label">Semester:</label>
                <span className="info">{currentProfile.semester}</span>
              </div>

              <div className="infoGroup">
                <label className="label">USN:</label>
                <span className="info">{currentProfile.usn}</span>
              </div>

              <div className="infoGroup">
                <label className="label">Aadhar Number:</label>
                <span className="info">{currentProfile.aadharNo}</span>
              </div>

              <div className="infoGroup">
                <label className="label">Gender:</label>
                <span className="info">{currentProfile.gender}</span>
              </div>

              <div className="infoGroup">
                <label className="label">Degree:</label>
                <span className="info">{currentProfile.degreeDetails?.DegreeName || ''}</span>
              </div>

              <div className="infoGroup">
                <label className="label">Degree Status:</label>
                <span className="info">{currentProfile.degreeStatusDetails?.StatusName || ''}</span>
              </div>

              <div className="infoGroup">
                <label className="label">Passport Photo:</label>
                {renderPassportPhoto(currentProfile.passportPhoto)}
              </div>
            </div>

            <div className="btnContainer">
              <button onClick={handleEdit} className="editBtn">Edit</button>
            </div>
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AccountDetails;
