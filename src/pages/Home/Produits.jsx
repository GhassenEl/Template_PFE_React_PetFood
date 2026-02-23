// src/pages/Produits.jsx
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaImage } from "react-icons/fa";

const Produits = () => {
  const [produits, setProduits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduit, setCurrentProduit] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    prix: "",
    categorie: "",
    stock: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    // Charger les produits depuis l'API
    fetchProduits();
  }, []);

  const fetchProduits = async () => {
    // Simulation de données
    const mockProduits = [
      {
        id: 1,
        nom: "Croquettes Premium",
        prix: 89.99,
        categorie: "Alimentation",
        stock: 45,
        image: "croquettes.jpg",
      },
      {
        id: 2,
        nom: "Litière agglomérante",
        prix: 35.5,
        categorie: "Hygiène",
        stock: 23,
        image: "litiere.jpg",
      },
      {
        id: 3,
        nom: "Jouet interactif",
        prix: 29.99,
        categorie: "Jouets",
        stock: 67,
        image: "jouet.jpg",
      },
    ];
    setProduits(mockProduits);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ici, vous enverriez les données à votre API
    console.log("Données du produit:", formData);
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (produit) => {
    setCurrentProduit(produit);
    setFormData(produit);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      // Logique de suppression
      console.log("Suppression produit:", id);
    }
  };

  const resetForm = () => {
    setFormData({
      nom: "",
      prix: "",
      categorie: "",
      stock: "",
      description: "",
      image: null,
    });
    setCurrentProduit(null);
  };

  return (
    <div className="produits-container">
      <div className="header-actions">
        <h1>Gestion des Produits</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <FaPlus /> Ajouter un produit
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Prix</th>
            <th>Catégorie</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((produit) => (
            <tr key={produit.id}>
              <td>
                <img
                  src={`/images/${produit.image}`}
                  alt={produit.nom}
                  className="product-thumbnail"
                />
              </td>
              <td>{produit.nom}</td>
              <td>{produit.prix} TND</td>
              <td>{produit.categorie}</td>
              <td>{produit.stock}</td>
              <td className="actions">
                <button
                  onClick={() => handleEdit(produit)}
                  className="btn-edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(produit.id)}
                  className="btn-delete"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal pour ajouter/modifier */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{currentProduit ? "Modifier" : "Ajouter"} un produit</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom du produit</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Prix (TND)</label>
                <input
                  type="number"
                  name="prix"
                  step="0.01"
                  value={formData.prix}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Catégorie</label>
                <select
                  name="categorie"
                  value={formData.categorie}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Sélectionner</option>
                  <option value="Alimentation">Alimentation</option>
                  <option value="Hygiène">Hygiène</option>
                  <option value="Jouets">Jouets</option>
                  <option value="Accessoires">Accessoires</option>
                </select>
              </div>

              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Image</label>
                <div className="file-input">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <FaImage />
                </div>
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-primary">
                  {currentProduit ? "Modifier" : "Ajouter"}
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Produits;
