import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from './pages/User';
import Management from './pages/Management';
import TestAttendingMode from './pages/TestAttendingMode';
import FetchUserPhoto from './pages/FetchUserPhoto';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FinanceDashboard from './pages/FinanceDashboard';
import InternshipDashboard from './pages/InternshipDashboard';
import ManagementDashboard from './pages/ManagementDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import CreateAdmin from './pages/Create';
import Sprint from './pages/Sprint'



 // Corrected import

const App: React.FC = () => {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/admin" element={<Management />} />
          <Route path="/user" element={<TestAttendingMode />} />
          
          <Route path="/photos" element={<FetchUserPhoto />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/finance" element={<FinanceDashboard />} />
                <Route path="/internship" element={<InternshipDashboard />} />
                <Route path="/management" element={<ManagementDashboard />} />
                <Route path="/faculty" element={<FacultyDashboard />} />
                <Route path="/create-admin" element={<CreateAdmin />} />
                <Route path="/sprint" element={<Sprint />} />
         
          
          
          
        
          
        </Routes>
      </Router>
    
  );
};

export default App;
