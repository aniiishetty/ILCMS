import React, { useState } from 'react';
import { fetchUserPhoto, uploadUserPhoto } from '../services/photoService';

const FetchUserPhoto: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFetchPhoto = async () => {
    try {
      setError(null);
      const photoUrl = await fetchUserPhoto(userId);
      setPhoto(photoUrl);
    } catch (err: any) {
      setError(err.message);
      setPhoto(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUploadPhoto = async () => {
    if (!file) {
      setError('No file selected.');
      return;
    }
    try {
      setError(null);
      await uploadUserPhoto(userId, file);
      setFile(null);
      handleFetchPhoto(); // Optionally fetch and display the updated photo
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fetch and Upload User Photo</h1>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">
          User ID:
        </label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      
      <button
        onClick={handleFetchPhoto}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Fetch Photo
      </button>

      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fileUpload">
          Upload Photo:
        </label>
        <input
          type="file"
          id="fileUpload"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          onClick={handleUploadPhoto}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Upload Photo
        </button>
      </div>

      {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
      {photo && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">User Photo:</h2>
          <img src={photo} alt="User" className="rounded" />
        </div>
      )}
    </div>
  );
};

export default FetchUserPhoto;
