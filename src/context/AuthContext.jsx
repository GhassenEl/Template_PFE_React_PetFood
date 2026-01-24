import React, { createContext, useState, useContext, useEffect } from "react";
import { authService, demoAuth } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger l'utilisateur au démarrage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
          // En production, vérifier le token avec l'API
          // const isValid = await authService.verifyToken();
          // if (isValid) {
          setUser(JSON.parse(storedUser));
          // } else {
          //   logout();
          // }
        }
      } catch (error) {
        console.error("Error loading user:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Connexion
  const login = async (email, password, remember = false) => {
    try {
      setLoading(true);
      setError(null);

      // Pour la démo, utiliser demoAuth
      const data = await demoAuth.login(email, password);
      // En production: const data = await authService.login(email, password, remember);

      setUser(data.user);

      if (remember) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Inscription
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      // Pour la démo
      const data = await demoAuth.register(userData);
      // En production: const data = await authService.register(userData);

      setUser(data.user);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Déconnexion
  const logout = () => {
    authService.logout();
    setUser(null);
    setError(null);
  };

  // Mise à jour du profil
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      const data = await authService.updateProfile(userData);
      setUser(data);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = !!user;

  // Vérifier les rôles
  const isAdmin = user?.role === "admin";
  const isCustomer = user?.role === "customer";

  // Email mémorisé
  const getRememberedEmail = () => {
    return localStorage.getItem("rememberEmail");
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated,
    isAdmin,
    isCustomer,
    getRememberedEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
