import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

interface RegisterData {
  email: string;
  name: string;
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
}

interface LoginData {
  IIMSTC_ID: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    
    if (response.data && response.data.token && response.data.user && response.data.user.IIMSTC_ID) {
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      localStorage.setItem('IIMSTC_ID', response.data.user.IIMSTC_ID); // Store IIMSTC_ID in localStorage
      return response.data.user;
    } else {
      console.error('Login failed: Response data is missing token or IIMSTC_ID', response.data);
      throw new Error('Login failed: No token or IIMSTC_ID returned');
    }
  } catch (error) {
    console.error('Error during login request:', error);
    throw error;
  }
};


export interface UserProfile {
  id: string; 
  name: string;
  IIMSTC_ID: string; // Use IIMSTC_ID instead of email
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
  const IIMSTC_ID = localStorage.getItem('IIMSTC_ID');
  console.log('Token:', token); // Debug log
  console.log('IIMSTC_ID:', IIMSTC_ID); // Debug log

  if (!token || !IIMSTC_ID) {
    console.error('Token or IIMSTC_ID is missing from localStorage');
    throw new Error('Token or IIMSTC_ID is missing from localStorage');
  }
  
  try {
    const response = await axios.post(`${API_URL}/profile`, { IIMSTC_ID }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.data && response.data.user) {
      return response.data.user;
    } else {
      console.error('Failed to fetch user profile: Response data is missing user information', response.data);
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
  registerUser,
  loginUser,
  fetchUserProfile,
  updateUserProfile,
  fetchUserDetails
};
