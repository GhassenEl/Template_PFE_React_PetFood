// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [activeSessions, setActiveSessions] = useState([]);

  const login = async (email, password) => {
    // Simulation d'authentification
    const mockUser = {
      id: 1,
      name: "Admin PetFood",
      email: "admin@petfood.tn",
      role: "admin",
    };

    setUser(mockUser);

    const session = {
      userId: mockUser.id,
      userName: mockUser.name,
      loginTime: new Date().toISOString(),
      ip: "192.168.1.1",
      device: navigator.userAgent,
    };

    setActiveSessions([...activeSessions, session]);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, activeSessions }}>
      {children}
    </AuthContext.Provider>
  );
};
