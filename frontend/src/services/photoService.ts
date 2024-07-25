import axios from 'axios';

// Base URL for API requests
const API_BASE_URL = 'http://localhost:3000/api/photos';

// Function to fetch user photo
export const fetchUserPhoto = async (userId: string): Promise<string> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`, {
      responseType: 'arraybuffer',
    });

    // Convert ArrayBuffer to Base64 string
    const imageBase64 = arrayBufferToBase64(response.data);
    const mimeType = response.headers['content-type'];

    return `data:${mimeType};base64,${imageBase64}`;
  } catch (err) {
    console.error('Error fetching photo:', err);
    throw new Error('Error fetching photo. Please ensure the user ID is correct.');
  }
};

// Function to upload user photo
export const uploadUserPhoto = async (userId: string, file: File): Promise<void> => {
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('photo', file);

  try {
    await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err) {
    console.error('Error uploading photo:', err);
    throw new Error('Error uploading photo. Please try again.');
  }
};

// Helper function to convert ArrayBuffer to Base64
const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  const binaryString = Array.from(bytes).map(byte => String.fromCharCode(byte)).join('');
  return window.btoa(binaryString);
};
