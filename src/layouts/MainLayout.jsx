import React, { useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";
import CartSidebar from "../cart/CartSidebar";
import MobileMenu from "./MobileMenu";
import "./MainLayout.css";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="main-layout">
      <Header
        onMenuClick={() => setMobileMenuOpen(true)}
        onCartClick={() => setCartOpen(true)}
        onSidebarClick={() => setSidebarOpen(true)}
      />

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <main className="main-content">
        <div className="container">{children}</div>
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
