import axios from 'axios';

interface AicteIntern {
  id?: number;
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
  resume?: File | null;
  internshipPreferences: string;
  learningObjectives: string;
  technicalSkills: string;
  internshipActivities: string;
  evidenceToFaculty: string;
  userId: number;
}

const API_URL = 'http://localhost:5000/api/aicte-interns';

export const createAicteIntern = async (data: AicteIntern) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, (data as any)[key]);
  });

  try {
    const response = await axios.post(`${API_URL}/create`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating AicteIntern:', error);
    throw error;
  }
};

export const updateAicteIntern = async (id: number, data: Partial<AicteIntern>) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, (data as any)[key]);
  });

  try {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating AicteIntern:', error);
    throw error;
  }
};

export const getAicteInternById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching AicteIntern by ID:', error);
    throw error;
  }
};

export const getAllAicteInterns = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching all AicteIntern records:', error);
    throw error;
  }
};

export const deleteAicteIntern = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting AicteIntern:', error);
    throw error;
  }
};
