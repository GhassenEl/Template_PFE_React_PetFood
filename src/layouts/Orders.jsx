import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useOrders } from "../../hooks/useOrders";
import OrderTable from "../../components/dashboard/OrderTable";
import OrderFilters from "../../components/dashboard/OrderFilters";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/shared/EmptyState";
import "./DashboardOrders.css";

const DashboardOrders = () => {
  const [filters, setFilters] = useState({
    status: "all",
    dateRange: "all",
    search: "",
  });

  const { orders, loading, error } = useOrders(filters);

  const statuses = [
    { value: "all", label: "Toutes les commandes", count: orders?.length || 0 },
    {
      value: "pending",
      label: "En attente",
      count: orders?.filter((o) => o.status === "pending").length || 0,
    },
    {
      value: "processing",
      label: "En traitement",
      count: orders?.filter((o) => o.status === "processing").length || 0,
    },
    {
      value: "shipped",
      label: "Expédiée",
      count: orders?.filter((o) => o.status === "shipped").length || 0,
    },
    {
      value: "delivered",
      label: "Livrée",
      count: orders?.filter((o) => o.status === "delivered").length || 0,
    },
    {
      value: "cancelled",
      label: "Annulée",
      count: orders?.filter((o) => o.status === "cancelled").length || 0,
    },
  ];

  if (error) {
    return (
      <div className="orders-page">
        <div className="page-header">
          <h1>Mes Commandes</h1>
          <p>Gérez et suivez vos commandes</p>
        </div>
        <div className="error-state">
          <i className="fas fa-exclamation-triangle"></i>
          <h3>Erreur de chargement</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Mes Commandes</h1>
          <p>Gérez et suivez vos commandes</p>
        </div>
        <Link to="/products" className="btn btn-primary">
          <i className="fas fa-plus"></i>
          Nouvelle commande
        </Link>
      </div>

      {/* Stats rapides */}
      <div className="order-stats">
        {statuses.map((status) => (
          <button
            key={status.value}
            className={`stat-btn ${filters.status === status.value ? "active" : ""}`}
            onClick={() =>
              setFilters((prev) => ({ ...prev, status: status.value }))
            }
          >
            <span className="stat-label">{status.label}</span>
            <span className="stat-count">{status.count}</span>
          </button>
        ))}
      </div>

      {/* Filtres */}
      <OrderFilters filters={filters} onFilterChange={setFilters} />

      {/* Liste des commandes */}
      <div className="orders-content">
        {loading ? (
          <LoadingSpinner />
        ) : orders && orders.length > 0 ? (
          <>
            <OrderTable orders={orders} />
            <div className="orders-summary">
              <div className="summary-item">
                <span>Commandes totales :</span>
                <strong>{orders.length}</strong>
              </div>
              <div className="summary-item">
                <span>Montant total :</span>
                <strong>
                  {orders
                    .reduce((sum, order) => sum + order.total, 0)
                    .toFixed(2)}
                  €
                </strong>
              </div>
              <div className="summary-item">
                <span>Dernière commande :</span>
                <strong>
                  {new Date(
                    Math.max(...orders.map((o) => new Date(o.date))),
                  ).toLocaleDateString("fr-FR")}
                </strong>
              </div>
            </div>
          </>
        ) : (
          <EmptyState
            icon="fas fa-box-open"
            title="Aucune commande"
            description="Vous n'avez pas encore passé de commande"
            action={
              <Link to="/products" className="btn btn-primary">
                <i className="fas fa-shopping-cart"></i>
                Découvrir nos produits
              </Link>
            }
          />
        )}
      </div>

      {/* FAQ Commandes */}
      <div className="orders-faq">
        <h3>Questions fréquentes</h3>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>Comment modifier une commande ?</h4>
            <p>
              Vous pouvez modifier votre commande dans les 30 minutes suivant sa
              validation.
            </p>
          </div>
          <div className="faq-item">
            <h4>Délai de livraison ?</h4>
            <p>
              24-48h pour la région parisienne, 3-5 jours pour le reste de la
              France.
            </p>
          </div>
          <div className="faq-item">
            <h4>Retour produit ?</h4>
            <p>
              30 jours pour retourner un produit non ouvert. Contactez notre
              support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOrders;
