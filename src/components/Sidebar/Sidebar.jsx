import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <>
      <div className="sidebar-overlay" onClick={onClose} />
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <button className="sidebar-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
          <div className="sidebar-user">
            {user ? (
              <>
                <div className="user-avatar">
                  <i className="fas fa-user-circle"></i>
                </div>
                <div className="user-info">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
              </>
            ) : (
              <>
                <div className="user-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <div className="user-info">
                  <h4>Bienvenue</h4>
                  <p>Connectez-vous à votre compte</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <h5>Mon Compte</h5>
            <ul>
              {user ? (
                <>
                  <li>
                    <Link to="/dashboard" onClick={onClose}>
                      <i className="fas fa-user"></i> Mon profil
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/orders" onClick={onClose}>
                      <i className="fas fa-box"></i> Mes commandes
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/pets" onClick={onClose}>
                      <i className="fas fa-paw"></i> Mes animaux
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/addresses" onClick={onClose}>
                      <i className="fas fa-home"></i> Mes adresses
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/wishlist" onClick={onClose}>
                      <i className="fas fa-heart"></i> Favoris
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/subscriptions" onClick={onClose}>
                      <i className="fas fa-sync"></i> Abonnements
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/settings" onClick={onClose}>
                      <i className="fas fa-cog"></i> Paramètres
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" onClick={onClose}>
                      <i className="fas fa-sign-in-alt"></i> Connexion
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={onClose}>
                      <i className="fas fa-user-plus"></i> Inscription
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <h5>Boutique</h5>
            <ul>
              <li>
                <Link to="/products" onClick={onClose}>
                  <i className="fas fa-store"></i> Tous les produits
                </Link>
              </li>
              <li>
                <Link to="/products/promotions" onClick={onClose}>
                  <i className="fas fa-fire"></i> Promotions
                </Link>
              </li>
              <li>
                <Link to="/products/new" onClick={onClose}>
                  <i className="fas fa-star"></i> Nouveautés
                </Link>
              </li>
            </ul>

            <h5>Par animal</h5>
            <ul>
              <li>
                <Link to="/products/dogs" onClick={onClose}>
                  <i className="fas fa-dog"></i> Chiens
                </Link>
              </li>
              <li>
                <Link to="/products/cats" onClick={onClose}>
                  <i className="fas fa-cat"></i> Chats
                </Link>
              </li>
              <li>
                <Link to="/products/birds" onClick={onClose}>
                  <i className="fas fa-dove"></i> Oiseaux
                </Link>
              </li>
              <li>
                <Link to="/products/rodents" onClick={onClose}>
                  <i className="fas fa-otter"></i> Rongeurs
                </Link>
              </li>
              <li>
                <Link to="/products/fish" onClick={onClose}>
                  <i className="fas fa-fish"></i> Poissons
                </Link>
              </li>
            </ul>

            <h5>Aide</h5>
            <ul>
              <li>
                <Link to="/contact" onClick={onClose}>
                  <i className="fas fa-headset"></i> Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" onClick={onClose}>
                  <i className="fas fa-question-circle"></i> FAQ
                </Link>
              </li>
              <li>
                <Link to="/delivery" onClick={onClose}>
                  <i className="fas fa-shipping-fast"></i> Livraison
                </Link>
              </li>
              <li>
                <Link to="/returns" onClick={onClose}>
                  <i className="fas fa-exchange-alt"></i> Retours
                </Link>
              </li>
            </ul>

            {user && (
              <>
                <hr />
                <ul>
                  <li>
                    <button className="logout-btn" onClick={onClose}>
                      <i className="fas fa-sign-out-alt"></i> Déconnexion
                    </button>
                  </li>
                </ul>
              </>
            )}
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-support">
            <i className="fas fa-phone-alt"></i>
            <div>
              <small>Support 24/7</small>
              <strong>01 23 45 67 89</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
