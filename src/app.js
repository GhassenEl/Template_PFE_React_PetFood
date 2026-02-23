// src/app.js - Version compatible react-router-dom v5
import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"; // Changé ici
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Historique from "./pages/Historique";
import Notifications from "./pages/Notifications";
import Produits from "./pages/Produits";
import Commandes from "./pages/Commandes";
import Clients from "./pages/Clients";
import Avis from "./pages/Avis";
import Paiements from "./pages/Paiements";
import Contact from "./pages/Contact";
import Factures from "./pages/Factures";

// Components
import Sidebar from "./components/Sidebar";

// Styles
import "./App.css";

// Composant pour les routes privées
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Redirect to="/login" />; // Changé ici
};

// Contenu principal de l'application
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
        <div className="app-container">
          <Sidebar companyInfo={companyInfo} onLogout={logout} />
          <main className="main-content">
            <Switch> {/* Changé de Routes à Switch */}
              <Route path="/dashboard" component={Dashboard} /> {/* Changé element à component */}
              <Route path="/historique" component={Historique} />
              <Route path="/notifications" component={Notifications} />
              <Route path="/produits" component={Produits} />
              <Route path="/commandes" component={Commandes} />
              <Route path="/clients" component={Clients} />
              <Route path="/avis" component={Avis} />
              <Route path="/paiements" component={Paiements} />
              <Route path="/contact" component={Contact} />
              <Route path="/factures" component={Factures} />
              <Redirect from="/" to="/dashboard" /> {/* Changé Navigate à Redirect */}
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