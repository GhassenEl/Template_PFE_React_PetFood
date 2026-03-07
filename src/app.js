import React, { useState, useEffect } from "react";
import "./app.css";

function App() {
  // ==================== ÉTAT GLOBAL ====================
  const [currentSection, setCurrentSection] = useState("dashboard");
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
  const [showVetModal, setShowVetModal] = useState(false);
  const [showVaccineModal, setShowVaccineModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // État pour le formulaire de contact
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

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

  // ==================== DONNÉES SUIVI VÉTÉRINAIRE ====================
  const [vetVisits, setVetVisits] = useState([
    {
      id: 1,
      petName: "Rex",
      petType: "Chien",
      ownerName: "Mehdi Ben Ahmed",
      date: "2026-03-15",
      time: "10:30",
      reason: "Vaccin annuel",
      vetName: "Dr. Karim Mansour",
      status: "confirmé",
      notes: "Rappel vaccin CHPPiL",
    },
    {
      id: 2,
      petName: "Mimi",
      petType: "Chat",
      ownerName: "Sarra Trabelsi",
      date: "2026-03-18",
      time: "14:00",
      reason: "Consultation",
      vetName: "Dr. Leila Ben Salem",
      status: "en_attente",
      notes: "Problème de pelage",
    },
    {
      id: 3,
      petName: "Max",
      petType: "Chien",
      ownerName: "Youssef Jaziri",
      date: "2026-03-10",
      time: "09:15",
      reason: "Suivi",
      vetName: "Dr. Karim Mansour",
      status: "terminé",
      notes: "Contrôle poids OK",
    },
  ]);

  // ==================== DONNÉES CONSEILS VACCINS ====================
  const [vaccineAdvice, setVaccineAdvice] = useState([
    {
      id: 1,
      title: "Calendrier vaccinal chiot",
      category: "Chien",
      summary: "Les vaccins essentiels pour votre chiot",
      content: "À 8 semaines : primo-vaccination (CHPPiL). À 12 semaines : rappel. À 16 semaines : rappel et rage. Annuel : rappel.",
      author: "Dr. Karim Mansour",
      date: "2026-02-15",
      likes: 45,
      views: 234,
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Vaccins indispensables pour chat",
      category: "Chat",
      summary: "Protégez votre félin avec les bons vaccins",
      content: "Les vaccins core : typhus, coryza, leucose. Rappel annuel recommandé pour une protection optimale.",
      author: "Dr. Leila Ben Salem",
      date: "2026-02-20",
      likes: 38,
      views: 189,
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Préparation avant la vaccination",
      category: "Conseils",
      summary: "Comment préparer votre animal pour sa visite vaccinale",
      content: "Jeûne de 4h, vermifugation 15 jours avant, carnet de santé à jour. Signaler tout changement de comportement.",
      author: "Dr. Karim Mansour",
      date: "2026-02-25",
      likes: 27,
      views: 156,
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "Effets secondaires des vaccins",
      category: "Informations",
      summary: "Ce qu'il faut savoir sur les réactions post-vaccinales",
      content: "Léger abattement, perte d'appétit possible. Surveiller 24-48h. Consulter si fièvre élevée ou vomissements.",
      author: "Dr. Leila Ben Salem",
      date: "2026-03-01",
      likes: 52,
      views: 278,
      image: "https://images.unsplash.com/photo-1583336663277-620dc5a1d9d3?w=400&h=300&fit=crop",
    },
  ]);

  // ==================== INFORMATIONS DE CONTACT ====================
  const [contactInfo, setContactInfo] = useState({
    address: "23 Rue de Carthage, Tunis 1000, Tunisie",
    phone: "+216 71 123 456",
    email: "contact@petfoodtn.com",
    whatsapp: "+216 98 765 432",
    coordinates: {
      lat: 36.8065,
      lng: 10.1815,
    },
    socialMedia: {
      facebook: "https://facebook.com/petfoodtn",
      instagram: "https://instagram.com/petfoodtn",
      twitter: "https://twitter.com/petfoodtn",
      linkedin: "https://linkedin.com/company/petfoodtn",
      youtube: "https://youtube.com/petfoodtn",
      tiktok: "https://tiktok.com/@petfoodtn",
    },
  });

  // ==================== STATISTIQUES ====================
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    customers: 0,
    revenue: 0,
    pendingOrders: 0,
    monthlyRevenue: 0,
    upcomingVetVisits: 0,
    vaccineArticles: 0,
  });

  useEffect(() => {
    calculateStats();
  }, [products, orders, customers, payments, vetVisits, vaccineAdvice]);

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
      upcomingVetVisits: vetVisits.filter(v => v.status === "confirmé" || v.status === "en_attente").length,
      vaccineArticles: vaccineAdvice.length,
    });
  };

  // ==================== DATE ET HEURE ====================
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

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
      confirmé: "Confirmé",
      terminé: "Terminé",
    };
    return map[status] || status;
  };

  const getStatusClass = (status) => {
    const map = {
      livre: "success",
      validé: "success",
      approuvé: "success",
      payée: "success",
      terminé: "success",
      encours: "warning",
      en_attente: "warning",
      attente: "danger",
      remboursé: "info",
      confirmé: "primary",
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
      item: item.name || item.client || item.title || item.petName || item.id,
      date: new Date().toISOString(),
      user: "El Jezi Ghassen",
    };
    setHistory([historyEntry, ...history].slice(0, 50));
  };

  const clearHistory = () => {
    setHistory([]);
    showNotification("Historique effacé", "info");
  };

  // Fonction pour gérer la soumission du formulaire de contact
  const handleContactSubmit = (e) => {
    e.preventDefault();
    
    addToHistory("Message envoyé", "Contact", contactForm.name);
    showNotification("Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.", "success");
    
    setContactForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${contactInfo.coordinates.lat},${contactInfo.coordinates.lng}`;
    window.open(url, '_blank');
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

  // ==================== CRUD SUIVI VÉTÉRINAIRE ====================
  const handleAddVetVisit = (visitData) => {
    const newId = Math.max(...vetVisits.map((v) => v.id), 0) + 1;
    const newVisit = {
      id: newId,
      ...visitData,
      status: "en_attente",
    };
    setVetVisits([...vetVisits, newVisit]);
    setShowVetModal(false);
    addToHistory("Ajout", "Visite vétérinaire", newVisit);
    showNotification("Rendez-vous vétérinaire ajouté avec succès", "success");
  };

  const handleEditVetVisit = (visitData) => {
    const updatedVisits = vetVisits.map((v) =>
      v.id === editingItem.id ? { ...v, ...visitData } : v
    );
    setVetVisits(updatedVisits);
    setShowVetModal(false);
    setEditingItem(null);
    addToHistory("Modification", "Visite vétérinaire", editingItem);
    showNotification("Rendez-vous modifié avec succès", "success");
  };

  const handleDeleteVetVisit = (id) => {
    const visit = vetVisits.find((v) => v.id === id);
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) {
      setVetVisits(vetVisits.filter((v) => v.id !== id));
      addToHistory("Suppression", "Visite vétérinaire", visit);
      showNotification("Rendez-vous supprimé", "info");
    }
  };

  const handleViewVetVisit = (visit) => {
    addToHistory("Consultation", "Visite vétérinaire", visit);
    alert(`
      RENDEZ-VOUS VÉTÉRINAIRE
      Animal: ${visit.petName} (${visit.petType})
      Propriétaire: ${visit.ownerName}
      Date: ${formatDate(visit.date)} à ${visit.time}
      Vétérinaire: ${visit.vetName}
      Motif: ${visit.reason}
      Statut: ${getStatusText(visit.status)}
      
      Notes: ${visit.notes || "Aucune note"}
    `);
  };

  const handleUpdateVetStatus = (id, newStatus) => {
    const visit = vetVisits.find(v => v.id === id);
    setVetVisits(
      vetVisits.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
    );
    addToHistory("Changement de statut", "Visite vétérinaire", visit);
    showNotification(`Statut mis à jour: ${getStatusText(newStatus)}`, "success");
  };

  // ==================== CRUD CONSEILS VACCINS ====================
  const handleAddVaccineAdvice = (adviceData) => {
    const newId = Math.max(...vaccineAdvice.map((v) => v.id), 0) + 1;
    const newAdvice = {
      id: newId,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      views: 0,
      ...adviceData,
    };
    setVaccineAdvice([...vaccineAdvice, newAdvice]);
    setShowVaccineModal(false);
    addToHistory("Ajout", "Conseil vaccin", newAdvice);
    showNotification("Conseil ajouté avec succès", "success");
  };

  const handleEditVaccineAdvice = (adviceData) => {
    const updatedAdvice = vaccineAdvice.map((v) =>
      v.id === editingItem.id ? { ...v, ...adviceData } : v
    );
    setVaccineAdvice(updatedAdvice);
    setShowVaccineModal(false);
    setEditingItem(null);
    addToHistory("Modification", "Conseil vaccin", editingItem);
    showNotification("Conseil modifié avec succès", "success");
  };

  const handleDeleteVaccineAdvice = (id) => {
    const advice = vaccineAdvice.find((v) => v.id === id);
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce conseil ?")) {
      setVaccineAdvice(vaccineAdvice.filter((v) => v.id !== id));
      addToHistory("Suppression", "Conseil vaccin", advice);
      showNotification("Conseil supprimé", "info");
    }
  };

  const handleViewVaccineAdvice = (advice) => {
    setVaccineAdvice(
      vaccineAdvice.map((v) =>
        v.id === advice.id ? { ...v, views: v.views + 1 } : v
      )
    );
    
    addToHistory("Consultation", "Conseil vaccin", advice);
    alert(`
      ${advice.title}
      
      ${advice.summary}
      
      ${advice.content}
      
      Catégorie: ${advice.category}
      Auteur: ${advice.author}
      Publié le: ${formatDate(advice.date)}
      👍 ${advice.likes} · 👁️ ${advice.views + 1}
    `);
  };

  const handleLikeVaccineAdvice = (id) => {
    setVaccineAdvice(
      vaccineAdvice.map((v) =>
        v.id === id ? { ...v, likes: v.likes + 1 } : v
      )
    );
    showNotification("Merci pour votre like !", "success");
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

  const filteredVetVisits = vetVisits.filter(
    (v) =>
      v.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.vetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVaccineAdvice = vaccineAdvice.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ==================== RENDU ====================
  const { date, time } = formatDateTime();

  return (
    <div className="app-container">
      {/* Notification flottante */}
      {notification.show && (
        <div className={`notification notification-${notification.type}`}>
          <div className="notification-icon">
            {notification.type === "success" && <i className="fas fa-check-circle"></i>}
            {notification.type === "error" && <i className="fas fa-exclamation-circle"></i>}
            {notification.type === "info" && <i className="fas fa-info-circle"></i>}
            {notification.type === "warning" && <i className="fas fa-exclamation-triangle"></i>}
          </div>
          <div className="notification-content">
            <p>{notification.message}</p>
          </div>
          <button className="notification-close" onClick={() => setNotification({ show: false, message: "", type: "" })}>
            <i className="fas fa-times"></i>
          </button>
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
            { id: "vet", icon: "clinic-medical", label: "Suivi Vétérinaire" },
            { id: "vaccines", icon: "syringe", label: "Conseils Vaccins" },
            { id: "contact", icon: "envelope", label: "Contact" },
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
              <span className="nav-label">{section.label}</span>
            </div>
          ))}
        </nav>

        {/* Historique dans la sidebar */}
        <div className="sidebar-history">
          <div className="sidebar-history-header">
            <h3>
              <i className="fas fa-history"></i> Historique récent
            </h3>
            {history.length > 0 && (
              <button className="clear-history-btn" onClick={clearHistory} title="Effacer l'historique">
                <i className="fas fa-trash"></i>
              </button>
            )}
          </div>
          <div className="sidebar-history-list">
            {history.length === 0 ? (
              <p className="history-empty">Aucune action récente</p>
            ) : (
              history.slice(0, 5).map((entry) => (
                <div key={entry.id} className="sidebar-history-item">
                  <div className={`history-icon-small ${entry.action.toLowerCase()}`}>
                    {entry.action === "Ajout" && <i className="fas fa-plus-circle"></i>}
                    {entry.action === "Modification" && <i className="fas fa-edit"></i>}
                    {entry.action === "Suppression" && <i className="fas fa-trash"></i>}
                    {entry.action === "Consultation" && <i className="fas fa-eye"></i>}
                    {entry.action === "Approbation" && <i className="fas fa-check-circle"></i>}
                    {entry.action === "Changement de statut" && <i className="fas fa-sync-alt"></i>}
                    {entry.action === "Message envoyé" && <i className="fas fa-paper-plane"></i>}
                  </div>
                  <div className="history-info">
                    <p className="history-action">
                      <strong>{entry.action}</strong> - {entry.type}
                    </p>
                    <p className="history-item-name">{entry.item}</p>
                    <p className="history-time">{new Date(entry.date).toLocaleTimeString("fr-FR")}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          {history.length > 5 && (
            <button className="view-all-history" onClick={() => setShowHistory(true)}>
              Voir tout ({history.length})
            </button>
          )}
        </div>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="avatar">EG</div>
            <div>
              <p className="user-name">El Jezi Ghassen</p>
              <p className="user-role">Administrateur</p>
            </div>
          </div>
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
              {currentSection === "vet" && "Suivi Vétérinaire"}
              {currentSection === "vaccines" && "Conseils Vaccins"}
              {currentSection === "contact" && "Contact"}
            </h1>
            <p className="header-date">
              <i className="fas fa-calendar-alt"></i> {date} • <i className="fas fa-clock"></i> {time}
            </p>
          </div>

          <div className="admin-info">
            <div className="profile">
              <div className="avatar">EG</div>
              <div>
                <strong>El Jezi Ghassen</strong>
                <p className="admin-role">Administrateur</p>
              </div>
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
              <div className="stat-card">
                <i className="fas fa-clinic-medical"></i>
                <div className="stat-value">{stats.upcomingVetVisits}</div>
                <div className="stat-label">Rendez-vous à venir</div>
              </div>
              <div className="stat-card">
                <i className="fas fa-syringe"></i>
                <div className="stat-value">{stats.vaccineArticles}</div>
                <div className="stat-label">Conseils vaccins</div>
              </div>
            </div>

            {/* Graphique des ventes */}
            <div className="chart-container">
              <h3>Ventes des 7 derniers jours</h3>
              <div className="simple-chart">
                <div className="bar" style={{height: '40px'}}>
                  <span className="bar-label">Lun</span>
                  <span className="bar-value">450</span>
                </div>
                <div className="bar" style={{height: '65px'}}>
                  <span className="bar-label">Mar</span>
                  <span className="bar-value">780</span>
                </div>
                <div className="bar" style={{height: '55px'}}>
                  <span className="bar-label">Mer</span>
                  <span className="bar-value">620</span>
                </div>
                <div className="bar" style={{height: '80px'}}>
                  <span className="bar-label">Jeu</span>
                  <span className="bar-value">950</span>
                </div>
                <div className="bar" style={{height: '70px'}}>
                  <span className="bar-label">Ven</span>
                  <span className="bar-value">840</span>
                </div>
                <div className="bar" style={{height: '90px'}}>
                  <span className="bar-label">Sam</span>
                  <span className="bar-value">1100</span>
                </div>
                <div className="bar" style={{height: '60px'}}>
                  <span className="bar-label">Dim</span>
                  <span className="bar-value">720</span>
                </div>
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
                    <span className={`product-stock-badge ${product.stock < 10 ? 'low-stock' : ''}`}>
                      {product.stock} en stock
                      {product.stock < 10 && <i className="fas fa-exclamation-triangle" style={{marginLeft: '5px'}}></i>}
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

        {/* SUIVI VÉTÉRINAIRE */}
        {currentSection === "vet" && (
          <div className="section">
            <div className="section-header">
              <h2>Suivi Vétérinaire</h2>
              <div className="header-actions">
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Rechercher un rendez-vous..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setEditingItem(null);
                    setShowVetModal(true);
                  }}
                >
                  <i className="fas fa-plus"></i> Nouveau rendez-vous
                </button>
              </div>
            </div>

            <div className="vet-visits-grid">
              {filteredVetVisits.map((visit) => (
                <div key={visit.id} className={`vet-card vet-${visit.status}`}>
                  <div className="vet-header">
                    <div className="vet-pet-info">
                      <h3>{visit.petName}</h3>
                      <span className="vet-pet-type">{visit.petType}</span>
                    </div>
                    <span className={`vet-status status-${getStatusClass(visit.status)}`}>
                      {getStatusText(visit.status)}
                    </span>
                  </div>
                  
                  <div className="vet-details">
                    <p className="vet-owner">
                      <i className="fas fa-user"></i> {visit.ownerName}
                    </p>
                    <p className="vet-datetime">
                      <i className="fas fa-calendar-alt"></i> {formatDate(visit.date)} à {visit.time}
                    </p>
                    <p className="vet-reason">
                      <i className="fas fa-stethoscope"></i> {visit.reason}
                    </p>
                    <p className="vet-doctor">
                      <i className="fas fa-user-md"></i> {visit.vetName}
                    </p>
                    {visit.notes && (
                      <p className="vet-notes">
                        <i className="fas fa-notes-medical"></i> {visit.notes}
                      </p>
                    )}
                  </div>

                  <div className="vet-actions">
                    <button
                      className="action-btn view"
                      onClick={() => handleViewVetVisit(visit)}
                    >
                      <i className="fas fa-eye"></i> Consulter
                    </button>
                    
                    {visit.status === "en_attente" && (
                      <button
                        className="action-btn approve"
                        onClick={() => handleUpdateVetStatus(visit.id, "confirmé")}
                      >
                        <i className="fas fa-check"></i> Confirmer
                      </button>
                    )}
                    
                    {visit.status === "confirmé" && (
                      <button
                        className="action-btn success"
                        onClick={() => handleUpdateVetStatus(visit.id, "terminé")}
                      >
                        <i className="fas fa-flag-checkered"></i> Terminer
                      </button>
                    )}
                    
                    <button
                      className="action-btn edit"
                      onClick={() => {
                        setEditingItem(visit);
                        setShowVetModal(true);
                      }}
                    >
                      <i className="fas fa-edit"></i> Modifier
                    </button>
                    
                    <button
                      className="action-btn delete"
                      onClick={() => handleDeleteVetVisit(visit.id)}
                    >
                      <i className="fas fa-trash"></i> Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONSEILS VACCINS */}
        {currentSection === "vaccines" && (
          <div className="section">
            <div className="section-header">
              <h2>Conseils Vaccins</h2>
              <div className="header-actions">
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Rechercher un conseil..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setEditingItem(null);
                    setShowVaccineModal(true);
                  }}
                >
                  <i className="fas fa-plus"></i> Nouveau conseil
                </button>
              </div>
            </div>

            <div className="vaccine-grid">
              {filteredVaccineAdvice.map((advice) => (
                <div key={advice.id} className="vaccine-card">
                  <div className="vaccine-image-container">
                    <img src={advice.image} alt={advice.title} className="vaccine-image" />
                    <div className="vaccine-category-badge">
                      {advice.category}
                    </div>
                  </div>
                  
                  <div className="vaccine-card-content">
                    <h3 className="vaccine-title">{advice.title}</h3>
                    
                    <p className="vaccine-summary">{advice.summary}</p>
                    
                    <div className="vaccine-meta">
                      <span className="vaccine-author">
                        <i className="fas fa-user-md"></i> {advice.author}
                      </span>
                      <span className="vaccine-date">
                        <i className="fas fa-calendar-alt"></i> {formatDate(advice.date)}
                      </span>
                    </div>
                    
                    <div className="vaccine-stats">
                      <span className="vaccine-likes" onClick={() => handleLikeVaccineAdvice(advice.id)}>
                        <i className="fas fa-heart"></i> {advice.likes}
                      </span>
                      <span className="vaccine-views">
                        <i className="fas fa-eye"></i> {advice.views}
                      </span>
                    </div>

                    <div className="vaccine-actions">
                      <button
                        className="action-btn view"
                        onClick={() => handleViewVaccineAdvice(advice)}
                      >
                        <i className="fas fa-eye"></i> Lire
                      </button>
                      
                      <button
                        className="action-btn edit"
                        onClick={() => {
                          setEditingItem(advice);
                          setShowVaccineModal(true);
                        }}
                      >
                        <i className="fas fa-edit"></i> Modifier
                      </button>
                      
                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteVaccineAdvice(advice.id)}
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

        {/* CONTACT - FORMULAIRE PROFESSIONNEL AVEC RÉSEAUX SOCIAUX */}
        {currentSection === "contact" && (
          <div className="contact-section-pro">
            <div className="contact-container">
              {/* En-tête */}
              <div className="contact-header">
                <h2>Contactez-nous</h2>
                <p>Notre équipe est à votre écoute pour répondre à toutes vos questions</p>
              </div>

              <div className="contact-grid">
                {/* Formulaire de contact */}
                <div className="contact-form-wrapper">
                  <div className="form-card">
                    <div className="form-card-header">
                      <i className="fas fa-paper-plane"></i>
                      <h3>Envoyez-nous un message</h3>
                    </div>
                    
                    <form onSubmit={handleContactSubmit} className="contact-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="name">
                            Nom complet <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={contactForm.name}
                            onChange={handleContactChange}
                            placeholder="Jean Dupont"
                            required
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="email">
                            Email <span className="required">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={contactForm.email}
                            onChange={handleContactChange}
                            placeholder="jean@exemple.com"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="phone">
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={contactForm.phone}
                            onChange={handleContactChange}
                            placeholder="+216 00 000 000"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="subject">
                            Sujet <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={contactForm.subject}
                            onChange={handleContactChange}
                            placeholder="Sujet de votre message"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="form-group full-width">
                        <label htmlFor="message">
                          Message <span className="required">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={contactForm.message}
                          onChange={handleContactChange}
                          placeholder="Bonjour, je souhaiterais avoir plus d'informations sur..."
                          rows="5"
                          required
                        ></textarea>
                      </div>
                      
                      <div className="form-footer">
                        <div className="checkbox-wrapper">
                          <input type="checkbox" id="newsletter" />
                          <label htmlFor="newsletter">
                            J'accepte de recevoir la newsletter PetFood TN
                          </label>
                        </div>
                        
                        <button type="submit" className="submit-btn">
                          <span>Envoyer</span>
                          <i className="fas fa-arrow-right"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Carte et informations avec réseaux sociaux */}
                <div className="contact-info-wrapper">
                  <div className="map-card">
                    <div className="map-container">
                      <iframe
                        title="Google Maps - PetFood TN"
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${contactInfo.coordinates.lat},${contactInfo.coordinates.lng}`}
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                    
                    <div className="contact-details">
                      <h4>
                        <i className="fas fa-store"></i>
                        PetFood TN
                      </h4>
                      
                      <div className="info-lines">
                        <div className="info-line">
                          <i className="fas fa-map-marker-alt"></i>
                          <span>{contactInfo.address}</span>
                        </div>
                        
                        <div className="info-line">
                          <i className="fas fa-phone-alt"></i>
                          <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
                        </div>
                        
                        <div className="info-line">
                          <i className="fas fa-envelope"></i>
                          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                        </div>
                        
                        <div className="info-line">
                          <i className="fab fa-whatsapp"></i>
                          <a href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`} 
                             target="_blank" 
                             rel="noopener noreferrer">
                            {contactInfo.whatsapp}
                          </a>
                        </div>
                      </div>
                      
                      <button className="directions-btn" onClick={openGoogleMaps}>
                        <i className="fas fa-directions"></i>
                        Obtenir l'itinéraire
                      </button>

                      {/* Réseaux sociaux verticaux */}
                      <div className="social-section">
                        <h5>Suivez-nous</h5>
                        <div className="social-links-vertical">
                          <a href={contactInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="social-link-vertical facebook">
                            <i className="fab fa-facebook-f"></i>
                            <span>Facebook</span>
                          </a>
                          <a href={contactInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="social-link-vertical instagram">
                            <i className="fab fa-instagram"></i>
                            <span>Instagram</span>
                          </a>
                          <a href={contactInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="social-link-vertical twitter">
                            <i className="fab fa-twitter"></i>
                            <span>Twitter</span>
                          </a>
                          <a href={contactInfo.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="social-link-vertical linkedin">
                            <i className="fab fa-linkedin-in"></i>
                            <span>LinkedIn</span>
                          </a>
                          <a href={contactInfo.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="social-link-vertical youtube">
                            <i className="fab fa-youtube"></i>
                            <span>YouTube</span>
                          </a>
                          <a href={contactInfo.socialMedia.tiktok} target="_blank" rel="noopener noreferrer" className="social-link-vertical tiktok">
                            <i className="fab fa-tiktok"></i>
                            <span>TikTok</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL HISTORIQUE COMPLET */}
      {showHistory && (
        <div className="modal" onClick={() => setShowHistory(false)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Historique complet des actions</h2>
              <div>
                <button className="btn-outline" onClick={clearHistory}>
                  <i className="fas fa-trash"></i> Effacer tout
                </button>
                <button className="close" onClick={() => setShowHistory(false)}>
                  &times;
                </button>
              </div>
            </div>
            <div className="history-list-full">
              {history.length === 0 ? (
                <p className="text-center">Aucune action enregistrée</p>
              ) : (
                history.map((entry) => (
                  <div key={entry.id} className="history-item-full">
                    <div className={`history-icon ${entry.action.toLowerCase()}`}>
                      {entry.action === "Ajout" && <i className="fas fa-plus-circle"></i>}
                      {entry.action === "Modification" && <i className="fas fa-edit"></i>}
                      {entry.action === "Suppression" && <i className="fas fa-trash"></i>}
                      {entry.action === "Consultation" && <i className="fas fa-eye"></i>}
                      {entry.action === "Approbation" && <i className="fas fa-check-circle"></i>}
                      {entry.action === "Changement de statut" && <i className="fas fa-sync-alt"></i>}
                      {entry.action === "Message envoyé" && <i className="fas fa-paper-plane"></i>}
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

      {/* MODAL SUIVI VÉTÉRINAIRE */}
      {showVetModal && (
        <div className="modal" onClick={() => setShowVetModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? "Modifier" : "Ajouter"} un rendez-vous vétérinaire</h2>
              <button
                className="close"
                onClick={() => setShowVetModal(false)}
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
                  handleEditVetVisit(data);
                } else {
                  handleAddVetVisit(data);
                }
              }}
            >
              <div className="form-row">
                <div className="form-group">
                  <label>Nom de l'animal</label>
                  <input
                    type="text"
                    name="petName"
                    defaultValue={editingItem?.petName}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select
                    name="petType"
                    defaultValue={editingItem?.petType || "Chien"}
                  >
                    <option value="Chien">Chien</option>
                    <option value="Chat">Chat</option>
                    <option value="Oiseau">Oiseau</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Propriétaire</label>
                <input
                  type="text"
                  name="ownerName"
                  defaultValue={editingItem?.ownerName}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    defaultValue={editingItem?.date}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Heure</label>
                  <input
                    type="time"
                    name="time"
                    defaultValue={editingItem?.time}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Motif</label>
                <input
                  type="text"
                  name="reason"
                  defaultValue={editingItem?.reason}
                  required
                />
              </div>
              <div className="form-group">
                <label>Vétérinaire</label>
                <select
                  name="vetName"
                  defaultValue={editingItem?.vetName || "Dr. Karim Mansour"}
                >
                  <option value="Dr. Karim Mansour">Dr. Karim Mansour</option>
                  <option value="Dr. Leila Ben Salem">Dr. Leila Ben Salem</option>
                  <option value="Dr. Mohamed Karray">Dr. Mohamed Karray</option>
                </select>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  name="notes"
                  rows="3"
                  defaultValue={editingItem?.notes}
                  placeholder="Informations complémentaires..."
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {editingItem ? "Modifier" : "Ajouter"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CONSEIL VACCIN */}
      {showVaccineModal && (
        <div className="modal" onClick={() => setShowVaccineModal(false)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? "Modifier" : "Ajouter"} un conseil vaccin</h2>
              <button
                className="close"
                onClick={() => setShowVaccineModal(false)}
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
                  handleEditVaccineAdvice(data);
                } else {
                  handleAddVaccineAdvice(data);
                }
              }}
            >
              <div className="form-group">
                <label>Titre</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingItem?.title}
                  required
                />
              </div>
              <div className="form-group">
                <label>Catégorie</label>
                <select
                  name="category"
                  defaultValue={editingItem?.category || "Chien"}
                >
                  <option value="Chien">Chien</option>
                  <option value="Chat">Chat</option>
                  <option value="Conseils">Conseils</option>
                  <option value="Informations">Informations</option>
                </select>
              </div>
              <div className="form-group">
                <label>Résumé</label>
                <input
                  type="text"
                  name="summary"
                  defaultValue={editingItem?.summary}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contenu détaillé</label>
                <textarea
                  name="content"
                  rows="5"
                  defaultValue={editingItem?.content}
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
                <label>Auteur</label>
                <select
                  name="author"
                  defaultValue={editingItem?.author || "Dr. Karim Mansour"}
                >
                  <option value="Dr. Karim Mansour">Dr. Karim Mansour</option>
                  <option value="Dr. Leila Ben Salem">Dr. Leila Ben Salem</option>
                  <option value="Dr. Mohamed Karray">Dr. Mohamed Karray</option>
                </select>
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