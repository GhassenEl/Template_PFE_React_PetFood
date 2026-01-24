import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../hooks/useOrders";
import { usePets } from "../../hooks/usePets";
import StatCard from "../../components/dashboard/StatCard";
import RecentOrders from "../../components/dashboard/RecentOrders";
import PetCard from "../../components/animal/PetCard";
import QuickActions from "../../components/dashboard/QuickActions";
import "./DashboardOverview.css";

const DashboardOverview = () => {
  const { user } = useAuth();
  const { orders, loading: ordersLoading } = useOrders();
  const { pets, loading: petsLoading } = usePets();

  const stats = [
    {
      title: "Commandes totales",
      value: orders?.length || 0,
      icon: "fas fa-box",
      color: "primary",
      change: "+12%",
      link: "/dashboard/orders",
    },
    {
      title: "Animaux enregistrés",
      value: pets?.length || 0,
      icon: "fas fa-paw",
      color: "success",
      change: "+2",
      link: "/dashboard/pets",
    },
    {
      title: "Favoris",
      value: 12,
      icon: "fas fa-heart",
      color: "danger",
      change: "+3",
      link: "/dashboard/wishlist",
    },
    {
      title: "Dépenses totales",
      value: "459,80€",
      icon: "fas fa-euro-sign",
      color: "warning",
      change: "+24%",
      link: "/dashboard/orders",
    },
  ];

  return (
    <div className="dashboard-overview">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Bonjour, {user?.name || "Cher client"} 👋</h1>
        <p>Voici un aperçu de votre activité sur PetFood Delivery</p>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Statistiques */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="overview-content">
        {/* Commandes récentes */}
        <div className="overview-section">
          <div className="section-header">
            <h2>Commandes récentes</h2>
            <Link to="/dashboard/orders" className="view-all">
              Voir tout <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
          <RecentOrders orders={orders?.slice(0, 5)} loading={ordersLoading} />
        </div>

        {/* Mes animaux */}
        <div className="overview-section">
          <div className="section-header">
            <h2>Mes animaux</h2>
            <Link to="/dashboard/pets" className="view-all">
              Gérer <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
          {petsLoading ? (
            <div className="loading">Chargement des animaux...</div>
          ) : pets && pets.length > 0 ? (
            <div className="pets-grid">
              {pets.slice(0, 3).map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <i className="fas fa-paw"></i>
              <p>Vous n'avez pas encore d'animaux enregistrés</p>
              <Link to="/dashboard/pets/new" className="btn btn-primary">
                Ajouter un animal
              </Link>
            </div>
          )}
        </div>

        {/* Recommandations */}
        <div className="overview-section">
          <div className="section-header">
            <h2>Recommandations pour vous</h2>
            <Link to="/products" className="view-all">
              Voir plus <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
          <div className="recommendations">
            <div className="recommendation-card">
              <div className="recommendation-icon">
                <i className="fas fa-sync"></i>
              </div>
              <div className="recommendation-content">
                <h3>Passez à l'abonnement</h3>
                <p>Économisez 15% avec un abonnement mensuel</p>
                <Link to="/dashboard/subscriptions" className="btn btn-sm">
                  Découvrir
                </Link>
              </div>
            </div>
            <div className="recommendation-card">
              <div className="recommendation-icon">
                <i className="fas fa-tag"></i>
              </div>
              <div className="recommendation-content">
                <h3>Promotions en cours</h3>
                <p>Jusqu'à -30% sur les croquettes premium</p>
                <Link to="/products?promo=true" className="btn btn-sm">
                  Voir les offres
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Informations livraison */}
      <div className="delivery-info">
        <div className="delivery-card">
          <i className="fas fa-shipping-fast"></i>
          <div>
            <h4>Prochaine livraison</h4>
            <p>Votre abonnement sera livré dans 3 jours</p>
          </div>
          <Link to="/delivery/tracking" className="btn btn-outline">
            Suivre
          </Link>
        </div>
        <div className="delivery-card">
          <i className="fas fa-calendar-check"></i>
          <div>
            <h4>Rappel vaccin</h4>
            <p>Le vaccin de Max est prévu dans 2 semaines</p>
          </div>
          <button className="btn btn-outline">Planifier</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
