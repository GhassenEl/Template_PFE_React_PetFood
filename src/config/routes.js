import { lazy } from "react";

export const routes = [
  {
    path: "/",
    component: lazy(() => import("../pages/Home/Dashboard")),
    exact: true,
    protected: false,
  },
  {
    path: "/products",
    component: lazy(() => import("../pages/Products/Products")),
    exact: true,
    protected: false,
  },
  {
    path: "/product/:id",
    component: lazy(() => import("../pages/ProductDetails/ProductDetails")),
    exact: true,
    protected: false,
  },
  {
    path: "/cart",
    component: lazy(() => import("../pages/Cart/Cart")),
    exact: true,
    protected: false,
  },
  {
    path: "/checkout",
    component: lazy(() => import("../pages/Checkout/Checkout")),
    exact: true,
    protected: true,
  },
  {
    path: "/login",
    component: lazy(() => import("../pages/Auth/Login/Login")),
    exact: true,
    protected: false,
    guestOnly: true,
  },
  {
    path: "/register",
    component: lazy(() => import("../pages/Auth/Register/Register")),
    exact: true,
    protected: false,
    guestOnly: true,
  },
  {
    path: "/dashboard",
    component: lazy(() => import("../pages/Dashboard/Dashboard")),
    exact: true,
    protected: true,
  },
];
