import React, { useEffect, useState } from "react";
import Topbar from "../../../components/topbar";
import SideBar from "../../../components/sidebar";
import { useNavigate } from "react-router-dom";

const EducationHisDosen = () => {
  const navigate = useNavigate();
  const dataAkun = JSON.parse(localStorage.getItem("infoAkun"));
  console.log(dataAkun);
  const [eduHis, setEduHis] = useState([]);
  const [selectedPKM, setSelectedPKM] = useState(null);

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
    getEducationHistory();
  }, []);

  const getEducationHistory = () => {
    fetch(
      `http://localhost:5000/education-history/${dataAkun.id_user_account}`,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEduHis(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let rowNum = 1;

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
              <h4 className="flex text-3xl font-bold p-5">Education History</h4>
              <button className="btn-sm hidden"></button>
            </div>
            <div className="p-5 w-full">
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Institution</th>
                      <th>Degree</th>
                      <th>Graduation Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Menampilkan data research */}
                    {eduHis.map((item) => (
                      <tr key={item.id_education_history}>
                        <td>{rowNum++}</td>
                        <td>{item.institution}</td>
                        <td>{item.degree}</td>
                        <td>{item.graduation_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationHisDosen;
