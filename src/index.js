// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Factures from './pages/Factures';
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Historique from "./pages/Historique";
import Notifications from "./pages/Notifications";
import Produits from "./pages/Produits";
import Commandes from "./pages/Commandes";
import Clients from "./pages/Clients";
import Avis from "./pages/Avis";
import Paiements from "./pages/Paiements";
import Contact from "./pages/Contact";
import "./App.css";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function AppContent() {
  const { user, logout } = useAuth();

  const companyInfo = {
    name: "PetFood TN",
    slogan: "La nutrition premium pour vos animaux",
    logo: "/logo-petfood.png",
  };

  return (
    <div className="app">
      {user ? (
        <div className="app-container">
          <Sidebar companyInfo={companyInfo} onLogout={logout} />
          <main className="main-content">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/historique" element={<Historique />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/produits" element={<Produits />} />
              <Route path="/commandes" element={<Commandes />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/avis" element={<Avis />} />
              <Route path="/paiements" element={<Paiements />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
