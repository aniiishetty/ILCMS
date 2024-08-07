import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface DailyLog {
  id: number;
  day: string;
  date: string;
  arrivalTime: string;
  departureTime: string;
  remarks?: string;
  department: string;
  finishedProduct: string;
  hodName: string;
  hodEmail: string;
  mainPoints: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const FacultyDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([]);
  const [selectedLog, setSelectedLog] = useState<DailyLog | null>(null); // State for selected log
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/users/all');
        const data = response.data;
        if (data.success && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          console.error('API response does not contain a valid array of users:', data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const fetchDailyLogs = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/api/daily-logs/user/${selectedUser.id}`);
          if (response.data.success) {
            setDailyLogs(response.data.dailyLogs);
          } else {
            console.error('API response does not contain valid daily logs:', response.data);
          }
        } catch (error) {
          console.error('Error fetching daily logs:', error);
          setError('Failed to fetch daily logs');
        } finally {
          setLoading(false);
        }
      };

      fetchDailyLogs();
    }
  }, [selectedUser]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-black p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Faculty Dashboard</h1>
        </div>
      </header>
      <main className="flex-1 p-6">
        <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-600">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User List */}
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-blue-600">Users</h3>
              <ul>
                {users.length > 0 ? (
                  users.map((user) => (
                    <li
                      key={user.id}
                      className="cursor-pointer mb-2 p-2 border rounded-lg shadow-sm hover:bg-blue-100"
                      onClick={() => setSelectedUser(user)}
                    >
                      <p className="font-semibold">{user.name}</p>
                      <p>{user.email}</p>
                    </li>
                  ))
                ) : (
                  <p>No users found.</p>
                )}
              </ul>
            </div>

            {/* Display Daily Logs */}
            {selectedUser && (
              <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-green-600">Daily Logs for {selectedUser.name}</h3>
                {dailyLogs.length > 0 ? (
                  <ul>
                    {dailyLogs.map((log) => (
                      <li
                        key={log.id}
                        className="cursor-pointer mb-2 p-2 border rounded-lg shadow-sm hover:bg-green-100"
                        onClick={() => setSelectedLog(log)}
                      >
                        <h4 className="text-lg font-semibold">{log.day}</h4>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No daily logs available for this user.</p>
                )}
                {selectedLog && (
                  <div className="mt-4 p-4 bg-white shadow-sm rounded-lg">
                    <h4 className="text-lg font-semibold">Details for {selectedLog.day}</h4>
                    <p>Date: {new Date(selectedLog.date).toLocaleDateString()}</p>
                    <p>Arrival Time: {selectedLog.arrivalTime}</p>
                    <p>Departure Time: {selectedLog.departureTime}</p>
                    <p>Department: {selectedLog.department}</p>
                    <p>Finished Product: {selectedLog.finishedProduct}</p>
                    <p>HOD Name: {selectedLog.hodName}</p>
                    <p>HOD Email: {selectedLog.hodEmail}</p>
                    <p>Main Points: {selectedLog.mainPoints}</p>
                    {selectedLog.remarks && <p>Remarks: {selectedLog.remarks}</p>}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        Footer Content
      </footer>
    </div>
  );
};

export default FacultyDashboard;
