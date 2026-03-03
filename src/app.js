import React, { useState, useEffect } from "react";
import "./app.css";

function App() {
  // ==================== ÉTAT GLOBAL ====================
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);

  // États pour les modales
  const [showProductModal, setShowProductModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // ==================== DONNÉES PRODUITS ====================
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Croquettes Royal Canin Chien",
      category: "Croquettes",
      price: 89.5,
      stock: 23,
      description: "Croquettes premium pour chien adulte - 15kg",
      image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=200&h=200&fit=crop",
      brand: "Royal Canin",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Pâtée Gourmet Chat",
      category: "Pâtées",
      price: 12.75,
      stock: 45,
      description: "Pâtée sans céréales au saumon - 400g",
      image: "https://images.unsplash.com/photo-1589924691995-4008b2a9f9d6?w=200&h=200&fit=crop",
      brand: "Gourmet",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Litière Naturelle",
      category: "Soins",
      price: 18.25,
      stock: 12,
      description: "Litière agglomérante naturelle - 10kg",
      image: "https://images.unsplash.com/photo-1583336663277-620dc5a1d9d3?w=200&h=200&fit=crop",
      brand: "Nature",
      rating: 4.2,
    },
    {
      id: 4,
      name: "Brosse Démêlante",
      category: "Accessoires",
      price: 8.5,
      stock: 34,
      description: "Brosse douce pour chien à poils longs",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=200&h=200&fit=crop",
      brand: "PetGroom",
      rating: 4.0,
    },
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
        { id: 1, name: "Croquettes Royal Canin", quantity: 2, price: 89.5 },
      ],
      deliveryAddress: "23 Rue de Carthage, Tunis",
      phone: "+216 98 765 432",
    },
    {
      id: "CMD002",
      client: "Sarra Trabelsi",
      date: "2026-03-02",
      amount: 145,
      status: "encours",
      paymentMethod: "Espèces",
      products: [{ id: 2, name: "Pâtée Gourmet", quantity: 5, price: 12.75 }],
      deliveryAddress: "45 Avenue Habib Bourguiba, Sousse",
      phone: "+216 97 654 321",
    },
    {
      id: "CMD003",
      client: "Youssef Jaziri",
      date: "2026-03-01",
      amount: 267,
      status: "attente",
      paymentMethod: "Carte bancaire",
      products: [{ id: 3, name: "Litière Naturelle", quantity: 2, price: 18.25 }],
      deliveryAddress: "12 Rue des Jardins, Sfax",
      phone: "+216 96 543 210",
    },
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
        {
          description: "Croquettes Royal Canin x2",
          quantity: 2,
          price: 89.5,
          total: 179,
        },
      ],
      subtotal: 179,
      tax: 10,
      total: 189,
    },
    {
      id: "INV002",
      orderId: "CMD002",
      client: "Sarra Trabelsi",
      date: "2026-03-02",
      dueDate: "2026-04-02",
      status: "en_attente",
      items: [
        {
          description: "Pâtée Gourmet x5",
          quantity: 5,
          price: 12.75,
          total: 63.75,
        },
      ],
      subtotal: 63.75,
      tax: 3.25,
      total: 67,
    },
  ]);

  // ==================== DONNÉES PAIEMENTS ====================
  const [payments, setPayments] = useState([
    {
      id: "PAY001",
      transactionId: "TRX78945",
      client: "Mehdi Ben Ahmed",
      amount: 189,
      method: "Carte bancaire",
      status: "validé",
      date: "2026-03-02",
      orderId: "CMD001",
    },
    {
      id: "PAY002",
      transactionId: "TRX78946",
      client: "Sarra Trabelsi",
      amount: 145,
      method: "Espèces",
      status: "en_attente",
      date: "2026-03-02",
      orderId: "CMD002",
    },
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
      lastOrder: "2026-03-02",
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
      lastOrder: "2026-03-02",
    },
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
      helpful: 12,
    },
    {
      id: 2,
      client: "Fatma Said",
      product: "Pâtée Gourmet",
      rating: 4,
      comment: "Très bonne qualité, mon chat est ravi.",
      date: "2026-02-28",
      status: "approuvé",
      helpful: 8,
    },
  ]);

  // ==================== STATISTIQUES ====================
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    customers: 0,
    revenue: 0,
    pendingOrders: 0,
    monthlyRevenue: 0,
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
        .filter((p) => p.status === "validé")
        .reduce((sum, p) => sum + p.amount, 0),
      pendingOrders: orders.filter(
        (o) => o.status === "attente" || o.status === "encours"
      ).length,
      monthlyRevenue: payments
        .filter((p) => {
          const paymentDate = new Date(p.date);
          return (
            p.status === "validé" &&
            paymentDate.getMonth() === currentMonth &&
            paymentDate.getFullYear() === currentYear
          );
        })
        .reduce((sum, p) => sum + p.amount, 0),
    });
  };

  // ==================== THÈME SOMBRE ====================
  useEffect(() => {
    const savedTheme = localStorage.getItem("petfood-theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    }

    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("petfood-theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("petfood-theme", "light");
    }
  }, [isDarkMode]);

  // ==================== FONCTIONS UTILITAIRES ====================
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fr-FR");
  };

  const formatDateTime = () => {
    const date = currentDateTime;
    return {
      date: date.toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString() + " DT";
  };

  const getStatusText = (status) => {
    const map = {
      livre: "Livré",
      encours: "En cours",
      attente: "En attente",
      validé: "Validé",
      en_attente: "En attente",
      remboursé: "Remboursé",
      approuvé: "Approuvé",
      payée: "Payée",
    };
    return map[status] || status;
  };

  const getStatusClass = (status) => {
    const map = {
      livre: "success",
      validé: "success",
      approuvé: "success",
      payée: "success",
      encours: "warning",
      en_attente: "warning",
      attente: "danger",
      remboursé: "info",
    };
    return map[status] || "default";
  };

  const showNotification = (message, type = "info") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  const addToHistory = (action, type, item) => {
    const historyEntry = {
      id: Date.now(),
      action,
      type,
      item: item.name || item.client || item.id,
      date: new Date().toISOString(),
      user: "El Jezi Ghassen",
    };
    setHistory([historyEntry, ...history].slice(0, 50));
  };

  const clearHistory = () => {
    setHistory([]);
    showNotification("Historique effacé", "info");
  };

  // ==================== CRUD PRODUITS ====================
  const handleAddProduct = (productData) => {
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    const newProduct = {
      id: newId,
      ...productData,
      rating: 0,
    };
    setProducts([...products, newProduct]);
    setShowProductModal(false);
    addToHistory("Ajout", "Produit", newProduct);
    showNotification("Produit ajouté avec succès", "success");
  };

  const handleEditProduct = (productData) => {
    const updatedProducts = products.map((p) =>
      p.id === editingItem.id ? { ...p, ...productData } : p
    );
    setProducts(updatedProducts);
    setShowProductModal(false);
    setEditingItem(null);
    addToHistory("Modification", "Produit", editingItem);
    showNotification("Produit modifié avec succès", "success");
  };

  const handleDeleteProduct = (id) => {
    const product = products.find((p) => p.id === id);
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      setProducts(products.filter((p) => p.id !== id));
      addToHistory("Suppression", "Produit", product);
      showNotification("Produit supprimé", "info");
    }
  };

  const handleViewProduct = (product) => {
    addToHistory("Consultation", "Produit", product);
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
    const newId = `CMD${String(orders.length + 1).padStart(3, "0")}`;
    const newOrder = {
      id: newId,
      ...orderData,
      date: new Date().toISOString().split("T")[0],
      status: "attente",
    };
    setOrders([...orders, newOrder]);
    setShowOrderModal(false);
    addToHistory("Ajout", "Commande", newOrder);
    showNotification("Commande ajoutée avec succès", "success");
  };

  const handleEditOrder = (orderData) => {
    const updatedOrders = orders.map((o) =>
      o.id === editingItem.id ? { ...o, ...orderData } : o
    );
    setOrders(updatedOrders);
    setShowOrderModal(false);
    setEditingItem(null);
    addToHistory("Modification", "Commande", editingItem);
    showNotification("Commande modifiée avec succès", "success");
  };

  const handleDeleteOrder = (id) => {
    const order = orders.find((o) => o.id === id);
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
      setOrders(orders.filter((o) => o.id !== id));
      addToHistory("Suppression", "Commande", order);
      showNotification("Commande supprimée", "info");
    }
  };

  const handleViewOrder = (order) => {
    addToHistory("Consultation", "Commande", order);
    const productList = order.products
      .map(
        (p) =>
          `- ${p.name} x${p.quantity} : ${formatCurrency(p.price * p.quantity)}`
      )
      .join("\n");

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
    const newId = `INV${String(invoices.length + 1).padStart(3, "0")}`;
    const newInvoice = {
      id: newId,
      ...invoiceData,
      date: new Date().toISOString().split("T")[0],
    };
    setInvoices([...invoices, newInvoice]);
    setShowInvoiceModal(false);
    addToHistory("Ajout", "Facture", newInvoice);
    showNotification("Facture créée avec succès", "success");
  };

  const handleEditInvoice = (invoiceData) => {
    const updatedInvoices = invoices.map((i) =>
      i.id === editingItem.id ? { ...i, ...invoiceData } : i
    );
    setInvoices(updatedInvoices);
    setShowInvoiceModal(false);
    setEditingItem(null);
    addToHistory("Modification", "Facture", editingItem);
    showNotification("Facture modifiée avec succès", "success");
  };

  const handleDeleteInvoice = (id) => {
    const invoice = invoices.find((i) => i.id === id);
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette facture ?")) {
      setInvoices(invoices.filter((i) => i.id !== id));
      addToHistory("Suppression", "Facture", invoice);
      showNotification("Facture supprimée", "info");
    }
  };

  const handleViewInvoice = (invoice) => {
    addToHistory("Consultation", "Facture", invoice);
    const itemsList = invoice.items
      .map((item) => `- ${item.description} : ${formatCurrency(item.total)}`)
      .join("\n");

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
    const newId = `PAY${String(payments.length + 1).padStart(3, "0")}`;
    const newPayment = {
      id: newId,
      transactionId: `TRX${Math.floor(Math.random() * 90000 + 10000)}`,
      ...paymentData,
      date: new Date().toISOString().split("T")[0],
    };
    setPayments([...payments, newPayment]);
    setShowPaymentModal(false);
    addToHistory("Ajout", "Paiement", newPayment);
    showNotification("Paiement ajouté avec succès", "success");
  };

  const handleEditPayment = (paymentData) => {
    const updatedPayments = payments.map((p) =>
      p.id === editingItem.id ? { ...p, ...paymentData } : p
    );
    setPayments(updatedPayments);
    setShowPaymentModal(false);
    setEditingItem(null);
    addToHistory("Modification", "Paiement", editingItem);
    showNotification("Paiement modifié avec succès", "success");
  };

  const handleDeletePayment = (id) => {
    const payment = payments.find((p) => p.id === id);
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce paiement ?")) {
      setPayments(payments.filter((p) => p.id !== id));
      addToHistory("Suppression", "Paiement", payment);
      showNotification("Paiement supprimé", "info");
    }
  };

  const handleViewPayment = (payment) => {
    addToHistory("Consultation", "Paiement", payment);
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
    const newId = Math.max(...customers.map((c) => c.id), 0) + 1;
    const newCustomer = {
      id: newId,
      orders: 0,
      total: 0,
      since: new Date().toISOString().split("T")[0],
      ...customerData,
    };
    setCustomers([...customers, newCustomer]);
    setShowCustomerModal(false);
    addToHistory("Ajout", "Client", newCustomer);
    showNotification("Client ajouté avec succès", "success");
  };

  const handleEditCustomer = (customerData) => {
    const updatedCustomers = customers.map((c) =>
      c.id === editingItem.id ? { ...c, ...customerData } : c
    );
    setCustomers(updatedCustomers);
    setShowCustomerModal(false);
    setEditingItem(null);
    addToHistory("Modification", "Client", editingItem);
    showNotification("Client modifié avec succès", "success");
  };

  const handleDeleteCustomer = (id) => {
    const customer = customers.find((c) => c.id === id);
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
      setCustomers(customers.filter((c) => c.id !== id));
      addToHistory("Suppression", "Client", customer);
      showNotification("Client supprimé", "info");
    }
  };

  const handleViewCustomer = (customer) => {
    addToHistory("Consultation", "Client", customer);
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
      - Dernière commande: ${customer.lastOrder ? formatDate(customer.lastOrder) : "Aucune"}
    `);
  };

  // ==================== CRUD AVIS ====================
  const handleAddReview = (reviewData) => {
    const newId = Math.max(...reviews.map((r) => r.id), 0) + 1;
    const newReview = {
      id: newId,
      date: new Date().toISOString().split("T")[0],
      status: "en_attente",
      helpful: 0,
      ...reviewData,
    };
    setReviews([...reviews, newReview]);
    setShowReviewModal(false);
    addToHistory("Ajout", "Avis", newReview);
    showNotification("Avis ajouté avec succès", "success");
  };

  const handleEditReview = (reviewData) => {
    const updatedReviews = reviews.map((r) =>
      r.id === editingItem.id ? { ...r, ...reviewData } : r
    );
    setReviews(updatedReviews);
    setShowReviewModal(false);
    setEditingItem(null);
    addToHistory("Modification", "Avis", editingItem);
    showNotification("Avis modifié avec succès", "success");
  };

  const handleDeleteReview = (id) => {
    const review = reviews.find((r) => r.id === id);
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet avis ?")) {
      setReviews(reviews.filter((r) => r.id !== id));
      addToHistory("Suppression", "Avis", review);
      showNotification("Avis supprimé", "info");
    }
  };

  const handleApproveReview = (id) => {
    const review = reviews.find((r) => r.id === id);
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, status: "approuvé" } : r))
    );
    addToHistory("Approbation", "Avis", review);
    showNotification("Avis approuvé", "success");
  };

  const handleViewReview = (review) => {
    addToHistory("Consultation", "Avis", review);
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

  // ==================== FILTRES ====================
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.phone.includes(searchTerm)
  );

  const filteredInvoices = invoices.filter(
    (i) =>
      i.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPayments = payments.filter(
    (p) =>
      p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReviews = reviews.filter(
    (r) =>
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

      {/* Historique Modal */}
      {showHistory && (
        <div className="modal" onClick={() => setShowHistory(false)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Historique des actions</h2>
              <div>
                <button className="btn-outline" onClick={clearHistory}>
                  <i className="fas fa-trash"></i> Effacer
                </button>
                <button className="close" onClick={() => setShowHistory(false)}>
                  &times;
                </button>
              </div>
            </div>
            <div className="history-list">
              {history.length === 0 ? (
                <p className="text-center">Aucune action enregistrée</p>
              ) : (
                history.map((entry) => (
                  <div key={entry.id} className="history-item">
                    <div className="history-icon">
                      {entry.action === "Ajout" && <i className="fas fa-plus-circle text-success"></i>}
                      {entry.action === "Modification" && <i className="fas fa-edit text-warning"></i>}
                      {entry.action === "Suppression" && <i className="fas fa-trash text-danger"></i>}
                      {entry.action === "Consultation" && <i className="fas fa-eye text-info"></i>}
                      {entry.action === "Approbation" && <i className="fas fa-check-circle text-success"></i>}
                    </div>
                    <div className="history-content">
                      <p>
                        <strong>{entry.action}</strong> - {entry.type} : {entry.item}
                      </p>
                      <p className="history-meta">
                        Par {entry.user} le {formatDate(entry.date)} à {new Date(entry.date).toLocaleTimeString("fr-FR")}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
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
            { id: "dashboard", icon: "home", label: "Tableau de bord" },
            { id: "products", icon: "box", label: "Produits" },
            { id: "orders", icon: "shopping-cart", label: "Commandes" },
            { id: "invoices", icon: "file-invoice", label: "Factures" },
            { id: "payments", icon: "credit-card", label: "Paiements" },
            { id: "customers", icon: "users", label: "Clients" },
            { id: "reviews", icon: "star", label: "Avis" },
          ].map((section) => (
            <div
              key={section.id}
              className={`nav-item ${currentSection === section.id ? "active" : ""}`}
              onClick={() => {
                setCurrentSection(section.id);
                setSearchTerm("");
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
          <button className="history-btn" onClick={() => setShowHistory(true)}>
            <i className="fas fa-history"></i> Historique
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div>
            <h1 className="page-title">
              {currentSection === "dashboard" && "Tableau de bord"}
              {currentSection === "products" && "Gestion des Produits"}
              {currentSection === "orders" && "Gestion des Commandes"}
              {currentSection === "invoices" && "Gestion des Factures"}
              {currentSection === "payments" && "Gestion des Paiements"}
              {currentSection === "customers" && "Gestion des Clients"}
              {currentSection === "reviews" && "Gestion des Avis"}
            </h1>
            <p>El Jezi Ghassen, Admin</p>
          </div>

          <div className="admin-info">
            <button
              className="theme-btn"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <i className={`fas fa-${isDarkMode ? "sun" : "moon"}`}></i>
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
        {currentSection === "dashboard" && (
          <div className="dashboard">
            <div className="stats-grid">
              <div className="stat-card">
                <i className="fas fa-box"></i>
                <div className="stat-value">{stats.products}</div>
                <div className="stat-label">Produits</div>
              </div>
              <div className="stat-card">
                <i className="fas fa-shopping-cart"></i>
                <div className="stat-value">{stats.orders}</div>
                <div className="stat-label">Commandes</div>
              </div>
              <div className="stat-card">
                <i className="fas fa-clock"></i>
                <div className="stat-value">{stats.pendingOrders}</div>
                <div className="stat-label">En attente</div>
              </div>
              <div className="stat-card">
                <i className="fas fa-users"></i>
                <div className="stat-value">{stats.customers}</div>
                <div className="stat-label">Clients</div>
              </div>
              <div className="stat-card">
                <i className="fas fa-chart-line"></i>
                <div className="stat-value">
                  {formatCurrency(stats.monthlyRevenue)}
                </div>
                <div className="stat-label">CA Mensuel</div>
              </div>
              <div className="stat-card">
                <i className="fas fa-credit-card"></i>
                <div className="stat-value">
                  {formatCurrency(stats.revenue)}
                </div>
                <div className="stat-label">CA Total</div>
              </div>
            </div>
          </div>
        )}

        {/* PRODUITS */}
        {currentSection === "products" && (
          <div className="section">
            <div className="section-header">
              <h2>Gestion des Produits</h2>
              <div className="header-actions">
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setEditingItem(null);
                    setShowProductModal(true);
                  }}
                >
                  <i className="fas fa-plus"></i> Nouveau produit
                </button>
              </div>
            </div>

            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-card-image"
                    />
                    <span className="product-stock-badge">
                      {product.stock} en stock
                    </span>
                  </div>
                  <div className="product-card-content">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-brand">{product.brand}</p>
                    <div className="product-rating">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${i < Math.floor(product.rating) ? "star-filled" : "star-empty"}`}
                        ></i>
                      ))}
                    </div>
                    <p className="product-price">
                      {formatCurrency(product.price)}
                    </p>
                    <p className="product-description">{product.description}</p>

                    {/* BOUTONS PRODUITS */}
                    <div className="product-actions">
                      <button
                        className="action-btn view"
                        onClick={() => handleViewProduct(product)}
                      >
                        <i className="fas fa-eye"></i> Consulter
                      </button>
                      <button
                        className="action-btn edit"
                        onClick={() => {
                          setEditingItem(product);
                          setShowProductModal(true);
                        }}
                      >
                        <i className="fas fa-edit"></i> Modifier
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <i className="fas fa-trash"></i> Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COMMANDES */}
        {currentSection === "orders" && (
          <div className="section">
            <div className="section-header">
              <h2>Gestion des Commandes</h2>
              <div className="header-actions">
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Rechercher une commande..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setEditingItem(null);
                    setShowOrderModal(true);
                  }}
                >
                  <i className="fas fa-plus"></i> Nouvelle commande
                </button>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>N° Commande</th>
                    <th>Client</th>
                    <th>Téléphone</th>
                    <th>Date</th>
                    <th>Montant</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <strong>{order.id}</strong>
                      </td>
                      <td>{order.client}</td>
                      <td>{order.phone}</td>
                      <td>{formatDate(order.date)}</td>
                      <td>{formatCurrency(order.amount)}</td>
                      <td>
                        <span
                          className={`status status-${getStatusClass(order.status)}`}
                        >
                          {getStatusText(order.status)}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <button
                          className="action-btn view"
                          onClick={() => handleViewOrder(order)}
                        >
                          <i className="fas fa-eye"></i> Consulter
                        </button>
                        <button
                          className="action-btn edit"
                          onClick={() => {
                            setEditingItem(order);
                            setShowOrderModal(true);
                          }}
                        >
                          <i className="fas fa-edit"></i> Modifier
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDeleteOrder(order.id)}
                        >
                          <i className="fas fa-trash"></i> Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FACTURES */}
        {currentSection === "invoices" && (
          <div className="section">
            <div className="section-header">
              <h2>Gestion des Factures</h2>
              <div className="header-actions">
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Rechercher une facture..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setEditingItem(null);
                    setShowInvoiceModal(true);
                  }}
                >
                  <i className="fas fa-plus"></i> Nouvelle facture
                </button>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>N° Facture</th>
                    <th>Commande</th>
                    <th>Client</th>
                    <th>Date</th>
                    <th>Échéance</th>
                    <th>Montant</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td>{invoice.id}</td>
                      <td>{invoice.orderId}</td>
                      <td>{invoice.client}</td>
                      <td>{formatDate(invoice.date)}</td>
                      <td>{formatDate(invoice.dueDate)}</td>
                      <td>{formatCurrency(invoice.total)}</td>
                      <td>
                        <span
                          className={`status status-${getStatusClass(invoice.status)}`}
                        >
                          {getStatusText(invoice.status)}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <button
                          className="action-btn view"
                          onClick={() => handleViewInvoice(invoice)}
                        >
                          <i className="fas fa-eye"></i> Consulter
                        </button>
                        <button
                          className="action-btn edit"
                          onClick={() => {
                            setEditingItem(invoice);
                            setShowInvoiceModal(true);
                          }}
                        >
                          <i className="fas fa-edit"></i> Modifier
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDeleteInvoice(invoice.id)}
                        >
                          <i className="fas fa-trash"></i> Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PAIEMENTS */}
        {currentSection === "payments" && (
          <div className="section">
            <div className="section-header">
              <h2>Gestion des Paiements</h2>
              <div className="header-actions">
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Rechercher un paiement..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setEditingItem(null);
                    setShowPaymentModal(true);
                  }}
                >
                  <i className="fas fa-plus"></i> Nouveau paiement
                </button>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Transaction</th>
                    <th>Client</th>
                    <th>Commande</th>
                    <th>Montant</th>
                    <th>Méthode</th>
                    <th>Statut</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.transactionId}</td>
                      <td>{payment.client}</td>
                      <td>{payment.orderId}</td>
                      <td>{formatCurrency(payment.amount)}</td>
                      <td>{payment.method}</td>
                      <td>
                        <span
                          className={`status status-${getStatusClass(payment.status)}`}
                        >
                          {getStatusText(payment.status)}
                        </span>
                      </td>
                      <td>{formatDate(payment.date)}</td>
                      <td className="actions-cell">
                        <button
                          className="action-btn view"
                          onClick={() => handleViewPayment(payment)}
                        >
                          <i className="fas fa-eye"></i> Consulter
                        </button>
                        <button
                          className="action-btn edit"
                          onClick={() => {
                            setEditingItem(payment);
                            setShowPaymentModal(true);
                          }}
                        >
                          <i className="fas fa-edit"></i> Modifier
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDeletePayment(payment.id)}
                        >
                          <i className="fas fa-trash"></i> Supprimer
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
        {currentSection === "customers" && (
          <div className="section">
            <div className="section-header">
              <h2>Gestion des Clients</h2>
              <div className="header-actions">
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Rechercher un client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setEditingItem(null);
                    setShowCustomerModal(true);
                  }}
                >
                  <i className="fas fa-user-plus"></i> Nouveau client
                </button>
              </div>
            </div>

            <div className="customers-grid">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="customer-card">
                  <div className="customer-header">
                    <div className="customer-avatar">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <h3>{customer.name}</h3>
                      <p>{customer.city}</p>
                    </div>
                  </div>
                  <div className="customer-details">
                    <p>
                      <i className="fas fa-envelope"></i> {customer.email}
                    </p>
                    <p>
                      <i className="fas fa-phone"></i> {customer.phone}
                    </p>
                    <p>
                      <i className="fas fa-map-marker-alt"></i>{" "}
                      {customer.address}
                    </p>
                  </div>
                  <div className="customer-stats">
                    <div>
                      <span className="stat-number">{customer.orders}</span>
                      <span className="stat-label">Commandes</span>
                    </div>
                    <div>
                      <span className="stat-number">
                        {formatCurrency(customer.total)}
                      </span>
                      <span className="stat-label">Dépensé</span>
                    </div>
                    <div>
                      <span className="stat-number">
                        {formatDate(customer.since)}
                      </span>
                      <span className="stat-label">Depuis</span>
                    </div>
                  </div>

                  {/* BOUTONS CLIENTS */}
                  <div className="customer-actions">
                    <button
                      className="action-btn view"
                      onClick={() => handleViewCustomer(customer)}
                    >
                      <i className="fas fa-eye"></i> Consulter
                    </button>
                    <button
                      className="action-btn edit"
                      onClick={() => {
                        setEditingItem(customer);
                        setShowCustomerModal(true);
                      }}
                    >
                      <i className="fas fa-edit"></i> Modifier
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDeleteCustomer(customer.id)}
                    >
                      <i className="fas fa-trash"></i> Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AVIS */}
        {currentSection === "reviews" && (
          <div className="section">
            <div className="section-header">
              <h2>Gestion des Avis</h2>
              <div className="header-actions">
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Rechercher un avis..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setEditingItem(null);
                    setShowReviewModal(true);
                  }}
                >
                  <i className="fas fa-plus"></i> Nouvel avis
                </button>
              </div>
            </div>

            <div className="reviews-grid">
              {filteredReviews.map((review) => (
                <div
                  key={review.id}
                  className={`review-card review-${review.status}`}
                >
                  <div className="review-header">
                    <div>
                      <h4>{review.client}</h4>
                      <div className="rating">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star ${i < review.rating ? "star-filled" : "star-empty"}`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <span
                      className={`review-status status-${getStatusClass(review.status)}`}
                    >
                      {getStatusText(review.status)}
                    </span>
                  </div>
                  <p className="review-product">
                    <strong>Produit:</strong> {review.product}
                  </p>
                  <p className="review-comment">"{review.comment}"</p>
                  <div className="review-footer">
                    <span className="review-date">
                      {formatDate(review.date)}
                    </span>
                    <span className="review-helpful">
                      <i className="fas fa-thumbs-up"></i> {review.helpful}
                    </span>
                  </div>

                  {/* BOUTONS AVIS */}
                  <div className="review-actions">
                    <button
                      className="action-btn view"
                      onClick={() => handleViewReview(review)}
                    >
                      <i className="fas fa-eye"></i> Consulter
                    </button>
                    {review.status === "en_attente" && (
                      <button
                        className="action-btn approve"
                        onClick={() => handleApproveReview(review.id)}
                      >
                        <i className="fas fa-check"></i> Approuver
                      </button>
                    )}
                    <button
                      className="action-btn edit"
                      onClick={() => {
                        setEditingItem(review);
                        setShowReviewModal(true);
                      }}
                    >
                      <i className="fas fa-edit"></i> Modifier
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      <i className="fas fa-trash"></i> Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL PRODUIT */}
      {showProductModal && (
        <div className="modal" onClick={() => setShowProductModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? "Modifier" : "Ajouter"} un produit</h2>
              <button
                className="close"
                onClick={() => setShowProductModal(false)}
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                data.price = parseFloat(data.price);
                data.stock = parseInt(data.stock);

                if (editingItem) {
                  handleEditProduct(data);
                } else {
                  handleAddProduct(data);
                }
              }}
            >
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingItem?.name}
                  required
                />
              </div>
              <div className="form-group">
                <label>Marque</label>
                <input
                  type="text"
                  name="brand"
                  defaultValue={editingItem?.brand}
                  required
                />
              </div>
              <div className="form-group">
                <label>Catégorie</label>
                <select
                  name="category"
                  defaultValue={editingItem?.category || "Croquettes"}
                >
                  <option value="Croquettes">Croquettes</option>
                  <option value="Pâtées">Pâtées</option>
                  <option value="Accessoires">Accessoires</option>
                  <option value="Friandises">Friandises</option>
                  <option value="Soins">Soins</option>
                </select>
              </div>
              <div className="form-group">
                <label>Prix (DT)</label>
                <input
                  type="number"
                  name="price"
                  step="0.001"
                  defaultValue={editingItem?.price}
                  required
                />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  defaultValue={editingItem?.stock}
                  required
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="image"
                  defaultValue={editingItem?.image}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  rows="3"
                  defaultValue={editingItem?.description}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {editingItem ? "Modifier" : "Ajouter"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL COMMANDE */}
      {showOrderModal && (
        <div className="modal" onClick={() => setShowOrderModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? "Modifier" : "Ajouter"} une commande</h2>
              <button
                className="close"
                onClick={() => setShowOrderModal(false)}
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                data.amount = parseFloat(data.amount);

                if (editingItem) {
                  handleEditOrder(data);
                } else {
                  handleAddOrder(data);
                }
              }}
            >
              <div className="form-group">
                <label>Client</label>
                <input
                  type="text"
                  name="client"
                  defaultValue={editingItem?.client}
                  required
                />
              </div>
              <div className="form-group">
                <label>Téléphone</label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={editingItem?.phone}
                  required
                />
              </div>
              <div className="form-group">
                <label>Adresse</label>
                <input
                  type="text"
                  name="deliveryAddress"
                  defaultValue={editingItem?.deliveryAddress}
                  required
                />
              </div>
              <div className="form-group">
                <label>Montant (DT)</label>
                <input
                  type="number"
                  name="amount"
                  step="0.001"
                  defaultValue={editingItem?.amount}
                  required
                />
              </div>
              <div className="form-group">
                <label>Paiement</label>
                <select
                  name="paymentMethod"
                  defaultValue={editingItem?.paymentMethod || "Carte bancaire"}
                >
                  <option value="Carte bancaire">Carte bancaire</option>
                  <option value="Espèces">Espèces</option>
                  <option value="Virement">Virement</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                {editingItem ? "Modifier" : "Ajouter"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FACTURE */}
      {showInvoiceModal && (
        <div className="modal" onClick={() => setShowInvoiceModal(false)}>
          <div
            className="modal-content modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{editingItem ? "Modifier" : "Créer"} une facture</h2>
              <button
                className="close"
                onClick={() => setShowInvoiceModal(false)}
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                data.amount = parseFloat(data.amount);
                data.subtotal = parseFloat(data.subtotal);
                data.tax = parseFloat(data.tax);
                data.total = parseFloat(data.total);

                if (editingItem) {
                  handleEditInvoice(data);
                } else {
                  handleAddInvoice(data);
                }
              }}
            >
              <div className="form-row">
                <div className="form-group">
                  <label>N° Commande</label>
                  <input
                    type="text"
                    name="orderId"
                    defaultValue={editingItem?.orderId}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Client</label>
                  <input
                    type="text"
                    name="client"
                    defaultValue={editingItem?.client}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date échéance</label>
                  <input
                    type="date"
                    name="dueDate"
                    defaultValue={editingItem?.dueDate}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Statut</label>
                  <select
                    name="status"
                    defaultValue={editingItem?.status || "en_attente"}
                  >
                    <option value="en_attente">En attente</option>
                    <option value="payée">Payée</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Sous-total</label>
                  <input
                    type="number"
                    name="subtotal"
                    step="0.001"
                    defaultValue={editingItem?.subtotal}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>TVA</label>
                  <input
                    type="number"
                    name="tax"
                    step="0.001"
                    defaultValue={editingItem?.tax}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Total</label>
                <input
                  type="number"
                  name="total"
                  step="0.001"
                  defaultValue={editingItem?.total}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {editingItem ? "Modifier" : "Créer"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PAIEMENT */}
      {showPaymentModal && (
        <div className="modal" onClick={() => setShowPaymentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? "Modifier" : "Ajouter"} un paiement</h2>
              <button
                className="close"
                onClick={() => setShowPaymentModal(false)}
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                data.amount = parseFloat(data.amount);

                if (editingItem) {
                  handleEditPayment(data);
                } else {
                  handleAddPayment(data);
                }
              }}
            >
              <div className="form-group">
                <label>Client</label>
                <input
                  type="text"
                  name="client"
                  defaultValue={editingItem?.client}
                  required
                />
              </div>
              <div className="form-group">
                <label>N° Commande</label>
                <input
                  type="text"
                  name="orderId"
                  defaultValue={editingItem?.orderId}
                  required
                />
              </div>
              <div className="form-group">
                <label>Montant</label>
                <input
                  type="number"
                  name="amount"
                  step="0.001"
                  defaultValue={editingItem?.amount}
                  required
                />
              </div>
              <div className="form-group">
                <label>Méthode</label>
                <select
                  name="method"
                  defaultValue={editingItem?.method || "Carte bancaire"}
                >
                  <option value="Carte bancaire">Carte bancaire</option>
                  <option value="Espèces">Espèces</option>
                  <option value="Virement">Virement</option>
                  <option value="Chèque">Chèque</option>
                </select>
              </div>
              <div className="form-group">
                <label>Statut</label>
                <select
                  name="status"
                  defaultValue={editingItem?.status || "en_attente"}
                >
                  <option value="en_attente">En attente</option>
                  <option value="validé">Validé</option>
                  <option value="remboursé">Remboursé</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                {editingItem ? "Modifier" : "Ajouter"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CLIENT */}
      {showCustomerModal && (
        <div className="modal" onClick={() => setShowCustomerModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? "Modifier" : "Ajouter"} un client</h2>
              <button
                className="close"
                onClick={() => setShowCustomerModal(false)}
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());

                if (editingItem) {
                  handleEditCustomer(data);
                } else {
                  handleAddCustomer(data);
                }
              }}
            >
              <div className="form-group">
                <label>Nom complet</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingItem?.name}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editingItem?.email}
                  required
                />
              </div>
              <div className="form-group">
                <label>Téléphone</label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={editingItem?.phone}
                  required
                />
              </div>
              <div className="form-group">
                <label>Adresse</label>
                <input
                  type="text"
                  name="address"
                  defaultValue={editingItem?.address}
                  required
                />
              </div>
              <div className="form-group">
                <label>Ville</label>
                <input
                  type="text"
                  name="city"
                  defaultValue={editingItem?.city}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {editingItem ? "Modifier" : "Ajouter"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL AVIS */}
      {showReviewModal && (
        <div className="modal" onClick={() => setShowReviewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? "Modifier" : "Ajouter"} un avis</h2>
              <button
                className="close"
                onClick={() => setShowReviewModal(false)}
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                data.rating = parseInt(data.rating);

                if (editingItem) {
                  handleEditReview(data);
                } else {
                  handleAddReview(data);
                }
              }}
            >
              <div className="form-group">
                <label>Client</label>
                <input
                  type="text"
                  name="client"
                  defaultValue={editingItem?.client}
                  required
                />
              </div>
              <div className="form-group">
                <label>Produit</label>
                <input
                  type="text"
                  name="product"
                  defaultValue={editingItem?.product}
                  required
                />
              </div>
              <div className="form-group">
                <label>Note (1-5)</label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  defaultValue={editingItem?.rating || 5}
                  required
                />
              </div>
              <div className="form-group">
                <label>Commentaire</label>
                <textarea
                  name="comment"
                  rows="3"
                  defaultValue={editingItem?.comment}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {editingItem ? "Modifier" : "Ajouter"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;