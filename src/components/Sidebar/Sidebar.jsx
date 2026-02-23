// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaHistory,
  FaBell,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaStar,
  FaCreditCard,
  FaEnvelope,
  FaChartLine,
  FaUserFriends,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ companyInfo, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", icon: FaHome, label: "Dashboard" },
    { path: "/historique", icon: FaHistory, label: "Historique" },
    { path: "/notifications", icon: FaBell, label: "Notifications" },
    { path: "/produits", icon: FaBox, label: "Produits" },
    { path: "/commandes", icon: FaShoppingCart, label: "Commandes" },
    { path: "/clients", icon: FaUsers, label: "Clients" },
    { path: "/avis", icon: FaStar, label: "Avis" },
    { path: "/paiements", icon: FaCreditCard, label: "Paiements" },
    { path: "/contact", icon: FaEnvelope, label: "Contact" },
  ];

  return (
    <div className="sidebar">
      <div className="company-info">
        <img src={companyInfo.logo} alt="Logo" className="logo" />
        <h3>{companyInfo.name}</h3>
        <p className="slogan">{companyInfo.slogan}</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
          >
            <item.icon className="icon" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={onLogout} className="logout-btn">
          <FaSignOutAlt /> Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
