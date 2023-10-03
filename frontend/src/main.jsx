import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/index.jsx";
import Register from "./pages/Register/index.jsx";
import Dosen from "./pages/Dosen/index.jsx";
import DetailDosen from "./pages/Dosen/detail.jsx";
import DashboardAdmin from "./pages/Dashboard/admin.jsx";
import DashboardDosen from "./pages/Dashboard/dosen.jsx";

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
    path: "/dashboard/admin",
    element: <DashboardAdmin />,
  },
  {
    path: "/dashboard/dosen",
    element: <DashboardDosen />,
  },
  {
    path: "/dosen/addDosen",
    element: <AddDosen />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
