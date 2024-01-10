import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(() => {
        const storedData = localStorage.getItem('authData');
        return storedData ? JSON.parse(storedData) : null;
    });    

    const login = (data) => {
        setAuthData(data);
        localStorage.setItem('authData', JSON.stringify(data));
    };

    const logout = () => {
        setAuthData(null);
        localStorage.removeItem('authData');
    };

    const value = {
        authData,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
