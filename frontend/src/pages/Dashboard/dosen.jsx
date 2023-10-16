import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/topbar";
import SideBar from "../../components/sidebar";
import { ImInfo } from "react-icons/im";

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
        <div className="mt-24 w-3/4 justify-center items-center">
          <div className="mb-5 ">
            <h4 className="text-5xl font-bold">
              Welcome {dataAkun.profile_dosen.full_name} !
            </h4>
            <div className="alert alert-info mt-11 w-auto">
              <ImInfo className="color-white" />
              <span
                className="text-white
              "
              >
                Tips!
              </span>
              <span className="text-white">
                You can add or update PKM and research data. If you want to
                update profile, teaching history, and education history, please
                contact admin.{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDosen;
