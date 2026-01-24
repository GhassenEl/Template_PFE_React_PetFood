import React from "react";
import { NavLink } from "react-router-dom";
import "./DashboardSidebar.css";

const DashboardSidebar = ({ onLogout, currentPath }) => {
  const menuItems = [
    {
      title: "Tableau de bord",
      icon: "fas fa-tachometer-alt",
      path: "/dashboard",
      exact: true,
    },
    {
      title: "Commandes",
      icon: "fas fa-box",
      path: "/dashboard/orders",
      badge: 3,
    },
    {
      title: "Mes Animaux",
      icon: "fas fa-paw",
      path: "/dashboard/pets",
      badge: 2,
    },
    {
      title: "Abonnements",
      icon: "fas fa-sync",
      path: "/dashboard/subscriptions",
    },
    {
      title: "Adresses",
      icon: "fas fa-map-marker-alt",
      path: "/dashboard/addresses",
    },
    {
      title: "Favoris",
      icon: "fas fa-heart",
      path: "/dashboard/wishlist",
      badge: 12,
    },
    {
      title: "Paramètres",
      icon: "fas fa-cog",
      path: "/dashboard/settings",
    },
    {
      title: "Notifications",
      icon: "fas fa-bell",
      path: "/dashboard/notifications",
      badge: 5,
    },
    {
      title: "Support",
      icon: "fas fa-headset",
      path: "/dashboard/support",
    },
  ];

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <h3>Espace Client</h3>
        <p>Gérez votre compte et vos animaux</p>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <i className={item.icon}></i>
                <span>{item.title}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="quick-stats">
          <div className="stat-item">
            <i className="fas fa-box-open"></i>
            <div>
              <span className="stat-value">3</span>
              <span className="stat-label">Commandes</span>
            </div>
          </div>
          <div className="stat-item">
            <i className="fas fa-paw"></i>
            <div>
              <span className="stat-value">2</span>
              <span className="stat-label">Animaux</span>
            </div>
          </div>
          <div className="stat-item">
            <i className="fas fa-heart"></i>
            <div>
              <span className="stat-value">12</span>
              <span className="stat-label">Favoris</span>
            </div>
          </div>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i>
          Déconnexion
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
