import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import "./Auth.css";

const registerSchema = yup.object({
  firstName: yup
    .string()
    .required("Prénom requis")
    .min(2, "Minimum 2 caractères"),
  lastName: yup.string().required("Nom requis").min(2, "Minimum 2 caractères"),
  email: yup.string().email("Email invalide").required("Email requis"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Numéro de téléphone invalide")
    .required("Téléphone requis"),
  password: yup
    .string()
    .required("Mot de passe requis")
    .min(8, "Minimum 8 caractères")
    .matches(/[a-z]/, "Doit contenir une minuscule")
    .matches(/[A-Z]/, "Doit contenir une majuscule")
    .matches(/[0-9]/, "Doit contenir un chiffre")
    .matches(/[^a-zA-Z0-9]/, "Doit contenir un caractère spécial"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passe ne correspondent pas",
    )
    .required("Confirmation requise"),
  acceptTerms: yup
    .boolean()
    .oneOf([true], "Vous devez accepter les conditions"),
  newsletter: yup.boolean(),
});

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
      newsletter: true,
    },
  });

  const password = watch("password");

  const nextStep = async () => {
    const fields =
      step === 1
        ? ["firstName", "lastName", "email", "phone"]
        : ["password", "confirmPassword", "acceptTerms"];

    const isValid = await trigger(fields);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Préparer les données d'inscription
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        newsletter: data.newsletter,
        role: "customer",
      };

      await registerUser(userData);

      toast.success("Inscription réussie ! Bienvenue chez PetFood Delivery 🐾");

      // Redirection après succès
      setTimeout(() => {
        navigate("/dashboard", {
          state: { welcome: true },
        });
      }, 1500);
    } catch (error) {
      console.error("Register error:", error);

      if (error.response?.status === 409) {
        toast.error("Cet email est déjà utilisé");
      } else if (error.response?.status === 400) {
        toast.error("Données invalides");
      } else {
        toast.error("Erreur lors de l'inscription. Réessayez.");
      }
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = (pass) => {
    if (!pass) return { score: 0, label: "Faible", color: "#e74c3c" };

    let score = 0;
    if (pass.length >= 8) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^a-zA-Z0-9]/.test(pass)) score++;

    const levels = [
      { label: "Très faible", color: "#e74c3c" },
      { label: "Faible", color: "#e67e22" },
      { label: "Moyen", color: "#f1c40f" },
      { label: "Bon", color: "#2ecc71" },
      { label: "Très bon", color: "#27ae60" },
      { label: "Excellent", color: "#16a085" },
    ];

    return levels[score];
  };

  const strength = passwordStrength(password);

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Header */}
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <span className="logo-icon">🐾</span>
            <span className="logo-text">
              <strong>PetFood</strong>Delivery
            </span>
          </Link>
          <h1>Créer votre compte</h1>
          <p>Rejoignez notre communauté d'amoureux des animaux</p>

          {/* Étapes */}
          <div className="steps">
            <div className={`step ${step >= 1 ? "active" : ""}`}>
              <span className="step-number">1</span>
              <span className="step-label">Informations</span>
            </div>
            <div className="step-line"></div>
            <div className={`step ${step >= 2 ? "active" : ""}`}>
              <span className="step-number">2</span>
              <span className="step-label">Sécurité</span>
            </div>
            <div className="step-line"></div>
            <div className={`step ${step >= 3 ? "active" : ""}`}>
              <span className="step-number">3</span>
              <span className="step-label">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          {/* Étape 1 : Informations personnelles */}
          {step === 1 && (
            <div className="form-step">
              <h3>Informations personnelles</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    <i className="fas fa-user"></i> Prénom
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className={`form-input ${errors.firstName ? "error" : ""}`}
                    placeholder="Jean"
                    {...register("firstName")}
                    disabled={loading}
                  />
                  {errors.firstName && (
                    <span className="error-message">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    <i className="fas fa-user"></i> Nom
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className={`form-input ${errors.lastName ? "error" : ""}`}
                    placeholder="Dupont"
                    {...register("lastName")}
                    disabled={loading}
                  />
                  {errors.lastName && (
                    <span className="error-message">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <i className="fas fa-envelope"></i> Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`form-input ${errors.email ? "error" : ""}`}
                  placeholder="jean.dupont@email.com"
                  {...register("email")}
                  disabled={loading}
                />
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  <i className="fas fa-phone"></i> Téléphone
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={`form-input ${errors.phone ? "error" : ""}`}
                  placeholder="0612345678"
                  {...register("phone")}
                  disabled={loading}
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone.message}</span>
                )}
                <small className="form-hint">
                  Pour les notifications de livraison
                </small>
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="auth-button primary"
                disabled={loading}
              >
                Continuer <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          )}

          {/* Étape 2 : Sécurité */}
          {step === 2 && (
            <div className="form-step">
              <h3>Création du mot de passe</h3>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  <i className="fas fa-lock"></i> Mot de passe
                </label>
                <div className="password-input">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`form-input ${errors.password ? "error" : ""}`}
                    placeholder="Créez un mot de passe sécurisé"
                    {...register("password")}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                  >
                    <i
                      className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                    ></i>
                  </button>
                </div>
                {errors.password && (
                  <span className="error-message">
                    {errors.password.message}
                  </span>
                )}

                {/* Force du mot de passe */}
                {password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div
                        className="strength-fill"
                        style={{
                          width: `${(passwordStrength(password).score / 5) * 100}%`,
                          backgroundColor: strength.color,
                        }}
                      ></div>
                    </div>
                    <span
                      className="strength-label"
                      style={{ color: strength.color }}
                    >
                      {strength.label}
                    </span>
                  </div>
                )}

                <div className="password-requirements">
                  <p>Votre mot de passe doit contenir :</p>
                  <ul>
                    <li className={password?.length >= 8 ? "valid" : ""}>
                      <i
                        className={`fas fa-${password?.length >= 8 ? "check" : "times"}`}
                      ></i>
                      Au moins 8 caractères
                    </li>
                    <li className={/[a-z]/.test(password) ? "valid" : ""}>
                      <i
                        className={`fas fa-${/[a-z]/.test(password) ? "check" : "times"}`}
                      ></i>
                      Une lettre minuscule
                    </li>
                    <li className={/[A-Z]/.test(password) ? "valid" : ""}>
                      <i
                        className={`fas fa-${/[A-Z]/.test(password) ? "check" : "times"}`}
                      ></i>
                      Une lettre majuscule
                    </li>
                    <li className={/[0-9]/.test(password) ? "valid" : ""}>
                      <i
                        className={`fas fa-${/[0-9]/.test(password) ? "check" : "times"}`}
                      ></i>
                      Un chiffre
                    </li>
                    <li
                      className={/[^a-zA-Z0-9]/.test(password) ? "valid" : ""}
                    >
                      <i
                        className={`fas fa-${/[^a-zA-Z0-9]/.test(password) ? "check" : "times"}`}
                      ></i>
                      Un caractère spécial
                    </li>
                  </ul>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  <i className="fas fa-lock"></i> Confirmer le mot de passe
                </label>
                <div className="password-input">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className={`form-input ${errors.confirmPassword ? "error" : ""}`}
                    placeholder="Confirmez votre mot de passe"
                    {...register("confirmPassword")}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex="-1"
                  >
                    <i
                      className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
                    ></i>
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="error-message">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    {...register("newsletter")}
                    disabled={loading}
                  />
                  <span className="checkmark"></span>
                  Recevoir les offres spéciales et conseils par email
                </label>
              </div>

              <div className="form-buttons">
                <button
                  type="button"
                  onClick={prevStep}
                  className="auth-button secondary"
                  disabled={loading}
                >
                  <i className="fas fa-arrow-left"></i> Retour
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="auth-button primary"
                  disabled={loading}
                >
                  Continuer <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {/* Étape 3 : Confirmation */}
          {step === 3 && (
            <div className="form-step">
              <h3>Finaliser l'inscription</h3>

              <div className="summary">
                <div className="summary-item">
                  <span className="summary-label">Nom complet :</span>
                  <span className="summary-value">
                    {watch("firstName")} {watch("lastName")}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Email :</span>
                  <span className="summary-value">{watch("email")}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Téléphone :</span>
                  <span className="summary-value">{watch("phone")}</span>
                </div>
              </div>

              <div className="terms-section">
                <label className="checkbox-label terms">
                  <input
                    type="checkbox"
                    {...register("acceptTerms")}
                    disabled={loading}
                  />
                  <span className="checkmark"></span>
                  <span>
                    J'accepte les{" "}
                    <Link to="/terms" target="_blank" className="terms-link">
                      conditions générales d'utilisation
                    </Link>{" "}
                    et la{" "}
                    <Link to="/privacy" target="_blank" className="terms-link">
                      politique de confidentialité
                    </Link>
                  </span>
                </label>
                {errors.acceptTerms && (
                  <span className="error-message">
                    {errors.acceptTerms.message}
                  </span>
                )}
              </div>

              <div className="form-buttons">
                <button
                  type="button"
                  onClick={prevStep}
                  className="auth-button secondary"
                  disabled={loading}
                >
                  <i className="fas fa-arrow-left"></i> Retour
                </button>
                <button
                  type="submit"
                  className="auth-button success"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Création du compte...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check"></i>
                      Créer mon compte
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="auth-footer">
          <p>
            Déjà un compte ?{" "}
            <Link to="/login" className="auth-link">
              Se connecter
            </Link>
          </p>
          <div className="security-info">
            <i className="fas fa-shield-alt"></i>
            <span>Vos données sont protégées et chiffrées</span>
          </div>
        </div>

        {/* Avantages */}
        <div className="auth-benefits">
          <h4>Pourquoi créer un compte ?</h4>
          <div className="benefits-grid">
            <div className="benefit-card">
              <i className="fas fa-history"></i>
              <h5>Historique des commandes</h5>
              <p>Suivez toutes vos commandes passées</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-paw"></i>
              <h5>Profils animaux</h5>
              <p>Gérez la santé de vos compagnons</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-gift"></i>
              <h5>Offres exclusives</h5>
              <p>-10% sur votre première commande</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-shipping-fast"></i>
              <h5>Livraison rapide</h5>
              <p>Suivi en temps réel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
