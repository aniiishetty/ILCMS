import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const loginUser = async (loginData: { IIMSTC_ID: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    const { token, user } = response.data;

    // Store token and IIMSTC_ID in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('IIMSTC_ID', user.IIMSTC_ID);

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
export const verifyOTP = async (otpData: { email: string; otp: string }) => {
  try {
    const response = await axios.post(`${API_URL}/verify-otp`, otpData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
export const fetchColleges = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/college/colleges`);
    return response.data;
  } catch (error) {
    console.error('Error fetching colleges:', error);
    throw error;
  }
};
export const fetchDegrees = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/college/degrees');
    return response.data;
  } catch (error) {
    console.error('Error fetching degrees:', error);
    throw error;
  }
};

export const fetchBranches = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/college/branches');
    return response.data;
  } catch (error) {
    console.error('Error fetching branches:', error);
    throw error;
  }
};

export const fetchDegreeStatuses = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/college/degree-statuses');
    return response.data;
  } catch (error) {
    console.error('Error fetching degree statuses:', error);
    throw error;
  }
};
export const fetchDegreeStatusesByDegree = async (degreeId: string) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/degree/degree-statuses`, {
      params: { degreeId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching degree statuses:', error);
    throw error;
  }
};

// Fetch branches by degree ID
export const fetchBranchesByDegree = async (degreeId: string) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/degree/branches`, {
      params: { degreeId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching branches:', error);
    throw error;
  }
};

interface DegreeDetails {
  id: number;
  DegreeName: string;
}

interface CollegeDetails {
  id: number;
  name: string;
  code: string;
  Active_Status: string;
}

interface DegreeStatusDetails {
  DegreeStatusID: number;
  StatusName: string;
  degreeId: number;
}

interface BranchDetails {
  BranchID: number;
  BranchName: string;
  degreeId: number;
}

export interface UserProfile {
  id: string;
  IIMSTC_ID: any;
  email: string;
  dob: string;
  address: string;
  name: string;
  phoneNumber: string;
  collegeId: number;
  branchId: number;
  semester: string;
  usn: string;
  aadharNo: string;
  gender: string;
  degreeId: number;
  degreeStatusId: number;
  university: string;
  passportPhoto: File | { type: 'Buffer'; data: number[] } | null;
  degreeDetails: DegreeDetails;
  collegeDetails: CollegeDetails;
  degreeStatusDetails: DegreeStatusDetails;
  branchDetails: BranchDetails;
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
  fetchUserDetails,
  fetchColleges,
  fetchDegrees,
  fetchBranches,
  fetchDegreeStatuses,
  
};
