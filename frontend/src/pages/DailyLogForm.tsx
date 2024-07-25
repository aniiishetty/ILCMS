import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DailyLogForm: React.FC = () => {
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

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLog({
      ...log,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(log);
    navigate('/user');
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-4 py-2">
              <label htmlFor="hodEmail" className="block text-sm font-medium text-gray-700">Name of HOD/Supervisor</label>
              <input
                type="email"
                id="hodEmail"
                name="hodEmail"
                value={log.hodEmail}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </td>
            <td className="px-4 py-2">
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department/Division</label>
              <input
                type="text"
                id="department"
                name="department"
                value={log.department}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="px-4 py-2">
              <label htmlFor="finishedProduct" className="block text-sm font-medium text-gray-700">HOD/Supervisor Email</label>
              <input
                type="text"
                id="finishedProduct"
                name="finishedProduct"
                value={log.finishedProduct}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </td>
            <td className="px-4 py-2">
              <label htmlFor="hodName" className="block text-sm font-medium text-gray-700">Name of Finished Product</label>
              <input
                type="text"
                id="hodName"
                name="hodName"
                value={log.hodName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td colSpan={2} className="px-4 py-2">
              <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
              <textarea
                id="remarks"
                name="remarks"
                value={log.remarks}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td colSpan={2} className="px-4 py-2">
              <label htmlFor="mainPoints" className="block text-sm font-medium text-gray-700">Main Points of the Day</label>
              <textarea
                id="mainPoints"
                name="mainPoints"
                value={log.mainPoints}
                onChange={handleChange}
                className="mt-1 block w-full h-32 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="px-4 py-2">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600">Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default DailyLogForm;
