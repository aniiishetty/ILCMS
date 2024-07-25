// aicteInternService.ts
import axios from 'axios';

export const createAicteIntern = async (formData: FormData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/aicte/aicte-interns', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error during form submission:', error);
    throw error;
  }
};
