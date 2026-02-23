// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { FaUsers, FaShoppingCart, FaMoneyBillWave, FaStar } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { activeSessions } = useAuth();
  const [stats, setStats] = useState({
    totalVentes: 0,
    clientsFideles: [],
    revenusMensuels: 0,
    commandesEnCours: 0
  });

  // Données mockées pour le dashboard
  const ventesData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
    datasets: [{
      label: 'Ventes 2024',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: '#4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
    }]
  };

  const clientsFideles = [
    { id: 1, nom: 'Ahmed Ben Ali', commandes: 45, total: 12500 },
    { id: 2, nom: 'Sarra Trabelsi', commandes: 38, total: 9800 },
    { id: 3, nom: 'Mohamed Karoui', commandes: 32, total: 8700 },
    { id: 4, nom: 'Nadia Mansour', commandes: 28, total: 7600 },
    { id: 5, nom: 'Karim Jaziri', commandes: 25, total: 6900 },
  ];

  useEffect(() => {
    // Simuler le chargement des données
    setStats({
      totalVentes: 245000,
      clientsFideles: clientsFideles,
      revenusMensuels: 45000,
      commandesEnCours: 156
    });
  }, []);

  return (
    <div className="dashboard">
      <h1>Tableau de Bord</h1>
      
      {/* Statistiques principales */}
      <div className="stats-grid">
        <div className="stat-card">
          <FaShoppingCart className="stat-icon" />
          <div>
            <h3>{stats.totalVentes} TND</h3>
            <p>Ventes totales</p>
          </div>
        </div>
        
        <div className="stat-card">
          <FaUsers className="stat-icon" />
          <div>
            <h3>{stats.commandesEnCours}</h3>
            <p>Commandes en cours</p>
          </div>
        </div>
        
        <div className="stat-card">
          <FaMoneyBillWave className="stat-icon" />
          <div>
            <h3>{stats.revenusMensuels} TND</h3>
            <p>Revenus mensuels</p>
          </div>
        </div>
        
        <div className="stat-card">
          <FaStar className="stat-icon" />
          <div>
            <h3>4.8/5</h3>
            <p>Note moyenne</p>
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="charts-container">
        <div className="chart-card">
          <h3>Évolution des ventes</h3>
          <Line data={ventesData} />
        </div>
      </div>

      {/* Clients fidèles */}
      <div className="clients-fideles">
        <h2>Clients Fidèles</h2>
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Nombre de commandes</th>
              <th>Total dépensé</th>
            </tr>
          </thead>
          <tbody>
            {stats.clientsFideles.map(client => (
              <tr key={client.id}>
                <td>{client.nom}</td>
                <td>{client.commandes}</td>
                <td>{client.total} TND</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sessions actives */}
      <div className="sessions-actives">
        <h2>Utilisateurs connectés ({activeSessions.length})</h2>
        <table>
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Heure de connexion</th>
              <th>IP</th>
              <th>Appareil</th>
            </tr>
          </thead>
          <tbody>
            {activeSessions.map((session, index) => (
              <tr key={index}>
                <td>{session.userName}</td>
                <td>{new Date(session.loginTime).toLocaleString()}</td>
                <td>{session.ip}</td>
                <td>{session.device.substring(0, 50)}...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
