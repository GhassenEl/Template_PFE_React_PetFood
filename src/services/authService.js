import api from "./api";

export const authService = {
  // Connexion
  login: async (email, password, remember = false) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
        remember,
      });

      // Stocker le token
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Inscription
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);

      // Auto-connexion après inscription
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Récupération du profil utilisateur
  getProfile: async () => {
    try {
      const response = await api.get("/auth/profile");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Mise à jour du profil
  updateProfile: async (userData) => {
    try {
      const response = await api.put("/auth/profile", userData);

      // Mettre à jour les données locales
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = { ...currentUser, ...response.data };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Demande de réinitialisation de mot de passe
  requestPasswordReset: async (email) => {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Vérification du code de réinitialisation
  verifyResetCode: async (email, code) => {
    try {
      const response = await api.post("/auth/verify-reset-code", {
        email,
        code,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Réinitialisation du mot de passe
  resetPassword: async (email, code, newPassword) => {
    try {
      const response = await api.post("/auth/reset-password", {
        email,
        code,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Vérification du token
  verifyToken: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return false;

      const response = await api.get("/auth/verify");
      return response.data.valid;
    } catch (error) {
      return false;
    }
  },

  // Rafraîchissement du token
  refreshToken: async () => {
    try {
      const response = await api.post("/auth/refresh");

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  },
};

// Données de démonstration
export const demoAuth = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Vérifier les identifiants de démo
        const isAdmin =
          email === "admin@petfood.com" && password === "demopassword123";
        const isUser =
          email === "demo@petfood.com" && password === "demopassword123";

        if (isAdmin || isUser) {
          const user = isAdmin
            ? {
                id: 1,
                email: "admin@petfood.com",
                name: "Admin PetFood",
                role: "admin",
                avatar: null,
                phone: "0123456789",
                address: "22 Rue des Animaux, Paris",
              }
            : {
                id: 2,
                email: "demo@petfood.com",
                name: "Jean Dupont",
                role: "customer",
                avatar: null,
                phone: "0612345678",
                address: "15 Avenue des Champs, Lyon",
              };

          localStorage.setItem("token", "demo-token-" + Date.now());
          localStorage.setItem("user", JSON.stringify(user));

          resolve({
            user,
            token: "demo-token",
          });
        } else {
          reject(new Error("Identifiants incorrects"));
        }
      }, 1000);
    });
  },

  register: (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: Math.floor(Math.random() * 1000),
          ...userData,
          role: "customer",
          avatar: null,
        };

        localStorage.setItem("token", "demo-token-" + Date.now());
        localStorage.setItem("user", JSON.stringify(user));

        resolve({
          user,
          token: "demo-token",
        });
      }, 1500);
    });
  },
};
