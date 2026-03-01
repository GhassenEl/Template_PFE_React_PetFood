// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ toggleTheme, isDarkMode }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();

  // Mettre à jour l'heure toutes les minutes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Obtenir le titre de la page en fonction de l'URL
  const getPageTitle = () => {
    const path = location.pathname;
    switch(path) {
      case '/dashboard':
        return 'Tableau de bord';
      case '/produits':
        return 'Gestion des produits';
      case '/commandes':
        return 'Gestion des commandes';
      case '/clients':
        return 'Gestion des clients';
      case '/factures':
        return 'Gestion des factures';
      case '/avis':
        return 'Avis clients';
      case '/historique':
        return 'Historique des actions';
      case '/notifications':
        return 'Centre de notifications';
      case '/info-societe':
        return 'Informations société';
      case '/paiements':
        return 'Gestion des paiements';
      case '/contact':
        return 'Messages de contact';
      default:
        return 'PetFood TN';
    }
  };

  // Formater l'heure
  const formatTime = () => {
    return currentTime.toLocaleTimeString('fr-TN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Formater la date en français avec contexte tunisien
  const formatDate = () => {
    return currentTime.toLocaleDateString('fr-TN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Données de notification avec noms tunisiens
  const notifications = [
    { id: 1, message: "Nouvelle commande de Mehdi Ben Ahmed", time: "Il y a 5 min", type: "commande" },
    { id: 2, message: "Paiement reçu de Sarra Trabelsi", time: "Il y a 15 min", type: "paiement" },
    { id: 3, message: "Stock faible : Croquettes premium", time: "Il y a 30 min", type: "stock" },
  ];

  return (
    <header className="header">
      <div className="header-left">
        <div className="page-title">
          <h1>{getPageTitle()}</h1>
          <p className="welcome-message">
            {new Date().getHours() < 12 ? 'Sabah el khir' : 
             new Date().getHours() < 18 ? 'Après-midi' : 'Massa el khir'}, 
            Admin
          </p>
        </div>
      </div>

      <div className="header-right">
        {/* Date et heure */}
        <div className="datetime">
          <div className="date">
            <span className="date-icon">📅</span>
            <span className="date-text">{formatDate()}</span>
          </div>
          <div className="time">
            <span className="time-icon">⏰</span>
            <span className="time-text">{formatTime()}</span>
          </div>
        </div>

        {/* Bouton de thème */}
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          title={isDarkMode ? 'Mode clair' : 'Mode sombre'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        {/* Notifications rapides */}
        <div className="quick-notifications">
          <button className="notification-badge">
            <span className="notification-icon">🔔</span>
            <span className="badge-count">3</span>
          </button>
          <div className="notifications-dropdown">
            <h4>Notifications</h4>
            {notifications.map(notif => (
              <div key={notif.id} className="notification-item">
                <div className="notif-icon">
                  {notif.type === 'commande' && '📦'}
                  {notif.type === 'paiement' && '💰'}
                  {notif.type === 'stock' && '⚠️'}
                </div>
                <div className="notif-content">
                  <p>{notif.message}</p>
                  <small>{notif.time}</small>
                </div>
              </div>
            ))}
            <div className="notifications-footer">
              <a href="/notifications">Voir toutes les notifications</a>
            </div>
          </div>
        </div>

        {/* Profil utilisateur */}
        <div className="user-profile">
          <button 
            className="profile-button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="avatar">
              <span className="avatar-icon">👤</span>
            </div>
            <div className="user-info">
              <span className="user-name">Mohamed Ben Salem</span>
              <span className="user-role">Administrateur</span>
            </div>
            <span className="dropdown-arrow">▼</span>
          </button>

          {/* Menu déroulant du profil */}
          {showProfileMenu && (
            <div className="profile-menu">
              <ul>
                <li>
                  <a href="/profile">
                    <span className="menu-icon">👤</span>
                    Mon profil
                  </a>
                </li>
                <li>
                  <a href="/settings">
                    <span className="menu-icon">⚙️</span>
                    Paramètres
                  </a>
                </li>
                <li>
                  <a href="/activity">
                    <span className="menu-icon">📊</span>
                    Mon activité
                  </a>
                </li>
                <li className="menu-divider"></li>
                <li>
                  <a href="/help">
                    <span className="menu-icon">❓</span>
                    Aide
                  </a>
                </li>
                <li>
                  <a href="/logout" className="logout-item">
                    <span className="menu-icon">🚪</span>
                    Déconnexion
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
