import React, { useState } from "react";
import { Hero, ProductGrid, AnimalTypeSelector } from "../../components";
import { useProducts } from "../../hooks/useProducts";
import "./Home.css";

const Home = () => {
  const [selectedAnimal, setSelectedAnimal] = useState("all");
  const { products, loading } = useProducts({ animalType: selectedAnimal });

  return (
    <div className="home-page">
      <Hero
        title="Nourriture Premium pour vos Animaux"
        subtitle="Livraison à domicile - Produits de qualité"
        ctaText="Découvrir nos produits"
      />

      <section className="animal-selection">
        <h2>Pour quel animal cherchez-vous ?</h2>
        <AnimalTypeSelector
          selected={selectedAnimal}
          onChange={setSelectedAnimal}
        />
      </section>

      <section className="featured-products">
        <h2>Produits populaires</h2>
        {loading ? (
          <div className="loading">Chargement...</div>
        ) : (
          <ProductGrid products={products.slice(0, 8)} />
        )}
      </section>

      <section className="benefits">
        <div className="benefit-card">
          <h3>🎯 Livraison rapide</h3>
          <p>Livré en 24-48h</p>
        </div>
        <div className="benefit-card">
          <h3>🐕 Produits certifiés</h3>
          <p>Qualité vétérinaire</p>
        </div>
        <div className="benefit-card">
          <h3>💯 Satisfait ou remboursé</h3>
          <p>30 jours pour changer d'avis</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
