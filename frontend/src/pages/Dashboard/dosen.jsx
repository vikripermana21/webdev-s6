import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/topbar";
import SideBar from "../../components/sidebar";

const DashboardDosen = () => {
  const navigate = useNavigate();
  const dataAkun = JSON.parse(localStorage.getItem("infoAkun"));

  useEffect(() => {
    if (dataAkun.role != "Dosen") {
      navigate("/");
    }
  });
  return (
    <div className="h-screen w-screen flex">
      <Topbar contentType="dosen" />
      <div className="w-1/4 flex flex-col gap-3 items-center">
        <SideBar />
      </div>
      <div className="w-3/4 flex flex-col gap-3 items-center p-5">
        <div className="mt-16">
          <div className="max-w-md mb-5">
            <h4 className="text-5xl font-bold">Welcome !</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDosen;
