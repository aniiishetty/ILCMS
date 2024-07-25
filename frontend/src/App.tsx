import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from './pages/User';
import Management from './pages/Management';
import TestAttendingMode from './pages/TestAttendingMode';
import FetchUserPhoto from './pages/FetchUserPhoto';
import AicteInternForm from './components/AicteInternForm';


 // Corrected import

const App: React.FC = () => {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/admin" element={<Management />} />
          <Route path="/user" element={<TestAttendingMode />} />
          <Route path="/aicteIntern/:userId" element={<AicteInternForm />} />
          <Route path="/photos" element={<FetchUserPhoto />} />
        
          
        </Routes>
      </Router>
    
  );
};

export default App;
