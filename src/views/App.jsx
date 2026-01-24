import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import MainLayout from "./components/layout/MainLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import ScrollToTop from "./components/ui/ScrollToTop";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import "./App.css";

// Lazy loading des pages publiques
const Home = lazy(() => import("./pages/Home/Home"));
const Products = lazy(() => import("./pages/Products/Products"));
const ProductDetails = lazy(
  () => import("./pages/ProductDetails/ProductDetails"),
);
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Delivery = lazy(() => import("./pages/Delivery/Delivery"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

// Lazy loading des pages Dashboard
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const DashboardOverview = lazy(() => import("./pages/Dashboard/Overview"));
const DashboardOrders = lazy(() => import("./pages/Dashboard/Orders"));
const DashboardOrderDetails = lazy(
  () => import("./pages/Dashboard/OrderDetails"),
);
const DashboardPets = lazy(() => import("./pages/Dashboard/Pets"));
const DashboardPetDetails = lazy(() => import("./pages/Dashboard/PetDetails"));
const DashboardSubscriptions = lazy(
  () => import("./pages/Dashboard/Subscriptions"),
);
const DashboardAddresses = lazy(() => import("./pages/Dashboard/Addresses"));
const DashboardWishlist = lazy(() => import("./pages/Dashboard/Wishlist"));
const DashboardSettings = lazy(() => import("./pages/Dashboard/Settings"));
const DashboardNotifications = lazy(
  () => import("./pages/Dashboard/Notifications"),
);
const DashboardSupport = lazy(() => import("./pages/Dashboard/Support"));

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Routes avec MainLayout (Site public) */}
              <Route path="/" element={<MainLayout />}>
                <Route
                  index
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Home />
                    </Suspense>
                  }
                />
                <Route
                  path="products"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Products />
                    </Suspense>
                  }
                />
                <Route
                  path="products/:category"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Products />
                    </Suspense>
                  }
                />
                <Route
                  path="product/:id"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <ProductDetails />
                    </Suspense>
                  }
                />
                <Route
                  path="cart"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Cart />
                    </Suspense>
                  }
                />
                <Route
                  path="about"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <About />
                    </Suspense>
                  }
                />
                <Route
                  path="contact"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Contact />
                    </Suspense>
                  }
                />
                <Route
                  path="delivery"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Delivery />
                    </Suspense>
                  }
                />
                <Route
                  path="login"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Login />
                    </Suspense>
                  }
                />
                <Route
                  path="register"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Register />
                    </Suspense>
                  }
                />
                <Route
                  path="checkout"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<LoadingSpinner />}>
                        <Checkout />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* Routes avec DashboardLayout (Espace client) */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <DashboardOverview />
                    </Suspense>
                  }
                />
                <Route
                  path="orders"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <DashboardOrders />
                    </Suspense>
                  }
                />
                <Route
                  path="orders/:id"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <DashboardOrderDetails />
                    </Suspense>
                  }
                />
                <Route
                  path="pets"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <DashboardPets />
                    </Suspense>
                  }
                />
                <Route
                  path="pets/:id"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <DashboardPetDetails />
                    </Suspense>
                  }
                />
                <Route
                  path="subscriptions"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <DashboardSubscriptions />
                    </Suspense>
                  }
                />
                <Route
                  path="addresses"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <DashboardAddresses />
                    </Suspense>
                  }
                />
                <Route
                  path="wishlist"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <DashboardWishlist />
                    </Suspense>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <DashboardSettings />
                    </Suspense>
                  }
                />
                <Route
                  path="notifications"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <DashboardNotifications />
                    </Suspense>
                  }
                />
                <Route
                  path="support"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <DashboardSupport />
                    </Suspense>
                  }
                />
              </Route>

              {/* 404 */}
              <Route
                path="*"
                element={
                  <MainLayout>
                    <Suspense fallback={<LoadingSpinner />}>
                      <NotFound />
                    </Suspense>
                  </MainLayout>
                }
              />
            </Routes>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#2c3e50",
                  color: "#fff",
                },
                success: {
                  iconTheme: {
                    primary: "#2ecc71",
                    secondary: "#fff",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#e74c3c",
                    secondary: "#fff",
                  },
                },
              }}
            />
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
