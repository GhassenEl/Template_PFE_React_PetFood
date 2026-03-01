// src/App.js
import React, { useState, createContext, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./app.css";

// Context pour l'authentification
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

// Context pour le thème
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

// Composant AuthProvider
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Simulation de connexion avec utilisateur tunisien
    setUser({ 
      email, 
      name: "Admin PetFood TN",
      role: "Administrateur"
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Composant ThemeProvider
const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDarkMode));
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Import des composants
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header"; 

// Page Dashboard
const Dashboard = () => {
  const { isDarkMode } = useTheme();
  
  const stats = [
    { id: 1, title: "Produits", value: "156", icon: "🛒", color: "#3498db" },
    { id: 2, title: "Commandes", value: "43", icon: "📦", color: "#27ae60" },
    { id: 3, title: "Clients", value: "89", icon: "👥", color: "#f39c12" },
    { id: 4, title: "CA (DT)", value: "12 450", icon: "💰", color: "#9b59b6" },
  ];

  const recentOrders = [
    { id: 1, client: "Mehdi Ben Ahmed", montant: "189 DT", statut: "Livré", date: "15/01/2024" },
    { id: 2, client: "Sarra Trabelsi", montant: "145 DT", statut: "En cours", date: "16/01/2024" },
    { id: 3, client: "Youssef Jaziri", montant: "67 DT", statut: "En attente", date: "16/01/2024" },
    { id: 4, client: "Amel Mansour", montant: "234 DT", statut: "Livré", date: "14/01/2024" },
    { id: 5, client: "Khaled Ben Salem", montant: "92 DT", statut: "En cours", date: "15/01/2024" },
  ];

  const topProducts = [
    { id: 1, nom: "Croquettes premium", ventes: 45, stock: 23 },
    { id: 2, nom: "Litière agglomérante", ventes: 38, stock: 15 },
    { id: 3, nom: "Jouet en corde", ventes: 32, stock: 8 },
    { id: 4, nom: "Poisson séché", ventes: 28, stock: 42 },
    { id: 5, nom: "Cage à oiseau", ventes: 12, stock: 5 },
  ];

  return (
    <div className="dashboard-container">
      <div className="welcome-section">
        <h1>Bienvenue sur PetFood TN</h1>
        <p>Gérez votre animalerie tunisienne en toute simplicité</p>
      </div>

      <div className="stats-grid">
        {stats.map(stat => (
          <div key={stat.id} className="stat-card" style={{ borderLeftColor: stat.color }}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-details">
              <h3>{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-row">
        <div className="dashboard-col">
          <div className="dashboard-card">
            <h2>Commandes récentes</h2>
            <table className="mini-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Montant</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.client}</td>
                    <td>{order.montant}</td>
                    <td>
                      <span className={`badge ${order.statut === 'Livré' ? 'badge-success' : 
                                               order.statut === 'En cours' ? 'badge-warning' : 'badge-info'}`}>
                        {order.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-col">
          <div className="dashboard-card">
            <h2>Top produits</h2>
            <table className="mini-table">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Ventes</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map(product => (
                  <tr key={product.id}>
                    <td>{product.nom}</td>
                    <td>{product.ventes}</td>
                    <td>
                      <span className={`stock-badge ${product.stock < 10 ? 'stock-low' : 'stock-ok'}`}>
                        {product.stock}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Page Produits avec CRUD
class Produits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produits: [
        { id: 1, nom: "Croquettes premium pour chien", prix: 89.990, stock: 45, categorie: "Alimentation", fournisseur: "Tunisie Aliments" },
        { id: 2, nom: "Litière agglomérante pour chat", prix: 24.500, stock: 30, categorie: "Hygiène", fournisseur: "Pet Supply TN" },
        { id: 3, nom: "Jouet en corde pour chien", prix: 12.900, stock: 15, categorie: "Jouets", fournisseur: "Tunisie Jouets" },
        { id: 4, nom: "Poisson séché pour chat", prix: 8.500, stock: 50, categorie: "Friandises", fournisseur: "Sfax Pet Food" },
        { id: 5, nom: "Cage à oiseau luxe", prix: 159.000, stock: 8, categorie: "Accessoires", fournisseur: "Tunisie Oiseaux" },
        { id: 6, nom: "Croquettes chat adulte", prix: 67.500, stock: 25, categorie: "Alimentation", fournisseur: "Tunisie Aliments" },
        { id: 7, nom: "Arbre à chat", prix: 189.000, stock: 6, categorie: "Accessoires", fournisseur: "Pet Supply TN" },
        { id: 8, nom: "Laisse pour chien", prix: 19.900, stock: 40, categorie: "Accessoires", fournisseur: "Tunisie Accessoires" },
      ],
      showModal: false,
      currentProduit: null,
      searchTerm: "",
      filterCategorie: ""
    };
  }

  handleAdd = () => {
    this.setState({ currentProduit: null, showModal: true });
  };

  handleEdit = (produit) => {
    this.setState({ currentProduit: produit, showModal: true });
  };

  handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      this.setState({
        produits: this.state.produits.filter(p => p.id !== id)
      });
    }
  };

  handleSave = (produit) => {
    if (this.state.currentProduit) {
      // Modification
      this.setState({
        produits: this.state.produits.map(p => 
          p.id === this.state.currentProduit.id ? { ...produit, id: this.state.currentProduit.id } : p
        ),
        showModal: false
      });
    } else {
      // Ajout
      this.setState({
        produits: [...this.state.produits, { ...produit, id: Date.now() }],
        showModal: false
      });
    }
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleFilterChange = (e) => {
    this.setState({ filterCategorie: e.target.value });
  };

  getFilteredProduits = () => {
    return this.state.produits.filter(p => {
      const matchesSearch = p.nom.toLowerCase().includes(this.state.searchTerm.toLowerCase());
      const matchesFilter = this.state.filterCategorie ? p.categorie === this.state.filterCategorie : true;
      return matchesSearch && matchesFilter;
    });
  };

  getCategories = () => {
    return [...new Set(this.state.produits.map(p => p.categorie))];
  };

  render() {
    const filteredProduits = this.getFilteredProduits();
    const categories = this.getCategories();

    return (
      <div className="page-container">
        <div className="page-header">
          <h1>Gestion des Produits</h1>
          <button className="btn-primary" onClick={this.handleAdd}>
            + Nouveau produit
          </button>
        </div>

        <div className="filters-bar">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={this.state.searchTerm}
            onChange={this.handleSearch}
            className="search-input"
          />
          <select 
            value={this.state.filterCategorie} 
            onChange={this.handleFilterChange}
            className="filter-select"
          >
            <option value="">Toutes les catégories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Prix (DT)</th>
                <th>Stock</th>
                <th>Fournisseur</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProduits.map(produit => (
                <tr key={produit.id}>
                  <td>{produit.id}</td>
                  <td>{produit.nom}</td>
                  <td>{produit.categorie}</td>
                  <td>{produit.prix.toFixed(3)} DT</td>
                  <td>
                    <span className={`stock-badge ${produit.stock < 10 ? 'stock-low' : 'stock-ok'}`}>
                      {produit.stock}
                    </span>
                  </td>
                  <td>{produit.fournisseur}</td>
                  <td>
                    <button className="btn-edit" onClick={() => this.handleEdit(produit)} title="Modifier">✏️</button>
                    <button className="btn-delete" onClick={() => this.handleDelete(produit.id)} title="Supprimer">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {this.state.showModal && (
          <ProduitModal 
            produit={this.state.currentProduit} 
            onSave={this.handleSave}
            onClose={this.handleCloseModal}
            categories={categories}
          />
        )}
      </div>
    );
  }
}

// Modal pour produit
const ProduitModal = ({ produit, onSave, onClose, categories }) => {
  const [formData, setFormData] = useState(
    produit || { 
      nom: "", 
      prix: "", 
      stock: "", 
      categorie: "Alimentation",
      fournisseur: "" 
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{produit ? "Modifier" : "Ajouter"} un produit</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom du produit</label>
            <input
              type="text"
              value={formData.nom}
              onChange={(e) => setFormData({...formData, nom: e.target.value})}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Prix (DT)</label>
              <input
                type="number"
                step="0.001"
                value={formData.prix}
                onChange={(e) => setFormData({...formData, prix: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Catégorie</label>
              <select
                value={formData.categorie}
                onChange={(e) => setFormData({...formData, categorie: e.target.value})}
                required
              >
                <option value="Alimentation">Alimentation</option>
                <option value="Hygiène">Hygiène</option>
                <option value="Jouets">Jouets</option>
                <option value="Friandises">Friandises</option>
                <option value="Accessoires">Accessoires</option>
              </select>
            </div>
            <div className="form-group">
              <label>Fournisseur</label>
              <input
                type="text"
                value={formData.fournisseur}
                onChange={(e) => setFormData({...formData, fournisseur: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn-primary">Enregistrer</button>
            <button type="button" className="btn-secondary" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Page Commandes
const Commandes = () => {
  const [commandes, setCommandes] = useState([
    { 
      id: 101, 
      client: "Mehdi Ben Ahmed", 
      date: "15/01/2024", 
      total: 189.90, 
      statut: "Livré",
      adresse: "15 Rue de Carthage, Tunis",
      telephone: "+216 52 123 456",
      produits: ["Croquettes premium", "Jouet en corde"]
    },
    { 
      id: 102, 
      client: "Sarra Trabelsi", 
      date: "16/01/2024", 
      total: 145.50, 
      statut: "En cours",
      adresse: "Avenue Habib Bourguiba, Sousse",
      telephone: "+216 98 765 432",
      produits: ["Litière agglomérante", "Poisson séché"]
    },
    { 
      id: 103, 
      client: "Youssef Jaziri", 
      date: "16/01/2024", 
      total: 67.30, 
      statut: "En attente",
      adresse: "Route de l'Aéroport, Sfax",
      telephone: "+216 23 456 789",
      produits: ["Croquettes chat"]
    },
    { 
      id: 104, 
      client: "Amel Mansour", 
      date: "14/01/2024", 
      total: 234.50, 
      statut: "Livré",
      adresse: "Rue de la Liberté, Bizerte",
      telephone: "+216 54 321 987",
      produits: ["Arbre à chat", "Croquettes premium", "Laisse"]
    },
    { 
      id: 105, 
      client: "Khaled Ben Salem", 
      date: "15/01/2024", 
      total: 92.80, 
      statut: "En cours",
      adresse: "Cité El Menzah, Tunis",
      telephone: "+216 29 876 543",
      produits: ["Cage à oiseau"]
    },
    { 
      id: 106, 
      client: "Nadia Ben Ali", 
      date: "13/01/2024", 
      total: 312.00, 
      statut: "Livré",
      adresse: "Rue de Marseille, La Marsa",
      telephone: "+216 25 111 222",
      produits: ["Croquettes premium x2", "Jouets divers"]
    },
  ]);

  const [filterStatut, setFilterStatut] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getFilteredCommandes = () => {
    return commandes.filter(cmd => {
      const matchesSearch = cmd.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatut ? cmd.statut === filterStatut : true;
      return matchesSearch && matchesFilter;
    });
  };

  const getStatutColor = (statut) => {
    switch(statut) {
      case "Livré": return "badge-success";
      case "En cours": return "badge-warning";
      case "En attente": return "badge-info";
      default: return "badge-secondary";
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gestion des Commandes</h1>
        <button className="btn-primary">+ Nouvelle commande</button>
      </div>

      <div className="filters-bar">
        <input
          type="text"
          placeholder="Rechercher un client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select 
          value={filterStatut} 
          onChange={(e) => setFilterStatut(e.target.value)}
          className="filter-select"
        >
          <option value="">Tous les statuts</option>
          <option value="Livré">Livré</option>
          <option value="En cours">En cours</option>
          <option value="En attente">En attente</option>
        </select>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>N° Commande</th>
              <th>Client</th>
              <th>Téléphone</th>
              <th>Date</th>
              <th>Produits</th>
              <th>Total (DT)</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredCommandes().map(commande => (
              <tr key={commande.id}>
                <td>CMD-{commande.id}</td>
                <td>{commande.client}</td>
                <td>{commande.telephone}</td>
                <td>{commande.date}</td>
                <td>{commande.produits.join(", ")}</td>
                <td><strong>{commande.total.toFixed(3)} DT</strong></td>
                <td>
                  <span className={`badge ${getStatutColor(commande.statut)}`}>
                    {commande.statut}
                  </span>
                </td>
                <td>
                  <button className="btn-edit" title="Modifier">✏️</button>
                  <button className="btn-view" title="Voir détails">👁️</button>
                  <button className="btn-delete" title="Annuler">❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Page Clients
const Clients = () => {
  const [clients, setClients] = useState([
    { 
      id: 1, 
      nom: "Mehdi Ben Ahmed", 
      email: "mehdi.benahmed@gmail.com", 
      tel: "+216 52 123 456",
      ville: "Tunis",
      dateInscription: "15/12/2023",
      totalAchats: 1250.00,
      commandes: 12,
      fidélité: "Or"
    },
    { 
      id: 2, 
      nom: "Sarra Trabelsi", 
      email: "sarra.trabelsi@yahoo.fr", 
      tel: "+216 98 765 432",
      ville: "Sousse",
      dateInscription: "03/01/2024",
      totalAchats: 850.50,
      commandes: 8,
      fidélité: "Argent"
    },
    { 
      id: 3, 
      nom: "Youssef Jaziri", 
      email: "youssef.jaziri@gmail.com", 
      tel: "+216 23 456 789",
      ville: "Sfax",
      dateInscription: "10/01/2024",
      totalAchats: 345.30,
      commandes: 3,
      fidélité: "Bronze"
    },
    { 
      id: 4, 
      nom: "Amel Mansour", 
      email: "amel.mansour@hotmail.com", 
      tel: "+216 54 321 987",
      ville: "Bizerte",
      dateInscription: "20/12/2023",
      totalAchats: 2340.50,
      commandes: 23,
      fidélité: "Or"
    },
    { 
      id: 5, 
      nom: "Khaled Ben Salem", 
      email: "khaled.bensalem@gmail.com", 
      tel: "+216 29 876 543",
      ville: "Nabeul",
      dateInscription: "05/01/2024",
      totalAchats: 567.80,
      commandes: 5,
      fidélité: "Argent"
    },
    { 
      id: 6, 
      nom: "Nadia Ben Ali", 
      email: "nadia.benali@topnet.tn", 
      tel: "+216 25 111 222",
      ville: "La Marsa",
      dateInscription: "02/12/2023",
      totalAchats: 1890.00,
      commandes: 18,
      fidélité: "Or"
    },
    { 
      id: 7, 
      nom: "Hichem Mhadhbi", 
      email: "hichem.mhadhbi@gmail.com", 
      tel: "+216 94 567 890",
      ville: "Monastir",
      dateInscription: "12/01/2024",
      totalAchats: 234.90,
      commandes: 2,
      fidélité: "Bronze"
    },
    { 
      id: 8, 
      nom: "Leila Ben Ammar", 
      email: "leila.benammar@planet.tn", 
      tel: "+216 55 444 333",
      ville: "Tunis",
      dateInscription: "08/12/2023",
      totalAchats: 3450.00,
      commandes: 34,
      fidélité: "Platine"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterVille, setFilterVille] = useState("");
  const [filterFidelite, setFilterFidelite] = useState("");

  const villes = [...new Set(clients.map(c => c.ville))];
  const fidelites = [...new Set(clients.map(c => c.fidélité))];

  const getFilteredClients = () => {
    return clients.filter(client => {
      const matchesSearch = client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesVille = filterVille ? client.ville === filterVille : true;
      const matchesFidelite = filterFidelite ? client.fidélité === filterFidelite : true;
      return matchesSearch && matchesVille && matchesFidelite;
    });
  };

  const getFideliteColor = (fidelite) => {
    switch(fidelite) {
      case "Platine": return "badge-platine";
      case "Or": return "badge-or";
      case "Argent": return "badge-argent";
      case "Bronze": return "badge-bronze";
      default: return "badge-normal";
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gestion des Clients</h1>
        <button className="btn-primary">+ Nouveau client</button>
      </div>

      <div className="filters-bar">
        <input
          type="text"
          placeholder="Rechercher un client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select 
          value={filterVille} 
          onChange={(e) => setFilterVille(e.target.value)}
          className="filter-select"
        >
          <option value="">Toutes les villes</option>
          {villes.map(ville => (
            <option key={ville} value={ville}>{ville}</option>
          ))}
        </select>
        <select 
          value={filterFidelite} 
          onChange={(e) => setFilterFidelite(e.target.value)}
          className="filter-select"
        >
          <option value="">Tous les niveaux</option>
          {fidelites.map(fid => (
            <option key={fid} value={fid}>{fid}</option>
          ))}
        </select>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom & Prénom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Ville</th>
              <th>Inscription</th>
              <th>Total achats</th>
              <th>Commandes</th>
              <th>Fidélité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredClients().map(client => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td><strong>{client.nom}</strong></td>
                <td>{client.email}</td>
                <td>{client.tel}</td>
                <td>{client.ville}</td>
                <td>{client.dateInscription}</td>
                <td>{client.totalAchats.toFixed(3)} DT</td>
                <td>{client.commandes}</td>
                <td>
                  <span className={`badge ${getFideliteColor(client.fidélité)}`}>
                    {client.fidélité}
                  </span>
                </td>
                <td>
                  <button className="btn-edit" title="Modifier">✏️</button>
                  <button className="btn-view" title="Voir historique">📋</button>
                  <button className="btn-delete" title="Supprimer">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Page Factures
const Factures = () => {
  const [factures, setFactures] = useState([
    { id: "FAC-001", client: "Mehdi Ben Ahmed", date: "15/01/2024", montant: 189.90, statut: "Payée", mode: "Carte bancaire" },
    { id: "FAC-002", client: "Sarra Trabelsi", date: "16/01/2024", montant: 145.50, statut: "En attente", mode: "Espèces" },
    { id: "FAC-003", client: "Youssef Jaziri", date: "16/01/2024", montant: 67.30, statut: "Impayée", mode: "Virement" },
    { id: "FAC-004", client: "Amel Mansour", date: "14/01/2024", montant: 234.50, statut: "Payée", mode: "Carte bancaire" },
    { id: "FAC-005", client: "Khaled Ben Salem", date: "15/01/2024", montant: 92.80, statut: "Payée", mode: "Espèces" },
    { id: "FAC-006", client: "Nadia Ben Ali", date: "13/01/2024", montant: 312.00, statut: "Payée", mode: "Carte bancaire" },
  ]);

  const totalFactures = factures.reduce((sum, f) => sum + f.montant, 0);
  const totalPaye = factures.filter(f => f.statut === "Payée").reduce((sum, f) => sum + f.montant, 0);
  const totalImpaye = factures.filter(f => f.statut !== "Payée").reduce((sum, f) => sum + f.montant, 0);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gestion des Factures</h1>
        <button className="btn-primary">+ Nouvelle facture</button>
      </div>

      <div className="stats-mini-grid">
        <div className="stat-mini-card">
          <span className="stat-mini-label">Total facturé</span>
          <span className="stat-mini-value">{totalFactures.toFixed(3)} DT</span>
        </div>
        <div className="stat-mini-card">
          <span className="stat-mini-label">Payé</span>
          <span className="stat-mini-value text-success">{totalPaye.toFixed(3)} DT</span>
        </div>
        <div className="stat-mini-card">
          <span className="stat-mini-label">Impayé</span>
          <span className="stat-mini-value text-danger">{totalImpaye.toFixed(3)} DT</span>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>N° Facture</th>
              <th>Client</th>
              <th>Date</th>
              <th>Montant (DT)</th>
              <th>Mode</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {factures.map(facture => (
              <tr key={facture.id}>
                <td>{facture.id}</td>
                <td>{facture.client}</td>
                <td>{facture.date}</td>
                <td><strong>{facture.montant.toFixed(3)} DT</strong></td>
                <td>{facture.mode}</td>
                <td>
                  <span className={`badge ${facture.statut === 'Payée' ? 'badge-success' : 
                                           facture.statut === 'En attente' ? 'badge-warning' : 'badge-danger'}`}>
                    {facture.statut}
                  </span>
                </td>
                <td>
                  <button className="btn-view" title="Voir">👁️</button>
                  <button className="btn-edit" title="Modifier">✏️</button>
                  <button className="btn-download" title="Télécharger PDF">📥</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Page Avis
const Avis = () => {
  const [avis, setAvis] = useState([
    { id: 1, client: "Mehdi Ben Ahmed", produit: "Croquettes premium", note: 5, commentaire: "Excellent produit, mon chien adore !", date: "15/01/2024" },
    { id: 2, client: "Sarra Trabelsi", produit: "Litière agglomérante", note: 4, commentaire: "Très bonne qualité, aucun odeur", date: "14/01/2024" },
    { id: 3, client: "Youssef Jaziri", produit: "Arbre à chat", note: 5, commentaire: "Mes chats l'adorent, livraison rapide", date: "13/01/2024" },
    { id: 4, client: "Amel Mansour", produit: "Croquettes chat", note: 3, commentaire: "Bon produit mais un peu cher", date: "12/01/2024" },
    { id: 5, client: "Khaled Ben Salem", produit: "Cage à oiseau", note: 5, commentaire: "Parfaite pour mon perroquet", date: "11/01/2024" },
    { id: 6, client: "Nadia Ben Ali", produit: "Jouet en corde", note: 4, commentaire: "Très résistant, je recommande", date: "10/01/2024" },
  ]);

  const moyenneGenerale = (avis.reduce((sum, a) => sum + a.note, 0) / avis.length).toFixed(1);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Avis clients</h1>
        <div className="moyenne-avis">
          Note moyenne: <strong>{moyenneGenerale}/5</strong> ⭐
        </div>
      </div>

      <div className="avis-grid">
        {avis.map(a => (
          <div key={a.id} className="avis-card">
            <div className="avis-header">
              <div className="avis-client">
                <span className="client-name">{a.client}</span>
                <span className="avis-date">{a.date}</span>
              </div>
              <div className="avis-rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < a.note ? "star-filled" : "star-empty"}>⭐</span>
                ))}
              </div>
            </div>
            <div className="avis-produit">
              <small>Produit: {a.produit}</small>
            </div>
            <p className="avis-commentaire">"{a.commentaire}"</p>
            <div className="avis-actions">
              <button className="btn-edit" title="Modifier">✏️</button>
              <button className="btn-delete" title="Supprimer">🗑️</button>
              <button className="btn-reply" title="Répondre">💬</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Page Historique
const Historique = () => {
  const [historique, setHistorique] = useState([
    { id: 1, action: "Nouveau produit ajouté", user: "Admin", date: "16/01/2024 10:30", details: "Ajout de Croquettes premium - Fournisseur: Tunisie Aliments" },
    { id: 2, action: "Commande modifiée", user: "Admin", date: "16/01/2024 09:15", details: "Modification commande #102 pour Sarra Trabelsi" },
    { id: 3, action: "Nouveau client inscrit", user: "Système", date: "15/01/2024 16:20", details: "Inscription de Hichem Mhadhbi - Monastir" },
    { id: 4, action: "Paiement reçu", user: "Système", date: "15/01/2024 14:45", details: "Paiement de 189.90 DT - Facture FAC-001" },
    { id: 5, action: "Stock mis à jour", user: "Admin", date: "14/01/2024 11:30", details: "Mise à jour stock: Arbre à chat (8 unités)" },
    { id: 6, action: "Facture générée", user: "Système", date: "14/01/2024 10:00", details: "Facture FAC-006 pour Nadia Ben Ali - 312 DT" },
  ]);

  return (
    <div className="page-container">
      <h1>Historique des actions</h1>
      <div className="timeline">
        {historique.map(item => (
          <div key={item.id} className="timeline-item">
            <div className="timeline-date">{item.date}</div>
            <div className="timeline-content">
              <h4>{item.action}</h4>
              <p>{item.details}</p>
              <small>Par: {item.user}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Page Notifications
const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Nouvelle commande #106 de Nadia Ben Ali", date: "16/01/2024 10:30", lu: false, type: "commande" },
    { id: 2, message: "Stock faible : Arbre à chat (6 unités)", date: "16/01/2024 09:15", lu: false, type: "stock" },
    { id: 3, message: "Nouvel avis de Mehdi Ben Ahmed ⭐⭐⭐⭐⭐", date: "15/01/2024 16:20", lu: true, type: "avis" },
    { id: 4, message: "Paiement reçu - Facture FAC-004 (234.50 DT)", date: "15/01/2024 14:45", lu: true, type: "paiement" },
    { id: 5, message: "Nouveau client inscrit: Hichem Mhadhbi", date: "14/01/2024 11:30", lu: false, type: "client" },
  ]);

  const marquerCommeLu = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, lu: true } : n
    ));
  };

  const nonLus = notifications.filter(n => !n.lu).length;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Notifications</h1>
        <div className="notif-count">{nonLus} non lue{nonLus > 1 ? 's' : ''}</div>
      </div>

      <div className="notifications-list">
        {notifications.map(notif => (
          <div key={notif.id} className={`notification-item ${notif.lu ? 'lu' : 'non-lu'}`}>
            <div className="notification-icon">
              {notif.type === 'commande' && '📦'}
              {notif.type === 'stock' && '⚠️'}
              {notif.type === 'avis' && '⭐'}
              {notif.type === 'paiement' && '💰'}
              {notif.type === 'client' && '👤'}
            </div>
            <div className="notification-content">
              <p>{notif.message}</p>
              <small>{notif.date}</small>
            </div>
            {!notif.lu && (
              <button onClick={() => marquerCommeLu(notif.id)} className="btn-mark-read">
                ✓
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Page Informations Société
const InfoSociete = () => {
  const [info, setInfo] = useState({
    nom: "PetFood TN",
    slogan: "La nutrition premium pour vos animaux",
    email: "contact@petfood.tn",
    tel: "+216 71 123 456",
    adresse: "15 Avenue Habib Bourguiba, 1000 Tunis, Tunisie",
    site: "www.petfood.tn",
    matriculeFiscale: "1234567/X/A/M/000",
    rib: "TN59 1234 5678 9012 3456 7890",
    banque: "Banque de Tunisie",
    responsable: "Mohamed Ben Salem"
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert("Informations mises à jour avec succès !");
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Informations Société</h1>
        <button className="btn-primary" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Annuler' : 'Modifier'}
        </button>
      </div>
      
      <div className="info-societe-card">
        <div className="company-header">
          <div className="company-logo-large">
            <div className="logo-placeholder">🐾</div>
          </div>
          <div className="company-title">
            <h2>{info.nom}</h2>
            <p className="company-slogan">{info.slogan}</p>
          </div>
        </div>
        
        <div className="info-grid">
          <div className="info-item">
            <label>Email</label>
            {isEditing ? (
              <input type="email" value={info.email} onChange={(e) => setInfo({...info, email: e.target.value})} />
            ) : (
              <p>{info.email}</p>
            )}
          </div>

          <div className="info-item">
            <label>Téléphone</label>
            {isEditing ? (
              <input type="tel" value={info.tel} onChange={(e) => setInfo({...info, tel: e.target.value})} />
            ) : (
              <p>{info.tel}</p>
            )}
          </div>

          <div className="info-item">
            <label>Adresse</label>
            {isEditing ? (
              <textarea value={info.adresse} onChange={(e) => setInfo({...info, adresse: e.target.value})} />
            ) : (
              <p>{info.adresse}</p>
            )}
          </div>

          <div className="info-item">
            <label>Site web</label>
            {isEditing ? (
              <input type="text" value={info.site} onChange={(e) => setInfo({...info, site: e.target.value})} />
            ) : (
              <p>{info.site}</p>
            )}
          </div>

          <div className="info-item">
            <label>Matricule fiscale</label>
            {isEditing ? (
              <input type="text" value={info.matriculeFiscale} onChange={(e) => setInfo({...info, matriculeFiscale: e.target.value})} />
            ) : (
              <p>{info.matriculeFiscale}</p>
            )}
          </div>

          <div className="info-item">
            <label>RIB</label>
            {isEditing ? (
              <input type="text" value={info.rib} onChange={(e) => setInfo({...info, rib: e.target.value})} />
            ) : (
              <p>{info.rib}</p>
            )}
          </div>

          <div className="info-item">
            <label>Banque</label>
            {isEditing ? (
              <input type="text" value={info.banque} onChange={(e) => setInfo({...info, banque: e.target.value})} />
            ) : (
              <p>{info.banque}</p>
            )}
          </div>

          <div className="info-item">
            <label>Responsable</label>
            {isEditing ? (
              <input type="text" value={info.responsable} onChange={(e) => setInfo({...info, responsable: e.target.value})} />
            ) : (
              <p>{info.responsable}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="form-actions">
            <button className="btn-primary" onClick={handleSave}>Enregistrer les modifications</button>
          </div>
        )}
      </div>
    </div>
  );
};

// Page Paiements
const Paiements = () => {
  const [paiements, setPaiements] = useState([
    { id: 1, commande: "CMD-101", client: "Mehdi Ben Ahmed", montant: 189.90, mode: "Carte bancaire", date: "15/01/2024", statut: "Validé" },
    { id: 2, commande: "CMD-102", client: "Sarra Trabelsi", montant: 145.50, mode: "Espèces", date: "16/01/2024", statut: "En attente" },
    { id: 3, commande: "CMD-104", client: "Amel Mansour", montant: 234.50, mode: "Carte bancaire", date: "14/01/2024", statut: "Validé" },
    { id: 4, commande: "CMD-105", client: "Khaled Ben Salem", montant: 92.80, mode: "Virement", date: "15/01/2024", statut: "Validé" },
    { id: 5, commande: "CMD-106", client: "Nadia Ben Ali", montant: 312.00, mode: "Carte bancaire", date: "13/01/2024", statut: "Validé" },
  ]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gestion des Paiements</h1>
      </div>

      <div className="stats-mini-grid">
        <div className="stat-mini-card">
          <span className="stat-mini-label">Total encaissé</span>
          <span className="stat-mini-value">
            {paiements.filter(p => p.statut === "Validé").reduce((sum, p) => sum + p.montant, 0).toFixed(3)} DT
          </span>
        </div>
        <div className="stat-mini-card">
          <span className="stat-mini-label">En attente</span>
          <span className="stat-mini-value text-warning">
            {paiements.filter(p => p.statut === "En attente").reduce((sum, p) => sum + p.montant, 0).toFixed(3)} DT
          </span>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Commande</th>
              <th>Client</th>
              <th>Montant (DT)</th>
              <th>Mode</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paiements.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.commande}</td>
                <td>{p.client}</td>
                <td><strong>{p.montant.toFixed(3)} DT</strong></td>
                <td>{p.mode}</td>
                <td>{p.date}</td>
                <td>
                  <span className={`badge ${p.statut === 'Validé' ? 'badge-success' : 'badge-warning'}`}>
                    {p.statut}
                  </span>
                </td>
                <td>
                  <button className="btn-view" title="Voir">👁️</button>
                  <button className="btn-print" title="Reçu">🧾</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Page Contact
const Contact = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      nom: "Ahmed Ben Ali", 
      email: "ahmed.benali@gmail.com", 
      telephone: "+216 98 765 432",
      sujet: "Question sur produit", 
      message: "Bonjour, je souhaite avoir plus d'informations sur les croquettes premium pour chien. Est-ce que vous avez une composition détaillée ?", 
      date: "16/01/2024", 
      statut: "Non lu" 
    },
    { 
      id: 2, 
      nom: "Sarra Ben Salah", 
      email: "sarra.salah@yahoo.fr", 
      telephone: "+216 52 345 678",
      sujet: "Réclamation", 
      message: "Bonjour, j'ai reçu ma commande #102 avec un article manquant. Pouvez-vous me contacter rapidement ?", 
      date: "15/01/2024", 
      statut: "Lu" 
    },
    { 
      id: 3, 
      nom: "Mohamed Jaziri", 
      email: "mohamed.jaziri@topnet.tn", 
      telephone: "+216 23 456 789",
      sujet: "Devis", 
      message: "Bonjour, je souhaite ouvrir une animalerie et j'aimerais un devis pour des produits en gros. Merci de me contacter.", 
      date: "15/01/2024", 
      statut: "Lu" 
    },
    { 
      id: 4, 
      nom: "Leila Mansour", 
      email: "leila.m@hotmail.com", 
      telephone: "+216 54 321 987",
      sujet: "Demande de partenariat", 
      message: "Bonjour, nous sommes un élevage de chiens à Sousse et nous souhaitons devenir partenaires pour les achats en gros.", 
      date: "14/01/2024", 
      statut: "Non lu" 
    },
  ]);

  const [filterStatut, setFilterStatut] = useState("");

  const getFilteredMessages = () => {
    if (filterStatut) {
      return messages.filter(m => m.statut === filterStatut);
    }
    return messages;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Messages de contact</h1>
        <select 
          value={filterStatut} 
          onChange={(e) => setFilterStatut(e.target.value)}
          className="filter-select"
        >
          <option value="">Tous les messages</option>
          <option value="Non lu">Non lus</option>
          <option value="Lu">Lus</option>
        </select>
      </div>

      <div className="messages-container">
        {getFilteredMessages().map(message => (
          <div key={message.id} className={`message-card ${message.statut === 'Non lu' ? 'message-unread' : ''}`}>
            <div className="message-header">
              <div>
                <h3>{message.nom}</h3>
                <div className="message-contact">
                  <span>{message.email}</span>
                  <span> • </span>
                  <span>{message.telephone}</span>
                </div>
              </div>
              <div className="message-date-status">
                <span className="message-date">{message.date}</span>
                <span className={`badge ${message.statut === 'Non lu' ? 'badge-info' : 'badge-secondary'}`}>
                  {message.statut}
                </span>
              </div>
            </div>
            <div className="message-subject">
              <strong>Sujet:</strong> {message.sujet}
            </div>
            <div className="message-body">
              <p>{message.message}</p>
            </div>
            <div className="message-footer">
              <div className="message-actions">
                <button className="btn-reply">
                  <span>💬</span> Répondre
                </button>
                <button className="btn-mark-read">
                  {message.statut === 'Non lu' ? '✓ Marquer comme lu' : '↩ Marquer comme non lu'}
                </button>
                <button className="btn-delete">
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant Login
const Login = () => {
  const { login } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    login("admin@petfood.tn", "password");
  };

  return (
    <div className={`login-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="theme-toggle-login">
        <button onClick={toggleTheme} className="theme-btn">
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
      <div className="login-box">
        <div className="login-logo">
          <span className="logo-icon">🐾</span>
          <h1>PetFood TN</h1>
        </div>
        <p className="login-slogan">Plateforme de gestion - Tunisie</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="email" placeholder="Email" defaultValue="admin@petfood.tn" required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Mot de passe" defaultValue="password" required />
          </div>
          <button type="submit" className="login-btn">Se connecter</button>
        </form>
        <p className="login-footer">© 2024 PetFood TN - Tous droits réservés</p>
      </div>
    </div>
  );
};

// Route privée
const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

// Contenu principal
function AppContent() {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const companyInfo = {
    name: "PetFood TN",
    slogan: "La nutrition premium pour vos animaux - Tunisie",
    logo: "/logo-petfood.png",
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {user ? (
        <div className="app-layout">
          <Sidebar companyInfo={companyInfo} onLogout={logout} />
          <div className="main-content">
            <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <main className="content-area">
              <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/produits" component={Produits} />
                <Route path="/commandes" component={Commandes} />
                <Route path="/clients" component={Clients} />
                <Route path="/factures" component={Factures} />
                <Route path="/avis" component={Avis} />
                <Route path="/historique" component={Historique} />
                <Route path="/notifications" component={Notifications} />
                <Route path="/info-societe" component={InfoSociete} />
                <Route path="/paiements" component={Paiements} />
                <Route path="/contact" component={Contact} />
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </main>
          </div>
        </div>
      ) : (
        <Switch>
          <Route path="/login" component={Login} />
          <Redirect from="*" to="/login" />
        </Switch>
      )}
    </div>
  );
}

// App principal
function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;