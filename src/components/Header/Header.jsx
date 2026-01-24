import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import SearchBar from "../../shared/SearchBar";
import AnimalTypeDropdown from "../../animal/AnimalTypeDropdown";
import "./Header.css";

const Header = ({ onMenuClick, onCartClick, onSidebarClick }) => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <span>🚚 Livraison gratuite à partir de 49€</span>
            <div className="header-top-links">
              <Link to="/delivery">Suivre ma commande</Link>
              <Link to="/contact">Contact</Link>
              <span>📞 01 23 45 67 89</span>
            </div>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <div className="header-main-content">
            {/* Logo */}
            <div className="header-logo">
              <button className="menu-toggle" onClick={onMenuClick}>
                <i className="fas fa-bars"></i>
              </button>
              <Link to="/" className="logo">
                <span className="logo-icon">🐾</span>
                <span className="logo-text">
                  <strong>PetFood</strong>Delivery
                </span>
              </Link>
            </div>

            {/* Search */}
            <div className="header-search">
              <SearchBar />
            </div>

            {/* Actions */}
            <div className="header-actions">
              <AnimalTypeDropdown />

              <button className="header-action-btn" onClick={onSidebarClick}>
                <i className="fas fa-user"></i>
                <span>Compte</span>
              </button>

              <Link to="/dashboard/pets" className="header-action-btn">
                <i className="fas fa-paw"></i>
                <span>Mes Animaux</span>
              </Link>

              <button
                className="header-action-btn cart-btn"
                onClick={onCartClick}
              >
                <i className="fas fa-shopping-cart"></i>
                <span>Panier</span>
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </button>

              {user ? (
                <div className="user-dropdown">
                  <button className="header-action-btn">
                    <i className="fas fa-user-circle"></i>
                    <span>{user.name}</span>
                  </button>
                  <div className="dropdown-menu">
                    <Link to="/dashboard">Mon compte</Link>
                    <Link to="/dashboard/orders">Mes commandes</Link>
                    <button onClick={handleLogout}>Déconnexion</button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="header-action-btn">
                  <i className="fas fa-sign-in-alt"></i>
                  <span>Connexion</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="header-nav">
        <div className="container">
          <ul className="nav-menu">
            <li>
              <Link to="/products">🐕 Chiens</Link>
            </li>
            <li>
              <Link to="/products/cats">🐈 Chats</Link>
            </li>
            <li>
              <Link to="/products/birds">🐦 Oiseaux</Link>
            </li>
            <li>
              <Link to="/products/rodents">🐹 Rongeurs</Link>
            </li>
            <li>
              <Link to="/products/fish">🐠 Poissons</Link>
            </li>
            <li>
              <Link to="/products/promotions">🔥 Promotions</Link>
            </li>
            <li>
              <Link to="/products/new">🆕 Nouveautés</Link>
            </li>
            <li>
              <Link to="/products/brands">🏷️ Marques</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
