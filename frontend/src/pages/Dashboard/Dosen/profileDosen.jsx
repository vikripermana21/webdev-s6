import React from "react";
import Topbar from "../../../components/topbar";
import SideBar from "../../../components/sidebar";

const ProfileDosen = () => {
  return (
    <div className="h-screen w-screen flex">
      <Topbar contentType="dosen" />
      <div className="w-1/4 flex flex-col gap-3 items-center">
        <SideBar />
      </div>
      <div className="w-3/4 flex flex-col gap-3 items-center p-5">
        <div className="mt-16">
          <div className="max-w-md mb-5">
            <h4 className="text-5xl font-bold">Profile Dosen</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDosen;
