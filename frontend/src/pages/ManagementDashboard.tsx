// frontend/src/pages/ManagementDashboard.jsx
import React from 'react';

const ManagementDashboard = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-indigo-600 text-white p-4 shadow-md">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold">Managing Admin Dashboard</h1>
                </div>
            </header>
            <main className="flex-1 p-6">
                <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-indigo-50 p-4 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-indigo-600">Admin Overview</h3>
                            <p className="text-gray-700 mt-2">Manage and view details for all administrators in the system.</p>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-yellow-600">System Metrics</h3>
                            <p className="text-gray-700 mt-2">Review key metrics and performance indicators for the system.</p>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-red-600">Alerts & Notifications</h3>
                            <p className="text-gray-700 mt-2">View and manage system alerts and notifications for administrators.</p>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="bg-gray-800 text-white p-4 text-center">
               
            </footer>
        </div>
    );
};

export default ManagementDashboard;
