// src/components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ companyInfo, onLogout }) => {
  const menuItems = [
    { path: "/dashboard", icon: "📊", label: "Tableau de bord" },
    { path: "/produits", icon: "🛒", label: "Produits" },
    { path: "/commandes", icon: "📦", label: "Commandes" },
    { path: "/clients", icon: "👥", label: "Clients" },
    { path: "/factures", icon: "📄", label: "Factures" },
    { path: "/paiements", icon: "💳", label: "Paiements" },
    { path: "/historique", icon: "📅", label: "Historique" },
    { path: "/avis", icon: "⭐", label: "Avis clients" },
    { path: "/notifications", icon: "🔔", label: "Notifications" },
    { path: "/contact", icon: "📞", label: "Contact" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        {companyInfo.logo && (
          <img src={companyInfo.logo} alt={companyInfo.name} className="logo" />
        )}
        <h2>{companyInfo.name}</h2>
        <p className="slogan">{companyInfo.slogan}</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={onLogout} className="logout-btn">
          <span className="nav-icon">🚪</span>
          <span className="nav-label">Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;