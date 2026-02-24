// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ companyInfo, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/historique", label: "Historique" },
    { path: "/notifications", label: "Notifications" },
    { path: "/produits", label: "Produits" },
    { path: "/commandes", label: "Commandes" },
    { path: "/clients", label: "Clients" },
    { path: "/avis", label: "Avis" },
    { path: "/paiements", label: "Paiements" },
    { path: "/factures", label: "Factures" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <div
      style={{
        width: "250px",
        background: "#2c3e50",
        color: "white",
        height: "100vh",
        position: "fixed",
        padding: "20px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <img
          src={companyInfo.logo || "/logo-petfood.png"}
          alt="Logo"
          style={{ width: "80px", height: "80px", borderRadius: "50%" }}
        />
        <h3>{companyInfo.name}</h3>
        <p>{companyInfo.slogan}</p>
      </div>

      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: "block",
              padding: "10px",
              color: location.pathname === item.path ? "#4CAF50" : "white",
              textDecoration: "none",
              margin: "5px 0",
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={onLogout}
        style={{
          position: "absolute",
          bottom: "20px",
          width: "calc(100% - 40px)",
          padding: "10px",
          background: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Déconnexion
      </button>
    </div>
  );
};

export default Sidebar;
