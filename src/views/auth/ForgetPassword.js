import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { authService } from "../../services/authService";
import "./Auth.css";

const forgotSchema = yup.object({
  email: yup.string().email("Email invalide").required("Email requis"),
});

const resetSchema = yup.object({
  code: yup
    .string()
    .required("Code requis")
    .length(6, "Le code doit contenir 6 chiffres"),
  newPassword: yup
    .string()
    .required("Nouveau mot de passe requis")
    .min(8, "Minimum 8 caractères"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword"), null],
      "Les mots de passe ne correspondent pas",
    )
    .required("Confirmation requise"),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: New password
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const emailForm = useForm({
    resolver: yupResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetForm = useForm({
    resolver: yupResolver(resetSchema),
    defaultValues: {
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSendCode = async (data) => {
    try {
      setLoading(true);
      await authService.requestPasswordReset(data.email);
      setEmail(data.email);
      toast.success("Code de réinitialisation envoyé !");
      setStep(2);
    } catch (error) {
      console.error("Send code error:", error);
      toast.error("Erreur lors de l'envoi du code. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (data) => {
    try {
      setLoading(true);
      await authService.verifyResetCode(email, data.code);
      toast.success("Code vérifié !");
      setStep(3);
    } catch (error) {
      console.error("Verify code error:", error);
      if (error.response?.status === 400) {
        toast.error("Code incorrect ou expiré");
      } else {
        toast.error("Erreur de vérification. Réessayez.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (data) => {
    try {
      setLoading(true);
      await authService.resetPassword(email, data.code, data.newPassword);
      toast.success("Mot de passe réinitialisé avec succès !");

      // Redirection vers la page de connexion
      setTimeout(() => {
        navigate("/login", {
          state: {
            message: "Mot de passe réinitialisé. Vous pouvez vous connecter.",
          },
        });
      }, 2000);
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("Erreur lors de la réinitialisation. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      setLoading(true);
      await authService.requestPasswordReset(email);
      toast.success("Nouveau code envoyé !");
    } catch (error) {
      toast.error("Erreur lors de l'envoi du code");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, label: "Email", active: step >= 1 },
    { number: 2, label: "Code", active: step >= 2 },
    { number: 3, label: "Nouveau mot de passe", active: step >= 3 },
  ];

  return (
    <div className="auth-page">
      <div className="auth-container forgot-container">
        {/* Header */}
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <span className="logo-icon">🐾</span>
            <span className="logo-text">
              <strong>PetFood</strong>Delivery
            </span>
          </Link>
          <h1>Réinitialisation du mot de passe</h1>
          <p>Récupérez l'accès à votre compte en 3 étapes</p>

          {/* Étapes */}
          <div className="steps">
            {steps.map((stepItem, index) => (
              <React.Fragment key={stepItem.number}>
                <div className={`step ${stepItem.active ? "active" : ""}`}>
                  <span className="step-number">{stepItem.number}</span>
                  <span className="step-label">{stepItem.label}</span>
                </div>
                {index < steps.length - 1 && <div className="step-line"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Contenu selon l'étape */}
        <div className="forgot-content">
          {/* Étape 1 : Email */}
          {step === 1 && (
            <form
              onSubmit={emailForm.handleSubmit(handleSendCode)}
              className="auth-form"
            >
              <div className="form-step">
                <div className="step-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <h3>Entrez votre email</h3>
                <p className="step-description">
                  Nous vous enverrons un code de réinitialisation à 6 chiffres
                </p>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <i className="fas fa-envelope"></i> Adresse email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`form-input ${emailForm.formState.errors.email ? "error" : ""}`}
                    placeholder="votre@email.com"
                    {...emailForm.register("email")}
                    disabled={loading}
                  />
                  {emailForm.formState.errors.email && (
                    <span className="error-message">
                      {emailForm.formState.errors.email.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="auth-button primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      Envoyer le code
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Étape 2 : Code de vérification */}
          {step === 2 && (
            <form
              onSubmit={resetForm.handleSubmit(handleVerifyCode)}
              className="auth-form"
            >
              <div className="form-step">
                <div className="step-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h3>Vérifiez votre email</h3>
                <p className="step-description">
                  Nous avons envoyé un code à 6 chiffres à{" "}
                  <strong>{email}</strong>
                </p>

                <div className="form-group">
                  <label htmlFor="code" className="form-label">
                    <i className="fas fa-key"></i> Code de vérification
                  </label>
                  <div className="code-inputs">
                    {[...Array(6)].map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className="code-input"
                        {...resetForm.register(`code.${index}`, {
                          onChange: (e) => {
                            const value = e.target.value;
                            if (value && index < 5) {
                              document
                                .getElementById(`code-${index + 1}`)
                                ?.focus();
                            }
                          },
                        })}
                        id={`code-${index}`}
                        disabled={loading}
                      />
                    ))}
                  </div>
                  {resetForm.formState.errors.code && (
                    <span className="error-message">
                      {resetForm.formState.errors.code.message}
                    </span>
                  )}
                </div>

                <div className="resend-code">
                  <p>Vous n'avez pas reçu le code ?</p>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="resend-button"
                    disabled={loading}
                  >
                    <i className="fas fa-redo"></i>
                    Renvoyer le code
                  </button>
                  <small className="timer">(Disponible dans 60s)</small>
                </div>

                <div className="form-buttons">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="auth-button secondary"
                    disabled={loading}
                  >
                    <i className="fas fa-arrow-left"></i> Changer d'email
                  </button>
                  <button
                    type="submit"
                    className="auth-button primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Vérification...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-check"></i>
                        Vérifier le code
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Étape 3 : Nouveau mot de passe */}
          {step === 3 && (
            <form
              onSubmit={resetForm.handleSubmit(handleResetPassword)}
              className="auth-form"
            >
              <div className="form-step">
                <div className="step-icon">
                  <i className="fas fa-lock"></i>
                </div>
                <h3>Créez un nouveau mot de passe</h3>
                <p className="step-description">
                  Choisissez un mot de passe sécurisé pour votre compte
                </p>

                <div className="form-group">
                  <label htmlFor="newPassword" className="form-label">
                    <i className="fas fa-lock"></i> Nouveau mot de passe
                  </label>
                  <div className="password-input">
                    <input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      className={`form-input ${resetForm.formState.errors.newPassword ? "error" : ""}`}
                      placeholder="Nouveau mot de passe"
                      {...resetForm.register("newPassword")}
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
                  {resetForm.formState.errors.newPassword && (
                    <span className="error-message">
                      {resetForm.formState.errors.newPassword.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    <i className="fas fa-lock"></i> Confirmer le mot de passe
                  </label>
                  <div className="password-input">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className={`form-input ${resetForm.formState.errors.confirmPassword ? "error" : ""}`}
                      placeholder="Confirmez le mot de passe"
                      {...resetForm.register("confirmPassword")}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      tabIndex="-1"
                    >
                      <i
                        className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
                      ></i>
                    </button>
                  </div>
                  {resetForm.formState.errors.confirmPassword && (
                    <span className="error-message">
                      {resetForm.formState.errors.confirmPassword.message}
                    </span>
                  )}
                </div>

                <div className="password-requirements">
                  <p>Votre mot de passe doit contenir :</p>
                  <ul>
                    <li>
                      <i className="fas fa-check"></i> Au moins 8 caractères
                    </li>
                    <li>
                      <i className="fas fa-check"></i> Une lettre minuscule
                    </li>
                    <li>
                      <i className="fas fa-check"></i> Une lettre majuscule
                    </li>
                    <li>
                      <i className="fas fa-check"></i> Un chiffre
                    </li>
                    <li>
                      <i className="fas fa-check"></i> Un caractère spécial
                    </li>
                  </ul>
                </div>

                <button
                  type="submit"
                  className="auth-button success"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Réinitialisation...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check-circle"></i>
                      Réinitialiser le mot de passe
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="auth-footer">
          <p>
            <Link to="/login" className="auth-link">
              <i className="fas fa-arrow-left"></i> Retour à la connexion
            </Link>
          </p>
          <div className="security-info">
            <i className="fas fa-shield-alt"></i>
            <span>Réinitialisation sécurisée</span>
          </div>
        </div>

        {/* Conseils de sécurité */}
        <div className="security-tips">
          <h4>Conseils de sécurité</h4>
          <div className="tips-grid">
            <div className="tip-card">
              <i className="fas fa-user-secret"></i>
              <h5>Ne partagez jamais</h5>
              <p>Votre code de réinitialisation est personnel</p>
            </div>
            <div className="tip-card">
              <i className="fas fa-clock"></i>
              <h5>Code temporaire</h5>
              <p>Le code expire après 15 minutes</p>
            </div>
            <div className="tip-card">
              <i className="fas fa-exclamation-triangle"></i>
              <h5>Suspicion de fraude ?</h5>
              <p>Contactez immédiatement notre support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
