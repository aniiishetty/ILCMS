import React from 'react';
import { UserProfile } from '../services/userService';

const isFile = (photo: any): photo is File => photo instanceof File;

const isBuffer = (photo: any): photo is { type: 'Buffer'; data: number[] } =>
    photo && photo.type === 'Buffer' && Array.isArray(photo.data);

interface AccountDetailsProps {
    userProfile: UserProfile | null;
    isEditing: boolean;
    editProfile: UserProfile | null;
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | { target: { name: string; value: string | File | null } }) => void;
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
        console.log('Rendering passport photo:', passportPhoto);

        if (passportPhoto === null || passportPhoto === undefined) {
            console.log('Photo is null or undefined');
            return 'No photo available';
        }

        if (isFile(passportPhoto)) {
            // Handle the File object
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result as string;
                console.log('Photo is a File, data URL created:', dataUrl);

                // Add a base case to stop the recursion
                if (dataUrl) {
                    return (
                        <img
                            src={dataUrl}
                            alt="Passport Photo Preview"
                            className="w-32 h-32 object-cover rounded-full border border-gray-300"
                        />
                    );
                } else {
                    return 'No photo available';
                }
            };
            reader.readAsDataURL(passportPhoto);
            return null; // Return null while loading
        } else if (isBuffer(passportPhoto)) {
            // Convert the Uint8Array buffer to a base64-encoded string
            const base64String = btoa(String.fromCharCode(...passportPhoto.data));
            const dataUrl = `data:image/jpeg;base64,${base64String}`; // Adjust mime type if necessary
            console.log('Photo is a Buffer, data URL created:', dataUrl);

            

            return (
                <img
                    src={dataUrl}
                    alt="Passport Photo Preview"
                    className="w-32 h-32 object-cover rounded-full border border-gray-300"
                />
            );
        } else {
            console.log('Photo is of an unexpected type');
            return 'No photo available'; // Fallback case
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Account Details</h2>
            {userProfile ? (
                isEditing ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email:</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={editProfile?.email || ''}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1"
                                    aria-label="Email"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="dob">Date of Birth:</label>
                                    <input
                                        id="dob"
                                        type="date"
                                        name="dob"
                                        value={editProfile?.dob ? convertToInputDateFormat(editProfile.dob) : ''}
                                        onChange={handleDateChange}
                                        placeholder="Date of Birth"
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1"
                                        aria-label="Date of Birth"
                                    />
                                </div>
                                <div className="flex-1 mt-2">
                                    {renderPassportPhoto(editProfile?.passportPhoto)}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="address">Address:</label>
                                <input
                                    id="address"
                                    type="text"
                                    name="address"
                                    value={editProfile?.address || ''}
                                    onChange={handleChange}
                                    placeholder="Address"
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1"
                                    aria-label="Address"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="collegeName">College Name:</label>
                                <input
                                    id="collegeName"
                                    type="text"
                                    name="collegeName"
                                    value={editProfile?.collegeName || ''}
                                    onChange={handleChange}
                                    placeholder="College Name"
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1"
                                    aria-label="College Name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="university">University:</label>
                                <input
                                    id="university"
                                    type="text"
                                    name="university"
                                    value={editProfile?.university || ''}
                                    onChange={handleChange}
                                    placeholder="University"
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1"
                                    aria-label="University"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="usn">USN:</label>
                                <input
                                    id="usn"
                                    type="text"
                                    name="usn"
                                    value={editProfile?.usn || ''}
                                    onChange={handleChange}
                                    placeholder="USN"
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1"
                                    aria-label="USN"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="verificationType">Verification Type:</label>
                                <input
                                    id="verificationType"
                                    type="text"
                                    name="verificationType"
                                    value={editProfile?.verificationType || ''}
                                    onChange={handleChange}
                                    placeholder="Verification Type"
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1"
                                    aria-label="Verification Type"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="verificationId">Verification ID:</label>
                                <input
                                    id="verificationId"
                                    type="text"
                                    name="verificationId"
                                    value={editProfile?.verificationId || ''}
                                    onChange={handleChange}
                                    placeholder="Verification ID"
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1"
                                    aria-label="Verification ID"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="gender">Gender:</label>
                                <input
                                    id="gender"
                                    type="text"
                                    name="gender"
                                    value={editProfile?.gender || ''}
                                    onChange={handleChange}
                                    placeholder="Gender"
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1"
                                    aria-label="Gender"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="branch">Branch:</label>
                                <input
                                    id="branch"
                                    type="text"
                                    name="branch"
                                    value={editProfile?.branch || ''}
                                    onChange={handleChange}
                                    placeholder="Branch"
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1"
                                    aria-label="Branch"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="semester">Semester:</label>
                                <input
                                    id="semester"
                                    type="text"
                                    name="semester"
                                    value={editProfile?.semester || ''}
                                    onChange={handleChange}
                                    placeholder="Semester"
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1"
                                    aria-label="Semester"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="phoneNumber">Phone Number:</label>
                                <input
                                    id="phoneNumber"
                                    type="text"
                                    name="phoneNumber"
                                    value={editProfile?.phoneNumber || ''}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1"
                                    aria-label="Phone Number"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="passportPhoto">Passport Photo:</label>
                                <input
                                    id="passportPhoto"
                                    type="file"
                                    name="passportPhoto"
                                    accept="image/*"
                                    onChange={(e) => handleChange({ target: { name: 'passportPhoto', value: e.target.files ? e.target.files[0] : null } })}
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1"
                                    aria-label="Passport Photo"
                                />
                                <div className="mt-2">
                                    {renderPassportPhoto(editProfile?.passportPhoto)}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-4">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={handleEdit}
                                className="bg-gray-500 text-white py-2 px-4 rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email:</label>
                                <p className="text-gray-900">{userProfile.email}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0">
                                    <label className="block text-sm font-medium text-gray-700">Date of Birth:</label>
                                    <p className="text-gray-900">{formatDate(userProfile.dob)}</p>
                                </div>
                                <div className="flex-1 mt-2">
                                    {renderPassportPhoto(userProfile.passportPhoto)}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address:</label>
                                <p className="text-gray-900">{userProfile.address}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">College Name:</label>
                                <p className="text-gray-900">{userProfile.collegeName}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">University:</label>
                                <p className="text-gray-900">{userProfile.university}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">USN:</label>
                                <p className="text-gray-900">{userProfile.usn}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Verification Type:</label>
                                <p className="text-gray-900">{userProfile.verificationType}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Verification ID:</label>
                                <p className="text-gray-900">{userProfile.verificationId}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Gender:</label>
                                <p className="text-gray-900">{userProfile.gender}</p>
                                </div>

<div>
    <label className="block text-sm font-medium text-gray-700">Branch:</label>
    <p className="text-gray-900">{userProfile.branch}</p>
</div>

<div>
    <label className="block text-sm font-medium text-gray-700">Semester:</label>
    <p className="text-gray-900">{userProfile.semester}</p>
</div>

<div>
    <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
    <p className="text-gray-900">{userProfile.phoneNumber}</p>
</div>
</div>

<div className="mt-6 flex gap-4">
<button
    type="button"
    onClick={handleEdit}
    className="bg-blue-500 text-white py-2 px-4 rounded-md"
>
    Edit
</button>
</div>
</div>
)
) : (
  <p>No user profile available</p>
)}
</div>
);
};

export default AccountDetails;
