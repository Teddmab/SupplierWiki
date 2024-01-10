import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { authData } = useAuth();

    if (!authData) {
        // User is not logged in, redirect to the login page
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
