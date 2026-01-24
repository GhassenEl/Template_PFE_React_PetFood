import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePets } from "../../hooks/usePets";
import PetCard from "../../components/animal/PetCard";
import PetModal from "../../components/animal/PetModal";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/shared/EmptyState";
import "./DashboardPets.css";

const DashboardPets = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const { pets, loading, error, refetch } = usePets();

  const handleEdit = (pet) => {
    setEditingPet(pet);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingPet(null);
    setShowModal(true);
  };

  const handleSuccess = () => {
    setShowModal(false);
    refetch();
  };

  const petTypes = [
    { value: "dog", label: "Chien", icon: "🐕" },
    { value: "cat", label: "Chat", icon: "🐈" },
    { value: "bird", label: "Oiseau", icon: "🐦" },
    { value: "rodent", label: "Rongeur", icon: "🐹" },
    { value: "fish", label: "Poisson", icon: "🐠" },
    { value: "reptile", label: "Reptile", icon: "🦎" },
  ];

  if (error) {
    return (
      <div className="pets-page">
        <div className="page-header">
          <h1>Mes Animaux</h1>
          <p>Gérez le profil de vos compagnons</p>
        </div>
        <div className="error-state">
          <i className="fas fa-exclamation-triangle"></i>
          <h3>Erreur de chargement</h3>
          <p>{error}</p>
          <button onClick={refetch} className="btn btn-primary">
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pets-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Mes Animaux</h1>
          <p>Gérez le profil de vos compagnons</p>
        </div>
        <button onClick={handleAdd} className="btn btn-primary">
          <i className="fas fa-plus"></i>
          Ajouter un animal
        </button>
      </div>

      {/* Types d'animaux */}
      <div className="pet-types">
        <h3>Types d'animaux</h3>
        <div className="types-grid">
          {petTypes.map((type) => (
            <Link
              key={type.value}
              to={`/products/${type.value}s`}
              className="type-card"
            >
              <span className="type-icon">{type.icon}</span>
              <span className="type-label">{type.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mes animaux */}
      <div className="my-pets-section">
        <div className="section-header">
          <h2>Mes compagnons ({pets?.length || 0})</h2>
          <p>Profils complets avec recommandations personnalisées</p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : pets && pets.length > 0 ? (
          <>
            <div className="pets-grid">
              {pets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  onEdit={() => handleEdit(pet)}
                  showActions
                />
              ))}
            </div>

            {/* Statistiques */}
            <div className="pets-stats">
              <div className="stat-card">
                <i className="fas fa-bone"></i>
                <div>
                  <h4>Alimentation</h4>
                  <p>2 régimes actifs</p>
                </div>
              </div>
              <div className="stat-card">
                <i className="fas fa-syringe"></i>
                <div>
                  <h4>Santé</h4>
                  <p>3 rappels à venir</p>
                </div>
              </div>
              <div className="stat-card">
                <i className="fas fa-calendar-alt"></i>
                <div>
                  <h4>Prochain achat</h4>
                  <p>Dans 15 jours</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyState
            icon="fas fa-paw"
            title="Aucun animal enregistré"
            description="Ajoutez vos animaux pour des recommandations personnalisées"
            action={
              <button onClick={handleAdd} className="btn btn-primary">
                <i className="fas fa-plus"></i>
                Ajouter mon premier animal
              </button>
            }
          />
        )}
      </div>

      {/* Recommandations */}
      <div className="pets-recommendations">
        <h3>Recommandations</h3>
        <div className="recommendations-grid">
          <div className="recommendation-card">
            <div className="card-icon">
              <i className="fas fa-user-md"></i>
            </div>
            <div className="card-content">
              <h4>Consultation vétérinaire</h4>
              <p>Bilan santé recommandé tous les 6 mois</p>
              <Link to="/contact" className="btn btn-sm">
                Prendre rendez-vous
              </Link>
            </div>
          </div>
          <div className="recommendation-card">
            <div className="card-icon">
              <i className="fas fa-pills"></i>
            </div>
            <div className="card-content">
              <h4>Traitements préventifs</h4>
              <p>Pensez aux antiparasitaires saisonniers</p>
              <Link to="/products?category=treatments" className="btn btn-sm">
                Voir les produits
              </Link>
            </div>
          </div>
          <div className="recommendation-card">
            <div className="card-icon">
              <i className="fas fa-gift"></i>
            </div>
            <div className="card-content">
              <h4>Abonnement</h4>
              <p>Économisez 15% avec l'abonnement mensuel</p>
              <Link to="/dashboard/subscriptions" className="btn btn-sm">
                Souscrire
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <PetModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        pet={editingPet}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default DashboardPets;
