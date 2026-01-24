import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import MobileSidebar from "./MobileSidebar";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Vérifier si c'est la page d'aperçu du dashboard
  const isOverview = location.pathname === "/dashboard";

  return (
    <div className="dashboard-layout">
      {/* Header Dashboard */}
      <DashboardHeader
        onMenuClick={() => setSidebarOpen(true)}
        user={user}
        cartItems={totalItems}
      />

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <div className="dashboard-container">
        {/* Sidebar Desktop */}
        <DashboardSidebar
          onLogout={handleLogout}
          currentPath={location.pathname}
        />

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="dashboard-content">
            {/* Breadcrumb */}
            <nav className="dashboard-breadcrumb">
              <Link to="/dashboard">Dashboard</Link>
              {location.pathname !== "/dashboard" && (
                <>
                  <span className="breadcrumb-separator">/</span>
                  <span className="breadcrumb-current">
                    {location.pathname.split("/").pop().replace("-", " ")}
                  </span>
                </>
              )}
            </nav>

            {/* Contenu de la page */}
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>

          {/* Footer Dashboard */}
          <footer className="dashboard-footer">
            <div className="footer-content">
              <p>© {new Date().getFullYear()} PetFood Delivery - Projet PFE</p>
              <div className="footer-links">
                <Link to="/dashboard/support">Support</Link>
                <Link to="/privacy">Confidentialité</Link>
                <Link to="/terms">Conditions</Link>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
