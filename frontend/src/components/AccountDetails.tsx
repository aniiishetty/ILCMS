import React from 'react';
import { UserProfile } from '../services/userService';
import '../styles/AccountDetails.css';

const isFile = (photo: any): photo is File => photo instanceof File;

const isBuffer = (photo: any): photo is { type: 'Buffer'; data: number[] } =>
  photo && photo.type === 'Buffer' && Array.isArray(photo.data);

interface AccountDetailsProps {
  userProfile: UserProfile | null;
  isEditing: boolean;
  editProfile: UserProfile | null;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | { target: { name: string; value: string | File | null } }
  ) => void;
  handleSave: () => void;
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
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedValue = name === 'dob' ? convertToInputDateFormat(value) : value;
    handleChange({ target: { name, value: formattedValue } } as React.ChangeEvent<HTMLInputElement>);
  };

  const renderPassportPhoto = (passportPhoto: File | { type: 'Buffer'; data: Uint8Array } | null | undefined) => {
    if (passportPhoto === null || passportPhoto === undefined) {
      return 'No photo available';
    }

    if (isFile(passportPhoto)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        if (dataUrl) {
          return (
            <img
              src={dataUrl}
              alt="Passport Photo Preview"
              className="imgPreview"
            />
          );
        } else {
          return 'No photo available';
        }
      };
      reader.readAsDataURL(passportPhoto);
      return null;
    } else if (isBuffer(passportPhoto)) {
      const base64String = btoa(String.fromCharCode(...passportPhoto.data));
      const dataUrl = `data:image/jpeg;base64,${base64String}`;
      return (
        <img
          src={dataUrl}
          alt="Passport Photo Preview"
          className="imgPreview"
        />
      );
    } else {
      return 'No photo available';
    }
  };

  return (
    <div className="container">
      <h2 className="title">Account Details</h2>
      {userProfile ? (
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
                  className="input"
                  aria-label="Email"
                />
              </div>

              <div className="fieldGroup">
                <div className="flex-shrink-0">
                  <label className="label" htmlFor="dob">Date of Birth:</label>
                  <input
                    id="dob"
                    type="date"
                    name="dob"
                    value={editProfile?.dob ? convertToInputDateFormat(editProfile.dob) : ''}
                    onChange={handleDateChange}
                    placeholder="Date of Birth"
                    className="input"
                    aria-label="Date of Birth"
                  />
                </div>
                <div className="flex-1 mt-2">
                  {renderPassportPhoto(editProfile?.passportPhoto)}
                </div>
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
                  className="input"
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
                  className="input"
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
                  className="input"
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
                  className="input"
                  aria-label="College Name"
                />
              </div>

              <div className="inputGroup">
                <label className="label" htmlFor="university">University:</label>
                <input
                  id="university"
                  type="text"
                  name="university"
                  value={editProfile?.university || ''}
                  onChange={handleChange}
                  placeholder="University"
                  className="input"
                  aria-label="University"
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
                  className="input"
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
                  className="input"
                  aria-label="Verification Type"
                />
              </div>

              <div className="inputGroup">
                <label className="label" htmlFor="verificationId">Verification ID:</label>
                <input
                  id="verificationId"
                  type="text"
                  name="verificationId"
                  value={editProfile?.verificationId || ''}
                  onChange={handleChange}
                  placeholder="Verification ID"
                  className="input"
                  aria-label="Verification ID"
                />
              </div>

              <div className="inputGroup">
                <label className="label" htmlFor="passportPhoto">Student Photo:</label>
                <input
                  id="passportPhoto"
                  type="file"
                  name="passportPhoto"
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: 'passportPhoto',
                        value: e.target.files ? e.target.files[0] : null,
                      },
                    })
                  }
                  className="input"
                  aria-label="Passport Photo"
                />
              </div>
            </div>

            <div className="buttonGroup">
              <button onClick={handleSave} className="buttonSave">
                Save
              </button>
              <button onClick={handleEdit} className="buttonCancel">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="viewGroup">
            <table>
              <tbody>
                <tr>
                <th>Student Photo</th>
                <td>{renderPassportPhoto(userProfile.passportPhoto)}</td>
                  
                </tr>
                <tr>
                  <th>Date of Birth</th>
                  <td>{formatDate(userProfile.dob)}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{userProfile.address}</td>
                </tr>
                <tr>
                  <th>Full Name</th>
                  <td>{userProfile.name}</td>
                </tr>
                <tr>
                  <th>Phone Number</th>
                  <td>{userProfile.phoneNumber}</td>
                </tr>
                <tr>
                  <th>College Name</th>
                  <td>{userProfile.collegeName}</td>
                </tr>
                <tr>
                  <th>University</th>
                  <td>{userProfile.university}</td>
                </tr>
                <tr>
                  <th>USN</th>
                  <td>{userProfile.usn}</td>
                </tr>
                <tr>
                  <th>Verification Type</th>
                  <td>{userProfile.verificationType}</td>
                </tr>
                <tr>
                  <th>Verification ID</th>
                  <td>{userProfile.verificationId}</td>
                </tr>
                <tr>
                <th>Email</th>
                <td>{userProfile.email}</td>
                  
                </tr>
              </tbody>
            </table>
            <div className="buttonGroup">
              <button onClick={handleEdit} className="buttonSave">
                Edit
              </button>
            </div>
          </div>
        )
      ) : (
        <p>No user profile available.</p>
      )}
    </div>
  );
};

export default AccountDetails;
