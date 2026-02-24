// src/app.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Importer Sidebar (assurez-vous que le chemin est correct)
import Sidebar from "./components/Sidebar";

// Pages (créez ces fichiers plus tard)
const Login = () => <div>Page de Login</div>;
const Dashboard = () => <div>Dashboard</div>;
const Historique = () => <div>Historique</div>;
const Notifications = () => <div>Notifications</div>;
const Produits = () => <div>Produits</div>;
const Commandes = () => <div>Commandes</div>;
const Clients = () => <div>Clients</div>;
const Avis = () => <div>Avis</div>;
const Paiements = () => <div>Paiements</div>;
const Contact = () => <div>Contact</div>;
const Factures = () => <div>Factures</div>;

// Styles
import "./App.css";

// Composant pour les routes privées
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Redirect to="/login" />;
};

// Contenu principal
function AppContent() {
  const { user, logout } = useAuth();

  const companyInfo = {
    name: "PetFood TN",
    slogan: "La nutrition premium pour vos animaux",
    logo: "/logo-petfood.png",
  };

  return (
    <div className="app">
      {user ? (
        <div style={{ display: "flex" }}>
          <Sidebar companyInfo={companyInfo} onLogout={logout} />
          <main style={{ marginLeft: "250px", padding: "20px", flex: 1 }}>
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/historique" component={Historique} />
              <Route path="/notifications" component={Notifications} />
              <Route path="/produits" component={Produits} />
              <Route path="/commandes" component={Commandes} />
              <Route path="/clients" component={Clients} />
              <Route path="/avis" component={Avis} />
              <Route path="/paiements" component={Paiements} />
              <Route path="/contact" component={Contact} />
              <Route path="/factures" component={Factures} />
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </main>
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

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
