import React from "react";
import { Link } from "react-router-dom";
import NewsletterForm from "../../shared/NewsletterForm";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Colonne 1: À propos */}
            <div className="footer-col">
              <h3 className="footer-title">
                <span className="footer-icon">🐾</span>
                PetFood Delivery
              </h3>
              <p className="footer-description">
                Votre partenaire de confiance pour la nourriture de vos animaux.
                Produits de qualité, livraison rapide et conseils d'experts.
              </p>
              <div className="social-links">
                <a href="https://facebook.com" aria-label="Facebook">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="https://instagram.com" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://twitter.com" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://tiktok.com" aria-label="TikTok">
                  <i className="fab fa-tiktok"></i>
                </a>
              </div>
            </div>

            {/* Colonne 2: Navigation */}
            <div className="footer-col">
              <h4 className="footer-subtitle">Navigation</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/">Accueil</Link>
                </li>
                <li>
                  <Link to="/products">Boutique</Link>
                </li>
                <li>
                  <Link to="/products/dogs">Pour chiens</Link>
                </li>
                <li>
                  <Link to="/products/cats">Pour chats</Link>
                </li>
                <li>
                  <Link to="/about">À propos</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Colonne 3: Services */}
            <div className="footer-col">
              <h4 className="footer-subtitle">Services</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/delivery">Livraison</Link>
                </li>
                <li>
                  <Link to="/delivery/tracking">Suivi de commande</Link>
                </li>
                <li>
                  <Link to="/returns">Retours & Échanges</Link>
                </li>
                <li>
                  <Link to="/faq">FAQ</Link>
                </li>
                <li>
                  <Link to="/advice">Conseils vétérinaires</Link>
                </li>
                <li>
                  <Link to="/subscriptions">Abonnements</Link>
                </li>
              </ul>
            </div>

            {/* Colonne 4: Newsletter */}
            <div className="footer-col">
              <h4 className="footer-subtitle">Newsletter</h4>
              <p>Recevez nos offres et conseils pour vos animaux</p>
              <NewsletterForm />
              <div className="payment-methods">
                <span>Paiements sécurisés :</span>
                <div className="payment-icons">
                  <i className="fab fa-cc-visa" title="Visa"></i>
                  <i className="fab fa-cc-mastercard" title="Mastercard"></i>
                  <i className="fab fa-cc-paypal" title="PayPal"></i>
                  <i className="fab fa-cc-apple-pay" title="Apple Pay"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              © {currentYear} PetFood Delivery - Projet PFE. Tous droits
              réservés.
            </div>
            <div className="legal-links">
              <Link to="/privacy">Confidentialité</Link>
              <Link to="/terms">CGV</Link>
              <Link to="/cookies">Cookies</Link>
              <Link to="/sitemap">Plan du site</Link>
            </div>
            <div className="footer-badges">
              <span className="badge"> Paiement sécurisé</span>
              <span className="badge"> Satisfait ou remboursé</span>
              <span className="badge"> Ami des animaux</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
