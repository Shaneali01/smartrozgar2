import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState( localStorage.getItem('role') || 'hirer');

  // Function to call during Login
  const login = (role) => {
    localStorage.setItem('role', role);
    setUserRole(role); // This triggers the re-render!
  };

  const logout = () => {
    localStorage.removeItem('role');
    setUserRole('hirer');
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);