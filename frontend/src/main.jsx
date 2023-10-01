import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/index.jsx";
import Register from "./pages/Register/index.jsx";
import Dashboard from "./pages/Dashboard/index.jsx";
import Dosen from "./pages/Dosen/index.jsx";
import DetailDosen from "./pages/Dosen/detail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dosen",
    element: <Dosen />,
  },
  {
    path: "/dosen/:dosenId",
    element: <DetailDosen />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
