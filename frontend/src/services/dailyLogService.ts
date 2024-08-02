import axios from 'axios';

const API_URL = 'http://localhost:5000/api/daily-logs';
export const createDailyLog = async (log: {
    day: string;
    date: string;
    arrivalTime: string;
    departureTime: string;
    remarks: string;
    department: string;
    finishedProduct: string;
    hodName: string;
    hodEmail: string;
    mainPoints: string;
  }) => {
    try {
      const response = await axios.post(`${API_URL}/`, log);
      return response.data;
    } catch (error) {
      console.error('Error updating daily log:', error);
      throw error;
    }
  };