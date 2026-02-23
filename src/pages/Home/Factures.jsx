// src/pages/Factures.jsx
import React, { useState, useEffect } from "react";
import {
  FaFileInvoice,
  FaDownload,
  FaEye,
  FaPrint,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaEuroSign,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEnvelope,
} from "react-icons/fa";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Factures = () => {
  const [factures, setFactures] = useState([]);
  const [filteredFactures, setFilteredFactures] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("tous");
  const [dateRange, setDateRange] = useState({ debut: "", fin: "" });
  const [selectedFacture, setSelectedFacture] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    payees: 0,
    enAttente: 0,
    enRetard: 0,
  });

  useEffect(() => {
    // Charger les factures depuis l'API
    fetchFactures();
  }, []);

  useEffect(() => {
    filterFactures();
    calculateStats();
  }, [factures, searchTerm, statusFilter, dateRange]);

  const fetchFactures = async () => {
    // Simulation de données
    const mockFactures = [
      {
        id: "FAC-2024-001",
        commandeId: "CMD-2024-001",
        client: "Ahmed Ben Ali",
        email: "ahmed.benali@email.com",
        dateEmission: "2024-01-15",
        dateEcheance: "2024-01-30",
        montantHT: 450.0,
        tva: 90.0,
        montantTTC: 540.0,
        status: "payee",
        modePaiement: "Carte bancaire",
        datePaiement: "2024-01-15",
        articles: [
          {
            nom: "Croquettes Premium 10kg",
            quantite: 2,
            prixUnitaire: 150.0,
            total: 300.0,
          },
          {
            nom: "Litière agglomérante 5kg",
            quantite: 3,
            prixUnitaire: 50.0,
            total: 150.0,
          },
        ],
      },
      {
        id: "FAC-2024-002",
        commandeId: "CMD-2024-002",
        client: "Sarra Trabelsi",
        email: "sarra.t@email.com",
        dateEmission: "2024-01-10",
        dateEcheance: "2024-01-25",
        montantHT: 320.0,
        tva: 64.0,
        montantTTC: 384.0,
        status: "en_attente",
        modePaiement: "Virement",
        datePaiement: null,
        articles: [
          {
            nom: "Jouets pour chat (lot de 3)",
            quantite: 2,
            prixUnitaire: 45.0,
            total: 90.0,
          },
          {
            nom: "Alimentation humide 24 boîtes",
            quantite: 1,
            prixUnitaire: 230.0,
            total: 230.0,
          },
        ],
      },
      {
        id: "FAC-2024-003",
        commandeId: "CMD-2024-003",
        client: "Mohamed Karoui",
        email: "m.karoui@email.com",
        dateEmission: "2024-01-05",
        dateEcheance: "2024-01-20",
        montantHT: 890.0,
        tva: 178.0,
        montantTTC: 1068.0,
        status: "en_retard",
        modePaiement: "Espèces",
        datePaiement: null,
        articles: [
          {
            nom: "Cage pour oiseau deluxe",
            quantite: 1,
            prixUnitaire: 450.0,
            total: 450.0,
          },
          {
            nom: "Nourriture perroquet 5kg",
            quantite: 4,
            prixUnitaire: 110.0,
            total: 440.0,
          },
        ],
      },
      {
        id: "FAC-2024-004",
        commandeId: "CMD-2024-004",
        client: "Nadia Mansour",
        email: "nadia.m@email.com",
        dateEmission: "2024-01-18",
        dateEcheance: "2024-02-02",
        montantHT: 225.0,
        tva: 45.0,
        montantTTC: 270.0,
        status: "payee",
        modePaiement: "Carte bancaire",
        datePaiement: "2024-01-18",
        articles: [
          {
            nom: "Shampoing spécial chien",
            quantite: 3,
            prixUnitaire: 35.0,
            total: 105.0,
          },
          {
            nom: "Brosse de toilettage",
            quantite: 2,
            prixUnitaire: 60.0,
            total: 120.0,
          },
        ],
      },
    ];
    setFactures(mockFactures);
    setFilteredFactures(mockFactures);
  };

  const filterFactures = () => {
    let filtered = [...factures];

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (f) =>
          f.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.commandeId.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filtre par statut
    if (statusFilter !== "tous") {
      filtered = filtered.filter((f) => f.status === statusFilter);
    }

    // Filtre par date
    if (dateRange.debut) {
      filtered = filtered.filter(
        (f) => new Date(f.dateEmission) >= new Date(dateRange.debut),
      );
    }
    if (dateRange.fin) {
      filtered = filtered.filter(
        (f) => new Date(f.dateEmission) <= new Date(dateRange.fin),
      );
    }

    setFilteredFactures(filtered);
  };

  const calculateStats = () => {
    const total = factures.reduce((sum, f) => sum + f.montantTTC, 0);
    const payees = factures
      .filter((f) => f.status === "payee")
      .reduce((sum, f) => sum + f.montantTTC, 0);
    const enAttente = factures
      .filter((f) => f.status === "en_attente")
      .reduce((sum, f) => sum + f.montantTTC, 0);
    const enRetard = factures
      .filter((f) => f.status === "en_retard")
      .reduce((sum, f) => sum + f.montantTTC, 0);

    setStats({
      total,
      payees,
      enAttente,
      enRetard,
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "payee":
        return (
          <span className="status-badge success">
            <FaCheckCircle /> Payée
          </span>
        );
      case "en_attente":
        return (
          <span className="status-badge warning">
            <FaClock /> En attente
          </span>
        );
      case "en_retard":
        return (
          <span className="status-badge danger">
            <FaTimesCircle /> En retard
          </span>
        );
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  const generatePDF = (facture) => {
    const doc = new jsPDF();

    // En-tête
    doc.setFontSize(20);
    doc.setTextColor(76, 175, 80);
    doc.text("PetFood TN", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("La nutrition premium pour vos animaux", 105, 30, {
      align: "center",
    });

    // Informations de la facture
    doc.setFontSize(16);
    doc.text(`FACTURE ${facture.id}`, 20, 50);

    doc.setFontSize(10);
    doc.text(
      `Date d'émission : ${new Date(facture.dateEmission).toLocaleDateString("fr-FR")}`,
      20,
      60,
    );
    doc.text(
      `Date d'échéance : ${new Date(facture.dateEcheance).toLocaleDateString("fr-FR")}`,
      20,
      65,
    );

    // Informations client
    doc.text("Client :", 20, 80);
    doc.setFontSize(11);
    doc.text(facture.client, 20, 85);
    doc.setFontSize(10);
    doc.text(facture.email, 20, 90);

    // Tableau des articles
    const tableColumn = ["Article", "Quantité", "Prix unitaire", "Total"];
    const tableRows = facture.articles.map((article) => [
      article.nom,
      article.quantite,
      `${article.prixUnitaire.toFixed(2)} €`,
      `${article.total.toFixed(2)} €`,
    ]);

    doc.autoTable({
      startY: 100,
      head: [tableColumn],
      body: tableRows,
      theme: "striped",
      headStyles: { fillColor: [76, 175, 80] },
    });

    // Totaux
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Montant HT : ${facture.montantHT.toFixed(2)} €`, 140, finalY);
    doc.text(`TVA (20%) : ${facture.tva.toFixed(2)} €`, 140, finalY + 5);
    doc.setFontSize(12);
    doc.setFontStyle("bold");
    doc.text(
      `Total TTC : ${facture.montantTTC.toFixed(2)} €`,
      140,
      finalY + 12,
    );

    // Pied de page
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text("Merci de votre confiance !", 105, 280, { align: "center" });

    // Sauvegarder le PDF
    doc.save(`facture_${facture.id}.pdf`);
  };

  const sendByEmail = (facture) => {
    // Simulation d'envoi d'email
    alert(`Facture ${facture.id} envoyée à ${facture.email}`);
  };

  const marquerCommePayee = (factureId) => {
    // Logique pour marquer la facture comme payée
    const updatedFactures = factures.map((f) =>
      f.id === factureId
        ? {
            ...f,
            status: "payee",
            datePaiement: new Date().toISOString().split("T")[0],
          }
        : f,
    );
    setFactures(updatedFactures);
  };

  return (
    <div className="factures-container">
      <div className="page-header">
        <h1>
          <FaFileInvoice /> Gestion des Factures
        </h1>
        <button className="btn-primary" onClick={() => window.print()}>
          <FaPrint /> Imprimer le rapport
        </button>
      </div>

      {/* Statistiques */}
      <div className="stats-grid">
        <div className="stat-card total">
          <FaEuroSign className="stat-icon" />
          <div>
            <h3>{stats.total.toFixed(2)} TND</h3>
            <p>Total facturé</p>
          </div>
        </div>

        <div className="stat-card payees">
          <FaCheckCircle className="stat-icon" />
          <div>
            <h3>{stats.payees.toFixed(2)} TND</h3>
            <p>Factures payées</p>
          </div>
        </div>

        <div className="stat-card en-attente">
          <FaClock className="stat-icon" />
          <div>
            <h3>{stats.enAttente.toFixed(2)} TND</h3>
            <p>En attente</p>
          </div>
        </div>

        <div className="stat-card en-retard">
          <FaTimesCircle className="stat-icon" />
          <div>
            <h3>{stats.enRetard.toFixed(2)} TND</h3>
            <p>En retard</p>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="filters-section">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Rechercher par numéro, client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="tous">Tous les statuts</option>
            <option value="payee">Payées</option>
            <option value="en_attente">En attente</option>
            <option value="en_retard">En retard</option>
          </select>

          <div className="date-filters">
            <input
              type="date"
              value={dateRange.debut}
              onChange={(e) =>
                setDateRange({ ...dateRange, debut: e.target.value })
              }
              placeholder="Date début"
            />
            <input
              type="date"
              value={dateRange.fin}
              onChange={(e) =>
                setDateRange({ ...dateRange, fin: e.target.value })
              }
              placeholder="Date fin"
            />
          </div>
        </div>
      </div>

      {/* Tableau des factures */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>N° Facture</th>
              <th>Client</th>
              <th>Date émission</th>
              <th>Échéance</th>
              <th>Montant TTC</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFactures.map((facture) => (
              <tr key={facture.id}>
                <td className="facture-num">{facture.id}</td>
                <td>
                  <strong>{facture.client}</strong>
                  <br />
                  <small>{facture.email}</small>
                </td>
                <td>
                  {new Date(facture.dateEmission).toLocaleDateString("fr-FR")}
                </td>
                <td
                  className={
                    new Date(facture.dateEcheance) < new Date() &&
                    facture.status !== "payee"
                      ? "date-expiree"
                      : ""
                  }
                >
                  {new Date(facture.dateEcheance).toLocaleDateString("fr-FR")}
                </td>
                <td className="montant">{facture.montantTTC.toFixed(2)} TND</td>
                <td>{getStatusBadge(facture.status)}</td>
                <td className="actions">
                  <button
                    className="btn-icon"
                    onClick={() => {
                      setSelectedFacture(facture);
                      setShowDetailModal(true);
                    }}
                    title="Voir détails"
                  >
                    <FaEye />
                  </button>
                  <button
                    className="btn-icon"
                    onClick={() => generatePDF(facture)}
                    title="Télécharger PDF"
                  >
                    <FaDownload />
                  </button>
                  <button
                    className="btn-icon"
                    onClick={() => sendByEmail(facture)}
                    title="Envoyer par email"
                  >
                    <FaEnvelope />
                  </button>
                  {facture.status !== "payee" && (
                    <button
                      className="btn-icon success"
                      onClick={() => marquerCommePayee(facture.id)}
                      title="Marquer comme payée"
                    >
                      <FaCheckCircle />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de détail */}
      {showDetailModal && selectedFacture && (
        <div className="modal" onClick={() => setShowDetailModal(false)}>
          <div
            className="modal-content facture-detail"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Détail de la facture {selectedFacture.id}</h2>
              <button
                className="close-btn"
                onClick={() => setShowDetailModal(false)}
              >
                ×
              </button>
            </div>

            <div className="facture-info">
              <div className="info-section">
                <h3>Informations générales</h3>
                <p>
                  <strong>Commande associée :</strong>{" "}
                  {selectedFacture.commandeId}
                </p>
                <p>
                  <strong>Date d'émission :</strong>{" "}
                  {new Date(selectedFacture.dateEmission).toLocaleDateString(
                    "fr-FR",
                  )}
                </p>
                <p>
                  <strong>Date d'échéance :</strong>{" "}
                  {new Date(selectedFacture.dateEcheance).toLocaleDateString(
                    "fr-FR",
                  )}
                </p>
                <p>
                  <strong>Mode de paiement :</strong>{" "}
                  {selectedFacture.modePaiement}
                </p>
                {selectedFacture.datePaiement && (
                  <p>
                    <strong>Date de paiement :</strong>{" "}
                    {new Date(selectedFacture.datePaiement).toLocaleDateString(
                      "fr-FR",
                    )}
                  </p>
                )}
              </div>

              <div className="info-section">
                <h3>Client</h3>
                <p>
                  <strong>Nom :</strong> {selectedFacture.client}
                </p>
                <p>
                  <strong>Email :</strong> {selectedFacture.email}
                </p>
              </div>
            </div>

            <div className="articles-section">
              <h3>Articles</h3>
              <table className="articles-table">
                <thead>
                  <tr>
                    <th>Article</th>
                    <th>Quantité</th>
                    <th>Prix unitaire</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedFacture.articles.map((article, index) => (
                    <tr key={index}>
                      <td>{article.nom}</td>
                      <td>{article.quantite}</td>
                      <td>{article.prixUnitaire.toFixed(2)} TND</td>
                      <td>{article.total.toFixed(2)} TND</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-right">
                      Montant HT :
                    </td>
                    <td>{selectedFacture.montantHT.toFixed(2)} TND</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="text-right">
                      TVA (20%) :
                    </td>
                    <td>{selectedFacture.tva.toFixed(2)} TND</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="text-right">
                      <strong>Total TTC :</strong>
                    </td>
                    <td>
                      <strong>
                        {selectedFacture.montantTTC.toFixed(2)} TND
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="modal-actions">
              <button
                className="btn-primary"
                onClick={() => generatePDF(selectedFacture)}
              >
                <FaDownload /> Télécharger PDF
              </button>
              <button
                className="btn-secondary"
                onClick={() => sendByEmail(selectedFacture)}
              >
                <FaEnvelope /> Envoyer par email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Factures;
