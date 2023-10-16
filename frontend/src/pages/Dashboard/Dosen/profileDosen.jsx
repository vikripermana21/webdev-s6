import React, { useState, useEffect } from "react";
import Topbar from "../../../components/topbar";
import SideBar from "../../../components/sidebar";
import { useNavigate, useParams } from "react-router-dom";

const ProfileDosen = () => {
  const navigate = useNavigate();
  const dataAkun = JSON.parse(localStorage.getItem("infoAkun"));
  console.log(dataAkun);
  if (dataAkun.role != "Dosen") {
    navigate("/");
  }
  const { dosenId } = useParams();
  console.log(dosenId);

  const [dosen, setDosen] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/login`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.ok) {
          throw new Error("Gagal login");
        }
        // Set the infoAkun data
        setInfoAkun(data.infoAkun);
      })
      .catch((err) => {
        console.log(err);
      });
    if (dataAkun.role != "Dosen") {
      navigate("/");
    }
    getProfileDosen();
  }, []);

  const getProfileDosen = () => {
    fetch(`http://localhost:5000/lecturer/${dataAkun.id_user_account}`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDosen(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="h-screen w-screen flex">
      <Topbar contentType="dosen" />
      <div className="w-1/4 flex flex-col gap-3 items-center">
        <SideBar />
      </div>
      <div className="w-3/4 flex flex-col gap-3 items-center p-5">
        <div className="mt-12 w-full">
          <div className="w-full rounded-md flex flex-col items-start border relative">
            <div className="flex w-full justify-between items-center">
              <h4 className="flex text-3xl font-bold pt-7 pl-7">Profile</h4>
              <button className="btn-sm hidden"></button>
            </div>
            <div className="p-5 w-full">
              <div className="w-full rounded-md flex items-start  h-max ">
                <div className="mr-10 mt-3">
                  <img
                    src={dosen.profile_picture}
                    alt=""
                    className="object-cover h-44 w-44 rounded-full"
                  />
                </div>
                <div className="flex flex-col items-start ">
                  <div className="overflow-x-auto">
                    <table className="table">
                      <tbody>
                        {/* row 1 */}
                        <tr>
                          <th className="text-base">Full name</th>
                          <td className="text-base">{dosen.full_name}</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                          <th className="text-base">Gender</th>
                          <td className="text-base">{dosen.gender}</td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                          <th className="text-base">Birthday</th>
                          <td className="text-base">
                            {dosen.place_of_birth}, {dosen.date_of_birth}
                          </td>
                        </tr>
                        {/* row 4 */}
                        <tr>
                          <th className="text-base">Email</th>
                          <td className="text-base">{dosen.email}</td>
                        </tr>
                        {/* row 5 */}
                        <tr>
                          <th className="text-base">Major</th>
                          <td className="text-base">{dosen.major}</td>
                        </tr>
                        {/* row 6 */}
                        <tr>
                          <th className="text-base">Study Program</th>
                          <td className="text-base">{dosen.study_program}</td>
                        </tr>
                        {/* row 7 */}
                        <tr>
                          <th className="text-base">Position</th>
                          <td className="text-base">{dosen.position}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDosen;
