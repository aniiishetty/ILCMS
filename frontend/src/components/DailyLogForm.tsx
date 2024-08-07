import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDailyLog } from '../services/dailyLogService';
import { getAicteInternById } from '../services/aicteInternService';

interface DailyLogsProps {
  id?: number; // ID for editing an existing record
  aicteInternId: number; // User ID for fetching common fields
  onLogSubmit: (log: any) => void; // Callback for log submission
}

const DailyLogForm: React.FC<DailyLogsProps> = ({ aicteInternId, onLogSubmit }) => {
  const [log, setLog] = useState({
    day: '',
    date: '',
    arrivalTime: '',
    departureTime: '',
    remarks: '',
    department: '',
    finishedProduct: '',
    hodName: '',
    hodEmail: '',
    mainPoints: '',
  });

  const [aicteIntern, setAicteIntern] = useState<{
    hodName: string;
    hodEmail: string;
  } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (aicteInternId) {
      getAicteInternById(aicteInternId)
        .then((intern) => {
          setAicteIntern({
            hodName: intern.hodName,
            hodEmail: intern.hodEmail,
          });
        })
        .catch((error) => {
          console.error('Error fetching AicteIntern details:', error);
        });
    }
  }, [aicteInternId]);

  useEffect(() => {
    if (aicteIntern) {
      setLog((prevLog) => ({
        ...prevLog,
        hodName: aicteIntern.hodName,
        hodEmail: aicteIntern.hodEmail,
      }));
    }
  }, [aicteIntern]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLog({
      ...log,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createDailyLog(log);
      onLogSubmit(log); // Notify parent component
    } catch (error) {
      console.error('Error submitting daily log:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-md rounded-md">
      <table className="w-full border border-gray-300 border-collapse">
        <tbody>
          <tr className="border-b border-gray-300">
            <td className="px-4 py-2">
              <label htmlFor="day" className="block text-sm font-medium text-gray-700">Day</label>
              <input
                type="text"
                id="day"
                name="day"
                value={log.day}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              />
            </td>
            <td className="px-4 py-2">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={log.date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-4 py-2">
              <label htmlFor="arrivalTime" className="block text-sm font-medium text-gray-700">Time of Arrival</label>
              <input
                type="time"
                id="arrivalTime"
                name="arrivalTime"
                value={log.arrivalTime}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              />
            </td>
            <td className="px-4 py-2">
              <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700">Time of Departure</label>
              <input
                type="time"
                id="departureTime"
                name="departureTime"
                value={log.departureTime}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-4 py-2">
              <label htmlFor="hodName" className="block text-sm font-medium text-gray-700">Name of HOD/Supervisor</label>
              <input
                type="text"
                id="hodName"
                name="hodName"
                value={log.hodName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              />
            </td>
            <td className="px-4 py-2">
              <label htmlFor="hodEmail" className="block text-sm font-medium text-gray-700">HOD/Supervisor Email</label>
              <input
                type="email"
                id="hodEmail"
                name="hodEmail"
                value={log.hodEmail}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-4 py-2" colSpan={2}>
              <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
              <textarea
                id="remarks"
                name="remarks"
                value={log.remarks}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              ></textarea>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-4 py-2" colSpan={2}>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
              <textarea
                id="department"
                name="department"
                value={log.department}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              ></textarea>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-4 py-2" colSpan={2}>
              <label htmlFor="finishedProduct" className="block text-sm font-medium text-gray-700">Finished Product</label>
              <textarea
                id="finishedProduct"
                name="finishedProduct"
                value={log.finishedProduct}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              ></textarea>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-4 py-2" colSpan={2}>
              <label htmlFor="mainPoints" className="block text-sm font-medium text-gray-700">Main Points</label>
              <textarea
                id="mainPoints"
                name="mainPoints"
                value={log.mainPoints}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Submit
      </button>
    </form>
  );
};

export default DailyLogForm;
