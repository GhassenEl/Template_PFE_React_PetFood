// src/pages/Contact.jsx
import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Contact = () => {
  const [companyInfo, setCompanyInfo] = useState({
    nom: "PetFood TN",
    slogan: "La nutrition premium pour vos animaux de compagnie",
    logo: "/logo-petfood.png",
    email: "contact@petfood.tn",
    telephone: "+216 71 123 456",
    adresse: "Immeuble PetFood, Rue de la Terre, Tunis",
    facebook: "https://facebook.com/petfoodtn",
    instagram: "https://instagram.com/petfoodtn",
    linkedin: "https://linkedin.com/company/petfoodtn",
    horaires: "Lun-Ven: 9h-18h, Sam: 9h-13h",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(companyInfo);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCompanyInfo(formData);
    setIsEditing(false);
    // Ici, vous enverriez les données à votre API
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="contact-container">
      <h1>Informations de l'entreprise</h1>

      {!isEditing ? (
        <div className="company-profile">
          <div className="company-header">
            <img
              src={companyInfo.logo}
              alt="Logo"
              className="company-logo-large"
            />
            <div>
              <h2>{companyInfo.nom}</h2>
              <p className="slogan-large">{companyInfo.slogan}</p>
            </div>
          </div>

          <div className="company-details">
            <div className="detail-item">
              <FaEnvelope className="detail-icon" />
              <div>
                <h4>Email</h4>
                <p>{companyInfo.email}</p>
              </div>
            </div>

            <div className="detail-item">
              <FaPhone className="detail-icon" />
              <div>
                <h4>Téléphone</h4>
                <p>{companyInfo.telephone}</p>
              </div>
            </div>

            <div className="detail-item">
              <FaMapMarkerAlt className="detail-icon" />
              <div>
                <h4>Adresse</h4>
                <p>{companyInfo.adresse}</p>
              </div>
            </div>

            <div className="detail-item">
              <div>
                <h4>Horaires d'ouverture</h4>
                <p>{companyInfo.horaires}</p>
              </div>
            </div>
          </div>

          <div className="social-media">
            <h3>Réseaux sociaux</h3>
            <div className="social-links">
              <a
                href={companyInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook /> Facebook
              </a>
              <a
                href={companyInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram /> Instagram
              </a>
              <a
                href={companyInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin /> LinkedIn
              </a>
            </div>
          </div>

          <button className="btn-primary" onClick={() => setIsEditing(true)}>
            Modifier les informations
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="edit-company-form">
          <div className="form-group">
            <label>Logo</label>
            <input type="file" accept="image/*" onChange={handleLogoChange} />
            {formData.logo && (
              <img
                src={formData.logo}
                alt="Prévisualisation"
                className="logo-preview"
              />
            )}
          </div>

          <div className="form-group">
            <label>Nom de l'entreprise</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Slogan</label>
            <input
              type="text"
              name="slogan"
              value={formData.slogan}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Téléphone</label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Adresse</label>
            <textarea
              name="adresse"
              value={formData.adresse}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Horaires</label>
            <input
              type="text"
              name="horaires"
              value={formData.horaires}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Facebook</label>
            <input
              type="url"
              name="facebook"
              value={formData.facebook}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Instagram</label>
            <input
              type="url"
              name="instagram"
              value={formData.instagram}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>LinkedIn</label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Enregistrer
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Contact;
