import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/create" element={<UserForm />} />
          {/* Define other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
