import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import SearchBar from "../shared/SearchBar";
import NotificationsDropdown from "../shared/NotificationsDropdown";
import "./DashboardHeader.css";

const DashboardHeader = ({ onMenuClick, user, cartItems }) => {
  return (
    <header className="dashboard-header">
      <div className="container">
        <div className="header-content">
          {/* Bouton menu mobile */}
          <button className="menu-toggle" onClick={onMenuClick}>
            <i className="fas fa-bars"></i>
          </button>

          {/* Logo */}
          <div className="header-logo">
            <Link to="/dashboard" className="logo">
              <span className="logo-icon">🐾</span>
              <span className="logo-text">
                <strong>PetFood</strong>Dashboard
              </span>
            </Link>
          </div>

          {/* Search */}
          <div className="header-search">
            <SearchBar variant="dashboard" />
          </div>

          {/* Actions */}
          <div className="header-actions">
            {/* Bouton retour au site */}
            <Link to="/" className="action-btn back-to-site">
              <i className="fas fa-store"></i>
              <span>Retour au site</span>
            </Link>

            {/* Panier */}
            <Link to="/cart" className="action-btn cart-btn">
              <i className="fas fa-shopping-cart"></i>
              <span>Panier</span>
              {cartItems > 0 && <span className="badge">{cartItems}</span>}
            </Link>

            {/* Notifications */}
            <NotificationsDropdown />

            {/* Profil utilisateur */}
            <div className="user-profile">
              <div className="user-avatar">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <i className="fas fa-user-circle"></i>
                )}
              </div>
              <div className="user-info">
                <span className="user-name">{user?.name || "Utilisateur"}</span>
                <span className="user-role">
                  {user?.role === "admin" ? "Administrateur" : "Client"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
