import axios from 'axios';

const API_URL = 'http://localhost:5000/api/aicte';

interface AicteInternDetails {
  email: string;
  phoneNumber: string;
  fullName: string;
  homeAddress: string;
  rollNumber: string;
  academicConcentration: string;
  overallGPA: string;
  semester: string;
  academicYear: string;
  schoolName: string;
  schoolCityState: string;
  campusAddress: string;
  campusPhoneNumber: string;
  campusFaxNumber: string;
  schoolEmail: string;
  hodName: string;
  hodEmail: string;
  resume: File | null; // File for resume upload
  internshipPreferences: string;
  learningObjectives: string;
  technicalSkills: string;
  internshipActivities: string;
  evidenceToFaculty: string;
  // Foreign key to User
}

// Function to retrieve the Bearer token
const getBearerToken = () => {
  return localStorage.getItem('token') || '';
};

export const createAicteIntern = async (internDetails: AicteInternDetails) => {
  const formData = new FormData();

  // Append all properties to FormData
  Object.keys(internDetails).forEach((key) => {
    const value = internDetails[key as keyof AicteInternDetails];
    if (value !== undefined && value !== null) {
      if (key === 'resume' && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value)); // Ensure value is stringified
      }
    }
  });

  try {
    const response = await axios.post(`${API_URL}/aicte-interns`, formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getBearerToken()}` // Include Bearer token
      },
    });
    console.log('Response received:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error submitting form:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });
    } else {
      console.error('Unknown error:', error);
    }
    throw error;
  }
};