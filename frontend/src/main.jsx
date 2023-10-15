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
import UpdateDataDosen from "./pages/Dashboard/Admin/updateDosen.jsx";
import UpdateDataEducation from "./pages/Dashboard/Admin/updateEduHistory.jsx";
import UpdateDataTeach from "./pages/Dashboard/Admin/updateTeachHistory.jsx";
import ProfileDosen from "./pages/Dashboard/Dosen/profileDosen.jsx";
import EducationHisDosen from "./pages/Dashboard/Dosen/eduHisDosen.jsx";
import TeachingHisDosen from "./pages/Dashboard/Dosen/teachHisDosen.jsx";
import UpdatePKM from "./pages/Dashboard/Dosen/updatePKM.jsx";
import UpdateResearch from "./pages/Dashboard/Dosen/updateResearch.jsx";
// import DashboardDosen from "./pages/Dashboard/Dosen/dosen.jsx";
// import DashboardDosenResearch from "./pages/Dashboard/Dosen/crudResearch.jsx";
// import DashboardDosenPKM from "./pages/Dashboard/Dosen/crudPKM.jsx";

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
    path: "/dashboard/profiledosen",
    element: <ProfileDosen />,
  },
  {
    path: "/dashboard/eduhisdosen",
    element: <EducationHisDosen />,
  },
  {
    path: "/dashboard/teachhisdosen",
    element: <TeachingHisDosen />,
  },
  {
    path: "/dashboard/updatepkm",
    element: <UpdatePKM />,
  },
  {
    path: "/dashboard/updateresearch",
    element: <UpdateResearch />,
  },
  {
    path: "/updatedosen/:dosenId",
    element: <UpdateDataDosen />,
  },
  {
    path: "/updateeduhistory/:dosenId",
    element: <UpdateDataEducation />,
  },
  {
    path: "/updateteachhistory/:dosenId",
    element: <UpdateDataTeach />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
