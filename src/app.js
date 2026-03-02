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
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // ==================== DONNÉES PRODUITS ====================
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: "Croquettes Royal Canin Chien", 
      category: "Croquettes", 
      price: 89.500, 
      stock: 23, 
      description: "Croquettes premium pour chien adulte - 15kg",
      image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=200&h=200&fit=crop",
      brand: "Royal Canin",
      rating: 4.5
    },
    { 
      id: 2, 
      name: "Pâtée Gourmet Chat", 
      category: "Pâtées", 
      price: 12.750, 
      stock: 45, 
      description: "Pâtée sans céréales au saumon - 400g",
      image: "https://images.unsplash.com/photo-1589924691995-4008b2a9f9d6?w=200&h=200&fit=crop",
      brand: "Gourmet",
      rating: 4.8
    },
    { 
      id: 3, 
      name: "Litière Naturelle", 
      category: "Soins", 
      price: 18.250, 
      stock: 12, 
      description: "Litière agglomérante naturelle - 10kg",
      image: "https://images.unsplash.com/photo-1583336663277-620dc5a1d9d3?w=200&h=200&fit=crop",
      brand: "Nature",
      rating: 4.2
    },
    { 
      id: 4, 
      name: "Brosse Démêlante", 
      category: "Accessoires", 
      price: 8.500, 
      stock: 34, 
      description: "Brosse douce pour chien à poils longs",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=200&h=200&fit=crop",
      brand: "PetGroom",
      rating: 4.0
    },
    { 
      id: 5, 
      name: "Croquettes Hill's Chat", 
      category: "Croquettes", 
      price: 42.500, 
      stock: 67, 
      description: "Croquettes pour chat stérilisé - 8kg",
      image: "https://images.unsplash.com/photo-1623381184712-525bc1652346?w=200&h=200&fit=crop",
      brand: "Hill's",
      rating: 4.7
    },
    { 
      id: 6, 
      name: "Arbre à chat Premium", 
      category: "Accessoires", 
      price: 189.900, 
      stock: 8, 
      description: "Arbre à chat avec griffoir et cachettes",
      image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=200&h=200&fit=crop",
      brand: "CatKing",
      rating: 4.9
    }
  ]);

  // ==================== DONNÉES COMMANDES ====================
  const [orders, setOrders] = useState([
    { 
      id: "CMD001", 
      client: "Mehdi Ben Ahmed", 
      date: "2026-03-02", 
      amount: 189, 
      status: "livre", 
      paymentMethod: "Carte bancaire",
      products: [
        { id: 1, name: "Croquettes Royal Canin", quantity: 2, price: 89.500 }
      ],
      deliveryAddress: "23 Rue de Carthage, Tunis",
      phone: "+216 98 765 432"
    },
    { 
      id: "CMD002", 
      client: "Sarra Trabelsi", 
      date: "2026-03-02", 
      amount: 145, 
      status: "encours", 
      paymentMethod: "Espèces",
      products: [
        { id: 2, name: "Pâtée Gourmet", quantity: 5, price: 12.750 }
      ],
      deliveryAddress: "45 Avenue Habib Bourguiba, Sousse",
      phone: "+216 97 654 321"
    },
    { 
      id: "CMD003", 
      client: "Youssef Jaziri", 
      date: "2026-03-01", 
      amount: 267, 
      status: "attente", 
      paymentMethod: "Carte bancaire",
      products: [
        { id: 6, name: "Arbre à chat", quantity: 1, price: 189.900 }
      ],
      deliveryAddress: "12 Rue des Jardins, Sfax",
      phone: "+216 96 543 210"
    }
  ]);

  // ==================== DONNÉES FACTURES ====================
  const [invoices, setInvoices] = useState([
    { 
      id: "INV001", 
      orderId: "CMD001", 
      client: "Mehdi Ben Ahmed", 
      date: "2026-03-02", 
      dueDate: "2026-04-02",
      status: "payée",
      items: [
        { description: "Croquettes Royal Canin x2", quantity: 2, price: 89.500, total: 179 }
      ],
      subtotal: 179,
      tax: 10,
      total: 189
    },
    { 
      id: "INV002", 
      orderId: "CMD002", 
      client: "Sarra Trabelsi", 
      date: "2026-03-02", 
      dueDate: "2026-04-02",
      status: "en_attente",
      items: [
        { description: "Pâtée Gourmet x5", quantity: 5, price: 12.750, total: 63.75 }
      ],
      subtotal: 63.75,
      tax: 3.25,
      total: 67
    }
  ]);

  // ==================== DONNÉES PAIEMENTS ====================
  const [payments, setPayments] = useState([
    { id: "PAY001", transactionId: "TRX78945", client: "Mehdi Ben Ahmed", amount: 189, method: "Carte bancaire", status: "validé", date: "2026-03-02", orderId: "CMD001" },
    { id: "PAY002", transactionId: "TRX78946", client: "Sarra Trabelsi", amount: 145, method: "Espèces", status: "en_attente", date: "2026-03-02", orderId: "CMD002" },
    { id: "PAY003", transactionId: "TRX78947", client: "Youssef Jaziri", amount: 267, method: "Carte bancaire", status: "en_attente", date: "2026-03-01", orderId: "CMD003" }
  ]);

  // ==================== DONNÉES CLIENTS ====================
  const [customers, setCustomers] = useState([
    { 
      id: 1, 
      name: "Mehdi Ben Ahmed", 
      email: "mehdi.benahmed@email.com", 
      phone: "+216 98 765 432", 
      address: "23 Rue de Carthage, Tunis",
      city: "Tunis",
      orders: 12, 
      total: 1234, 
      since: "2025-01-15",
      lastOrder: "2026-03-02"
    },
    { 
      id: 2, 
      name: "Sarra Trabelsi", 
      email: "sarra.trabelsi@email.com", 
      phone: "+216 97 654 321", 
      address: "45 Avenue Habib Bourguiba, Sousse",
      city: "Sousse",
      orders: 8, 
      total: 890, 
      since: "2025-02-20",
      lastOrder: "2026-03-02"
    },
    { 
      id: 3, 
      name: "Youssef Jaziri", 
      email: "youssef.jaziri@email.com", 
      phone: "+216 96 543 210", 
      address: "12 Rue des Jardins, Sfax",
      city: "Sfax",
      orders: 3, 
      total: 267, 
      since: "2026-01-10",
      lastOrder: "2026-03-01"
    }
  ]);

  // ==================== DONNÉES AVIS ====================
  const [reviews, setReviews] = useState([
    { 
      id: 1, 
      client: "Ahmed Ben Ali", 
      product: "Croquettes Royal Canin", 
      rating: 5, 
      comment: "Excellent produit ! Mes chiens adorent, leur pelage est plus brillant.",
      date: "2026-03-01", 
      status: "approuvé",
      helpful: 12
    },
    { 
      id: 2, 
      client: "Fatma Said", 
      product: "Pâtée Gourmet", 
      rating: 4, 
      comment: "Très bonne qualité, mon chat est ravi.",
      date: "2026-02-28", 
      status: "approuvé",
      helpful: 8
    },
    { 
      id: 3, 
      client: "Sonia Mansour", 
      product: "Brosse Démêlante", 
      rating: 3, 
      comment: "Produit correct mais un peu cher.",
      date: "2026-02-26", 
      status: "en_attente",
      helpful: 3
    }
  ]);

  // ==================== DONNÉES SOCIÉTÉ ====================
  const [companyInfo, setCompanyInfo] = useState({
    name: "PetFood TN",
    email: "contact@petfood.tn",
    phone: "+216 71 123 456",
    fax: "+216 71 123 457",
    address: "Immeuble PetFood, Rue du Lac, Les Berges du Lac, Tunis",
    facebook: "https://facebook.com/petfoodtn",
    instagram: "https://instagram.com/petfoodtn",
    linkedin: "https://linkedin.com/company/petfoodtn",
    hours: "Lun-Ven: 9h-18h, Sam: 9h-13h",
    rc: "B18263472026",
    matriculeFiscal: "1234567/A/M/000",
    map: "https://maps.google.com/?q=Tunis"
  });

  // ==================== STATISTIQUES ====================
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    customers: 0,
    revenue: 0,
    pendingOrders: 0,
    monthlyRevenue: 0
  });

  useEffect(() => {
    calculateStats();
  }, [products, orders, customers, payments]);

  const calculateStats = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    setStats({
      products: products.length,
      orders: orders.length,
      customers: customers.length,
      revenue: payments
        .filter(p => p.status === 'validé')
        .reduce((sum, p) => sum + p.amount, 0),
      pendingOrders: orders.filter(o => o.status === 'attente' || o.status === 'encours').length,
      monthlyRevenue: payments
        .filter(p => {
          const paymentDate = new Date(p.date);
          return p.status === 'validé' && 
                 paymentDate.getMonth() === currentMonth && 
                 paymentDate.getFullYear() === currentYear;
        })
        .reduce((sum, p) => sum + p.amount, 0)
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
      'validé': 'Validé',
      'en_attente': 'En attente',
      'remboursé': 'Remboursé',
      'approuvé': 'Approuvé',
      'payée': 'Payée'
    };
    return map[status] || status;
  };

  const getStatusClass = (status) => {
    const map = {
      'livre': 'success',
      'validé': 'success',
      'approuvé': 'success',
      'payée': 'success',
      'encours': 'warning',
      'en_attente': 'warning',
      'attente': 'danger',
      'remboursé': 'info'
    };
    return map[status] || 'default';
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  // ==================== CRUD PRODUITS ====================
  const handleAddProduct = (productData) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    setProducts([...products, { 
      id: newId, 
      ...productData, 
      rating: 0 
    }]);
    setShowProductModal(false);
    showNotification('Produit ajouté avec succès', 'success');
  };

  const handleEditProduct = (productData) => {
    setProducts(products.map(p => p.id === editingItem.id ? { ...p, ...productData } : p));
    setShowProductModal(false);
    setEditingItem(null);
    showNotification('Produit modifié avec succès', 'success');
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(products.filter(p => p.id !== id));
      showNotification('Produit supprimé', 'info');
    }
  };

  const handleViewProduct = (product) => {
    alert(`
      PRODUIT: ${product.name}
      Marque: ${product.brand}
      Catégorie: ${product.category}
      Prix: ${formatCurrency(product.price)}
      Stock: ${product.stock}
      Note: ${product.rating}/5
      Description: ${product.description}
    `);
  };

  // ==================== CRUD COMMANDES ====================
  const handleAddOrder = (orderData) => {
    const newId = `CMD${String(orders.length + 1).padStart(3, '0')}`;
    setOrders([...orders, { 
      id: newId, 
      ...orderData, 
      date: new Date().toISOString().split('T')[0],
      status: 'attente'
    }]);
    setShowOrderModal(false);
    showNotification('Commande ajoutée avec succès', 'success');
  };

  const handleEditOrder = (orderData) => {
    setOrders(orders.map(o => o.id === editingItem.id ? { ...o, ...orderData } : o));
    setShowOrderModal(false);
    setEditingItem(null);
    showNotification('Commande modifiée avec succès', 'success');
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      setOrders(orders.filter(o => o.id !== id));
      showNotification('Commande supprimée', 'info');
    }
  };

  const handleViewOrder = (order) => {
    const productList = order.products.map(p => 
      `- ${p.name} x${p.quantity} : ${formatCurrency(p.price * p.quantity)}`
    ).join('\n');
    
    alert(`
      COMMANDE: ${order.id}
      Client: ${order.client}
      Téléphone: ${order.phone}
      Adresse: ${order.deliveryAddress}
      Date: ${formatDate(order.date)}
      Statut: ${getStatusText(order.status)}
      
      PRODUITS:
      ${productList}
      
      TOTAL: ${formatCurrency(order.amount)}
      Paiement: ${order.paymentMethod}
    `);
  };

  // ==================== CRUD FACTURES ====================
  const handleAddInvoice = (invoiceData) => {
    const newId = `INV${String(invoices.length + 1).padStart(3, '0')}`;
    setInvoices([...invoices, { 
      id: newId, 
      ...invoiceData, 
      date: new Date().toISOString().split('T')[0]
    }]);
    setShowInvoiceModal(false);
    showNotification('Facture créée avec succès', 'success');
  };

  const handleEditInvoice = (invoiceData) => {
    setInvoices(invoices.map(i => i.id === editingItem.id ? { ...i, ...invoiceData } : i));
    setShowInvoiceModal(false);
    setEditingItem(null);
    showNotification('Facture modifiée avec succès', 'success');
  };

  const handleDeleteInvoice = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
      setInvoices(invoices.filter(i => i.id !== id));
      showNotification('Facture supprimée', 'info');
    }
  };

  const handleViewInvoice = (invoice) => {
    const itemsList = invoice.items.map(item => 
      `- ${item.description} : ${formatCurrency(item.total)}`
    ).join('\n');
    
    alert(`
      FACTURE: ${invoice.id}
      Commande: ${invoice.orderId}
      Client: ${invoice.client}
      Date: ${formatDate(invoice.date)}
      Échéance: ${formatDate(invoice.dueDate)}
      Statut: ${getStatusText(invoice.status)}
      
      DÉTAILS:
      ${itemsList}
      
      Sous-total: ${formatCurrency(invoice.subtotal)}
      TVA: ${formatCurrency(invoice.tax)}
      TOTAL: ${formatCurrency(invoice.total)}
    `);
  };

  // ==================== CRUD PAIEMENTS ====================
  const handleAddPayment = (paymentData) => {
    const newId = `PAY${String(payments.length + 1).padStart(3, '0')}`;
    setPayments([...payments, {
      id: newId,
      transactionId: `TRX${Math.floor(Math.random() * 90000 + 10000)}`,
      ...paymentData,
      date: new Date().toISOString().split('T')[0]
    }]);
    setShowPaymentModal(false);
    showNotification('Paiement ajouté avec succès', 'success');
  };

  const handleEditPayment = (paymentData) => {
    setPayments(payments.map(p => p.id === editingItem.id ? { ...p, ...paymentData } : p));
    setShowPaymentModal(false);
    setEditingItem(null);
    showNotification('Paiement modifié avec succès', 'success');
  };

  const handleDeletePayment = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce paiement ?')) {
      setPayments(payments.filter(p => p.id !== id));
      showNotification('Paiement supprimé', 'info');
    }
  };

  const handleViewPayment = (payment) => {
    alert(`
      PAIEMENT: ${payment.id}
      Transaction: ${payment.transactionId}
      Client: ${payment.client}
      Commande: ${payment.orderId}
      Montant: ${formatCurrency(payment.amount)}
      Méthode: ${payment.method}
      Statut: ${getStatusText(payment.status)}
      Date: ${formatDate(payment.date)}
    `);
  };

  // ==================== CRUD CLIENTS ====================
  const handleAddCustomer = (customerData) => {
    const newId = Math.max(...customers.map(c => c.id), 0) + 1;
    setCustomers([...customers, {
      id: newId,
      orders: 0,
      total: 0,
      since: new Date().toISOString().split('T')[0],
      ...customerData
    }]);
    setShowCustomerModal(false);
    showNotification('Client ajouté avec succès', 'success');
  };

  const handleEditCustomer = (customerData) => {
    setCustomers(customers.map(c => c.id === editingItem.id ? { ...c, ...customerData } : c));
    setShowCustomerModal(false);
    setEditingItem(null);
    showNotification('Client modifié avec succès', 'success');
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      setCustomers(customers.filter(c => c.id !== id));
      showNotification('Client supprimé', 'info');
    }
  };

  const handleViewCustomer = (customer) => {
    alert(`
      CLIENT: ${customer.name}
      Email: ${customer.email}
      Téléphone: ${customer.phone}
      Adresse: ${customer.address}
      Ville: ${customer.city}
      
      Statistiques:
      - Commandes: ${customer.orders}
      - Total dépensé: ${formatCurrency(customer.total)}
      - Client depuis: ${formatDate(customer.since)}
      - Dernière commande: ${customer.lastOrder ? formatDate(customer.lastOrder) : 'Aucune'}
    `);
  };

  // ==================== CRUD AVIS ====================
  const handleAddReview = (reviewData) => {
    const newId = Math.max(...reviews.map(r => r.id), 0) + 1;
    setReviews([...reviews, {
      id: newId,
      date: new Date().toISOString().split('T')[0],
      status: 'en_attente',
      helpful: 0,
      ...reviewData
    }]);
    setShowReviewModal(false);
    showNotification('Avis ajouté avec succès', 'success');
  };

  const handleEditReview = (reviewData) => {
    setReviews(reviews.map(r => r.id === editingItem.id ? { ...r, ...reviewData } : r));
    setShowReviewModal(false);
    setEditingItem(null);
    showNotification('Avis modifié avec succès', 'success');
  };

  const handleDeleteReview = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
      setReviews(reviews.filter(r => r.id !== id));
      showNotification('Avis supprimé', 'info');
    }
  };

  const handleApproveReview = (id) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: 'approuvé' } : r));
    showNotification('Avis approuvé', 'success');
  };

  const handleViewReview = (review) => {
    alert(`
      AVIS:
      Client: ${review.client}
      Produit: ${review.product}
      Note: ${review.rating}/5
      Commentaire: "${review.comment}"
      Date: ${formatDate(review.date)}
      Statut: ${getStatusText(review.status)}
      Utile: ${review.helpful} personnes
    `);
  };

  // ==================== CRUD CONTACT ====================
  const handleAddContact = (contactData) => {
    setCompanyInfo({ ...companyInfo, ...contactData });
    setShowContactModal(false);
    showNotification('Informations de contact mises à jour', 'success');
  };

  const handleEditContact = (contactData) => {
    setCompanyInfo({ ...companyInfo, ...contactData });
    setShowContactModal(false);
    setEditingItem(null);
    showNotification('Contact modifié avec succès', 'success');
  };

  const handleViewContact = () => {
    alert(`
      INFORMATIONS DE CONTACT:
      
      Société: ${companyInfo.name}
      Email: ${companyInfo.email}
      Téléphone: ${companyInfo.phone}
      Fax: ${companyInfo.fax}
      Adresse: ${companyInfo.address}
      Horaires: ${companyInfo.hours}
      RC: ${companyInfo.rc}
      MF: ${companyInfo.matriculeFiscal}
      
      Réseaux sociaux:
      - Facebook: ${companyInfo.facebook}
      - Instagram: ${companyInfo.instagram}
      - LinkedIn: ${companyInfo.linkedin}
    `);
  };

  // ==================== FILTRES ====================
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.phone.includes(searchTerm)
  );

  const filteredInvoices = invoices.filter(i =>
    i.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPayments = payments.filter(p =>
    p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    c.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReviews = reviews.filter(r =>
    r.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.comment.toLowerCase().includes(searchTerm.toLowerCase())
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
            { id: 'invoices', icon: 'file-invoice', label: 'Factures' },
            { id: 'payments', icon: 'credit-card', label: 'Paiements' },
            { id: 'customers', icon: 'users', label: 'Clients' },
            { id: 'reviews', icon: 'star', label: 'Avis' },
            { id: 'contact', icon: 'envelope', label: 'Contact' },
            { id: 'settings', icon: 'cog', label: 'Paramètres' }
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
              {currentSection === 'invoices' && 'Gestion des Factures'}
              {currentSection === 'payments' && 'Gestion des Paiements'}
              {currentSection === 'customers' && 'Gestion des Clients'}
              {currentSection === 'reviews' && 'Gestion des Avis'}
              {currentSection === 'contact' && 'Contact Société'}
              {currentSection === 'settings' && 'Paramètres'}
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

        {/* DASHBOARD - Version améliorée */}
        {currentSection === 'dashboard' && (
          <div className="dashboard">
            {/* En-tête du dashboard avec bienvenue */}
            <div className="dashboard-welcome">
              <div className="welcome-text">
                <h2>Bon retour, El Jezi Ghassen !</h2>
                <p>Voici ce qui se passe dans votre magasin aujourd'hui</p>
              </div>
              <div className="welcome-date">
                <i className="fas fa-calendar-alt"></i>
                <span>{date}</span>
              </div>
            </div>

            {/* Statistiques principales avec icônes et couleurs */}
            <div className="stats-grid-enhanced">
              <div className="stat-card-enhanced products-stat">
                <div className="stat-icon">
                  <i className="fas fa-box"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-label">Produits</span>
                  <span className="stat-value">{stats.products}</span>
                  <span className="stat-trend positive">
                    <i className="fas fa-arrow-up"></i> +12%
                  </span>
                </div>
                <div className="stat-chart">
                  <div className="mini-chart"></div>
                </div>
              </div>

              <div className="stat-card-enhanced orders-stat">
                <div className="stat-icon">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-label">Commandes</span>
                  <span className="stat-value">{stats.orders}</span>
                  <span className="stat-trend positive">
                    <i className="fas fa-arrow-up"></i> +8%
                  </span>
                </div>
                <div className="stat-chart">
                  <div className="mini-chart"></div>
                </div>
              </div>

              <div className="stat-card-enhanced pending-stat">
                <div className="stat-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-label">En attente</span>
                  <span className="stat-value">{stats.pendingOrders}</span>
                  <span className="stat-trend neutral">
                    <i className="fas fa-minus"></i> 0%
                  </span>
                </div>
                <div className="stat-chart">
                  <div className="mini-chart"></div>
                </div>
              </div>

              <div className="stat-card-enhanced customers-stat">
                <div className="stat-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-label">Clients</span>
                  <span className="stat-value">{stats.customers}</span>
                  <span className="stat-trend positive">
                    <i className="fas fa-arrow-up"></i> +15%
                  </span>
                </div>
                <div className="stat-chart">
                  <div className="mini-chart"></div>
                </div>
              </div>

              <div className="stat-card-enhanced revenue-stat">
                <div className="stat-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-label">CA Mensuel</span>
                  <span className="stat-value">{formatCurrency(stats.monthlyRevenue)}</span>
                  <span className="stat-trend positive">
                    <i className="fas fa-arrow-up"></i> +23%
                  </span>
                </div>
                <div className="stat-chart">
                  <div className="mini-chart"></div>
                </div>
              </div>

              <div className="stat-card-enhanced total-stat">
                <div className="stat-icon">
                  <i className="fas fa-credit-card"></i>
                </div>
                <div className="stat