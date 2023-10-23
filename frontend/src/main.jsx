import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/index.jsx";
import Dosen from "./pages/Dosen/index.jsx";
import DetailDosen from "./pages/Dosen/detail.jsx";
// route admin
import DashboardAdmin from "./pages/Dashboard/admin.jsx";
import UpdateDataDosen from "./pages/Dashboard/Admin/updateDosen.jsx";
import UpdateDataEducation from "./pages/Dashboard/Admin/updateEduHistory.jsx";
import UpdateDataTeach from "./pages/Dashboard/Admin/updateTeachHistory.jsx";
// route dosen
import DashboardDosen from "./pages/Dashboard/dosen.jsx";
import ProfileDosen from "./pages/Dashboard/Dosen/profileDosen.jsx";
import EducationHisDosen from "./pages/Dashboard/Dosen/eduHisDosen.jsx";
import TeachingHisDosen from "./pages/Dashboard/Dosen/teachHisDosen.jsx";
import UpdatePKM from "./pages/Dashboard/Dosen/updatePKM.jsx";
import UpdateResearch from "./pages/Dashboard/Dosen/updateResearch.jsx";
import PDFReview from "./pages/Dashboard/Dosen/pdfReviewPKM.jsx";
import PDFReviewResearch from "./pages/Dashboard/Dosen/pdfReviewResearch.jsx";
import DetailDosenPKM from "./pages/Dosen/detailpkm.jsx";
import DetailDosenResearch from "./pages/Dosen/detailResearch.jsx";

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
    path: "/dosen",
    element: <Dosen />,
  },
  {
    path: "/dosen/:dosenId",
    element: <DetailDosen />,
  },
  {
    path: "/dosen/pkm/:id",
    element: <DetailDosenPKM />,
  },
  {
    path: "/dosen/research/:id",
    element: <DetailDosenResearch />,
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
    path: "/dashboard/pdfreview/pkm/:dosenId",
    element: <PDFReview />,
  },
  {
    path: "/dashboard/pdfreview/research/:dosenId",
    element: <PDFReviewResearch />,
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
