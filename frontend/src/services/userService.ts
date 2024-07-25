import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

interface UserDetails {
  name: string;
  email: string;
  dob: string;
  address: string;
  collegeName: string;
  university: string;
  usn: string;
  verificationType: string;
  verificationId: string;
  password: string;
  gender: string;
  branch: string;
  semester: string;
  phoneNumber: string;
  // Allow null
}

export const register = async (userDetails: UserDetails) => {
  const formData = new FormData();

  Object.keys(userDetails).forEach((key) => {
    const value = userDetails[key as keyof UserDetails];
    if (value !== undefined) {
      formData.append(key, value as any); // Use 'any' to handle different types
    }
  });

  const response = await axios.post(`${API_URL}/register`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  const { id, token } = response.data;
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('email', email);
  localStorage.setItem('id', id);
  return response.data;
};

export interface UserProfile {
  id: string; 
  name: string;
  email: string;
  dob: string;
  address: string;
  collegeName: string;
  university: string;
  usn: string;
  verificationType: string;
  verificationId: string;
  gender: string;
  branch: string;
  semester: string;
  phoneNumber: string;
  passportPhoto?: File | null; // Allow null
}

export const fetchUserProfile = async () => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  

  try {
    const response = await axios.post(`${API_URL}/profile`, { email }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.data && response.data.user) {
      return response.data.user;
    } else {
      throw new Error('Failed to fetch user profile');
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (profile: UserProfile) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();

  Object.keys(profile).forEach((key) => {
    const value = profile[key as keyof UserProfile];
    if (value !== undefined) {
      formData.append(key, value as any); // Use 'any' to handle different types
    }
  });

  try {
    const response = await axios.put(`${API_URL}/update-profile`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
export const fetchUserDetails = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export default {
  register,
  login,
  fetchUserProfile,
  updateUserProfile,
  fetchUserDetails // Ensure this is exported
};
