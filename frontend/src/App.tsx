import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from './pages/User';
import Management from './pages/Management';
import TestAttendingMode from './pages/TestAttendingMode';
import FetchUserPhoto from './pages/FetchUserPhoto';
import AdminDashboard from './pages/AdminDashboard';


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
          
          
          
        
          
        </Routes>
      </Router>
    
  );
};

export default App;
