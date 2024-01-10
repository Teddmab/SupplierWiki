import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar'; // Import the Navbar component
import ProtectedRoute from './components/ProtectedRoute';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';

// A dummy component to represent your protected form page
const FormPage = () => {
  return <div>This is the form page that is protected.</div>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Include the Navbar inside the Router */}
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/form" element={
            <ProtectedRoute>
              <FormPage /> {/* This is a placeholder for your form component */}
            </ProtectedRoute>
          } />
          {/* Add more protected routes as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
