import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // ==================== ÉTAT GLOBAL ====================
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  // États pour les modales
  const [showProductModal, setShowProductModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // ==================== DONNÉES ====================
  const [products, setProducts] = useState([
    { id: 1, name: "Croquettes Royal Canin", category: "Croquettes", price: 89.500, stock: 23, image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=100&h=100&fit=crop" },
    { id: 2, name: "Pâtée Gourmet Chat", category: "Pâtées", price: 12.750, stock: 45, image: "https://images.unsplash.com/photo-1589924691995-4008b2a9f9d6?w=100&h=100&fit=crop" },
    { id: 3, name: "Litière Naturelle", category: "Soins", price: 18.250, stock: 12, image: "https://images.unsplash.com/photo-1583336663277-620dc5a1d9d3?w=100&h=100&fit=crop" },
    { id: 4, name: "Brosse Démêlante", category: "Accessoires", price: 8.500, stock: 34, image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=100&h=100&fit=crop" }
  ]);

  const [orders, setOrders] = useState([
    { id: "CMD001", client: "Mehdi Ben Ahmed", date: "2026-03-02", amount: 189, status: "livre" },
    { id: "CMD002", client: "Sarra Trabelsi", date: "2026-03-02", amount: 145, status: "encours" },
    { id: "CMD003", client: "Youssef Jaziri", date: "2026-03-01", amount: 267, status: "attente" }
  ]);

  const [customers, setCustomers] = useState([
    { id: 1, name: "Mehdi Ben Ahmed", email: "mehdi@email.com", phone: "+216 98 765 432", orders: 12, total: 1234 },
    { id: 2, name: "Sarra Trabelsi", email: "sarra@email.com", phone: "+216 97 654 321", orders: 8, total: 890 }
  ]);

  const [reviews, setReviews] = useState([
    { id: 1, client: "Ahmed Ben Ali", product: "Croquettes", rating: 5, comment: "Excellent !", status: "approuvé" },
    { id: 2, client: "Fatma Said", product: "Pâtée", rating: 4, comment: "Très bien", status: "en_attente" }
  ]);

  // ==================== STATISTIQUES ====================
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    customers: 0,
    revenue: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    calculateStats();
  }, [products, orders, customers]);

  const calculateStats = () => {
    setStats({
      products: products.length,
      orders: orders.length,
      customers: customers.length,
      revenue: orders
        .filter(o => o.status === 'livre')
        .reduce((sum, o) => sum + o.amount, 0),
      pendingOrders: orders.filter(o => o.status === 'attente' || o.status === 'encours').length
    });
  };

  // ==================== THÈME SOMBRE ====================
  useEffect(() => {
    const savedTheme = localStorage.getItem('petfood-theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }

    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('petfood-theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('petfood-theme', 'light');
    }
  }, [isDarkMode]);

  // ==================== FONCTIONS UTILITAIRES ====================
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR');
  };

  const formatDateTime = () => {
    const date = currentDateTime;
    return {
      date: date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      time: date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString() + ' DT';
  };

  const getStatusText = (status) => {
    const map = {
      'livre': 'Livré',
      'encours': 'En cours',
      'attente': 'En attente',
      'approuvé': 'Approuvé',
      'en_attente': 'En attente'
    };
    return map[status] || status;
  };

  const getStatusClass = (status) => {
    const map = {
      'livre': 'success',
      'approuvé': 'success',
      'encours': 'warning',
      'en_attente': 'warning',
      'attente': 'danger'
    };
    return map[status] || 'default';
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  // ==================== CRUD ====================
  const handleDelete = (type, id) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer cet élément ?`)) {
      if (type === 'product') setProducts(products.filter(p => p.id !== id));
      if (type === 'order') setOrders(orders.filter(o => o.id !== id));
      if (type === 'customer') setCustomers(customers.filter(c => c.id !== id));
      if (type === 'review') setReviews(reviews.filter(r => r.id !== id));
      showNotification('Élément supprimé', 'info');
    }
  };

  const handleView = (type, item) => {
    alert(JSON.stringify(item, null, 2));
  };

  // ==================== FILTRES ====================
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReviews = reviews.filter(r =>
    r.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ==================== MODALES ====================
  const ProductModal = () => (
    <div className="modal" onClick={() => setShowProductModal(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingItem ? 'Modifier' : 'Ajouter'} un produit</h2>
          <button className="close" onClick={() => setShowProductModal(false)}>&times;</button>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          setShowProductModal(false);
          showNotification('Produit sauvegardé', 'success');
        }}>
          <div className="form-group">
            <label>Nom</label>
            <input type="text" defaultValue={editingItem?.name} required />
          </div>
          <div className="form-group">
            <label>Catégorie</label>
            <select defaultValue={editingItem?.category || 'Croquettes'}>
              <option>Croquettes</option>
              <option>Pâtées</option>
              <option>Accessoires</option>
            </select>
          </div>
          <div className="form-group">
            <label>Prix (DT)</label>
            <input type="number" step="0.001" defaultValue={editingItem?.price} required />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input type="number" defaultValue={editingItem?.stock} required />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input type="url" defaultValue={editingItem?.image} required />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingItem ? 'Modifier' : 'Ajouter'}
          </button>
        </form>
      </div>
    </div>
  );

  const OrderModal = () => (
    <div className="modal" onClick={() => setShowOrderModal(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingItem ? 'Modifier' : 'Ajouter'} une commande</h2>
          <button className="close" onClick={() => setShowOrderModal(false)}>&times;</button>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          setShowOrderModal(false);
          showNotification('Commande sauvegardée', 'success');
        }}>
          <div className="form-group">
            <label>Client</label>
            <input type="text" defaultValue={editingItem?.client} required />
          </div>
          <div className="form-group">
            <label>Montant (DT)</label>
            <input type="number" step="0.001" defaultValue={editingItem?.amount} required />
          </div>
          <div className="form-group">
            <label>Statut</label>
            <select defaultValue={editingItem?.status || 'attente'}>
              <option value="attente">En attente</option>
              <option value="encours">En cours</option>
              <option value="livre">Livré</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            {editingItem ? 'Modifier' : 'Ajouter'}
          </button>
        </form>
      </div>
    </div>
  );

  const CustomerModal = () => (
    <div className="modal" onClick={() => setShowCustomerModal(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingItem ? 'Modifier' : 'Ajouter'} un client</h2>
          <button className="close" onClick={() => setShowCustomerModal(false)}>&times;</button>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          setShowCustomerModal(false);
          showNotification('Client sauvegardé', 'success');
        }}>
          <div className="form-group">
            <label>Nom</label>
            <input type="text" defaultValue={editingItem?.name} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" defaultValue={editingItem?.email} required />
          </div>
          <div className="form-group">
            <label>Téléphone</label>
            <input type="text" defaultValue={editingItem?.phone} required />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingItem ? 'Modifier' : 'Ajouter'}
          </button>
        </form>
      </div>
    </div>
  );

  const ReviewModal = () => (
    <div className="modal" onClick={() => setShowReviewModal(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingItem ? 'Modifier' : 'Ajouter'} un avis</h2>
          <button className="close" onClick={() => setShowReviewModal(false)}>&times;</button>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          setShowReviewModal(false);
          showNotification('Avis sauvegardé', 'success');
        }}>
          <div className="form-group">
            <label>Client</label>
            <input type="text" defaultValue={editingItem?.client} required />
          </div>
          <div className="form-group">
            <label>Produit</label>
            <input type="text" defaultValue={editingItem?.product} required />
          </div>
          <div className="form-group">
            <label>Note (1-5)</label>
            <input type="number" min="1" max="5" defaultValue={editingItem?.rating || 5} required />
          </div>
          <div className="form-group">
            <label>Commentaire</label>
            <textarea rows="3" defaultValue={editingItem?.comment} required />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingItem ? 'Modifier' : 'Ajouter'}
          </button>
        </form>
      </div>
    </div>
  );

  // ==================== RENDU ====================
  const { date, time } = formatDateTime();

  return (
    <div className="app-container">
      {/* Notification */}
      {notification.show && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <i className="fas fa-paw"></i>
          <div>
            <h2>PetFood TN</h2>
            <p>La nutrition premium</p>
          </div>
        </div>

        <nav>
          {[
            { id: 'dashboard', icon: 'home', label: 'Tableau de bord' },
            { id: 'products', icon: 'box', label: 'Produits' },
            { id: 'orders', icon: 'shopping-cart', label: 'Commandes' },
            { id: 'customers', icon: 'users', label: 'Clients' },
            { id: 'reviews', icon: 'star', label: 'Avis' }
          ].map(section => (
            <div
              key={section.id}
              className={`nav-item ${currentSection === section.id ? 'active' : ''}`}
              onClick={() => {
                setCurrentSection(section.id);
                setSearchTerm('');
              }}
            >
              <i className={`fas fa-${section.icon}`}></i>
              {section.label}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>El Jezi Ghassen</p>
          <p className="admin-role">Administrateur</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div>
            <h1 className="page-title">
              {currentSection === 'dashboard' && 'Tableau de bord'}
              {currentSection === 'products' && 'Gestion des Produits'}
              {currentSection === 'orders' && 'Gestion des Commandes'}
              {currentSection === 'customers' && 'Gestion des Clients'}
              {currentSection === 'reviews' && 'Gestion des Avis'}
            </h1>
            <p>El Jezi Ghassen, Admin</p>
          </div>

          <div className="admin-info">
            <button className="theme-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
              <i className={`fas fa-${isDarkMode ? 'sun' : 'moon'}`}></i>
            </button>

            <div className="profile">
              <div className="avatar">EG</div>
              <div>
                <strong>El Jezi Ghassen</strong>
                <p className="admin-role">ADMINISTRATEUR</p>
              </div>
            </div>

            <div className="date-time">
              <div className="date">{date}</div>
              <div className="time">{time}</div>
            </div>
          </div>
        </div>

        {/* DASHBOARD */}
        {currentSection === 'dashboard' && (
          <div className="dashboard">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon blue">
                  <i className="fas fa-box"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-label">Produits</span>
                  <span className="stat-value">{stats.products}</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon green">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-label">Commandes</span>
                  <span className="stat-value">{stats.orders}</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon orange">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-label">En attente</span>
                  <span className="stat-value">{stats.pendingOrders}</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon purple">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-label">Clients</span>
                  <span className="stat-value">{stats.customers}</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon gold">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-label">CA Total</span>
                  <span className="stat-value">{formatCurrency(stats.revenue)}</span>
                </div>
              </div>
            </div>

            {/* Graphique des ventes */}
            <div className="chart-container">
              <h3>Ventes des 7 derniers jours</h3>
              <div className="simple-chart">
                <div className="bar" style={{height: '40px'}}>Lun<br/><small>450 DT</small></div>
                <div className="bar" style={{height: '65px'}}>Mar<br/><small>780 DT</small></div>
                <div className="bar" style={{height: '55px'}}>Mer<br/><small>620 DT</small></div>
                <div className="bar" style={{height: '80px'}}>Jeu<br/><small>950 DT</small></div>
                <div className="bar" style={{height: '70px'}}>Ven<br/><small>840 DT</small></div>
                <div className="bar" style={{height: '90px'}}>Sam<br/><small>1100 DT</small></div>
                <div className="bar" style={{height: '60px'}}>Dim<br/><small>720 DT</small></div>
              </div>
            </div>
          </div>
        )}

        {/* PRODUITS */}
        {currentSection === 'products' && (
          <div className="section">
            <div className="section-header">
              <h2>Gestion des Produits</h2>
              <div className="header-actions">
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" onClick={() => {
                  setEditingItem(null);
                  setShowProductModal(true);
                }}>
                  <i className="fas fa-plus"></i> Nouveau
                </button>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Produit</th>
                    <th>Catégorie</th>
                    <th>Prix</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id}>
                      <td><img src={product.image} alt={product.name} className="table-image" /></td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{formatCurrency(product.price)}</td>
                      <td>{product.stock}</td>
                      <td className="actions-cell">
                        <button className="action-btn view" onClick={() => handleView('product', product)} title="Consulter">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="action-btn edit" onClick={() => {
                          setEditingItem(product);
                          setShowProductModal(true);
                        }} title="Modifier">
                          <i className="fas fa-pen"></i>
                        </button>
                        <button className="action-btn delete" onClick={() => handleDelete('product', product.id)} title="Supprimer">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* COMMANDES */}
        {currentSection === 'orders' && (
          <div className="section">
            <div className="section-header">
              <h2>Gestion des Commandes</h2>
              <div className="header-actions">
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" onClick={() => {
                  setEditingItem(null);
                  setShowOrderModal(true);
                }}>
                  <i className="fas fa-plus"></i> Nouvelle
                </button>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>N° Commande</th>
                    <th>Client</th>
                    <th>Date</th>
                    <th>Montant</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.id}>
                      <td><strong>{order.id}</strong></td>
                      <td>{order.client}</td>
                      <td>{formatDate(order.date)}</td>
                      <td>{formatCurrency(order.amount)}</td>
                      <td>
                        <span className={`status status-${getStatusClass(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <button className="action-btn view" onClick={() => handleView('order', order)} title="Consulter">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="action-btn edit" onClick={() => {
                          setEditingItem(order);
                          setShowOrderModal(true);
                        }} title="Modifier">
                          <i className="fas fa-pen"></i>
                        </button>
                        <button className="action-btn delete" onClick={() => handleDelete('order', order.id)} title="Supprimer">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CLIENTS */}
        {currentSection === 'customers' && (
          <div className="section">
            <div className="section-header">
              <h2>Gestion des Clients</h2>
              <div className="header-actions">
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" onClick={() => {
                  setEditingItem(null);
                  setShowCustomerModal(true);
                }}>
                  <i className="fas fa-user-plus"></i> Nouveau
                </button>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Commandes</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map(customer => (
                    <tr key={customer.id}>
                      <td><strong>{customer.name}</strong></td>
                      <td>{customer.email}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.orders}</td>
                      <td>{formatCurrency(customer.total)}</td>
                      <td className="actions-cell">
                        <button className="action-btn view" onClick={() => handleView('customer', customer)} title="Consulter">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="action-btn edit" onClick={() => {
                          setEditingItem(customer);
                          setShowCustomerModal(true);
                        }} title="Modifier">
                          <i className="fas fa-pen"></i>
                        </button>
                        <button className="action-btn delete" onClick={() => handleDelete('customer', customer.id)} title="Supprimer">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AVIS */}
        {currentSection === 'reviews' && (
          <div className="section">
            <div className="section-header">
              <h2>Gestion des Avis</h2>
              <div className="header-actions">
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" onClick={() => {
                  setEditingItem(null);
                  setShowReviewModal(true);
                }}>
                  <i className="fas fa-plus"></i> Nouvel avis
                </button>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Produit</th>
                    <th>Note</th>
                    <th>Avis</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReviews.map(review => (
                    <tr key={review.id}>
                      <td>{review.client}</td>
                      <td>{review.product}</td>
                      <td>{'⭐'.repeat(review.rating)}</td>
                      <td>{review.comment}</td>
                      <td>
                        <span className={`status status-${getStatusClass(review.status)}`}>
                          {getStatusText(review.status)}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <button className="action-btn view" onClick={() => handleView('review', review)} title="Consulter">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="action-btn edit" onClick={() => {
                          setEditingItem(review);
                          setShowReviewModal(true);
                        }} title="Modifier">
                          <i className="fas fa-pen"></i>
                        </button>
                        <button className="action-btn delete" onClick={() => handleDelete('review', review.id)} title="Supprimer">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modales */}
      {showProductModal && <ProductModal />}
      {showOrderModal && <OrderModal />}
      {showCustomerModal && <CustomerModal />}
      {showReviewModal && <ReviewModal />}
    </div>
  );
}

export default App;