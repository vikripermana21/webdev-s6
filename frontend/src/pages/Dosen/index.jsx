import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar";
import { useNavigate } from "react-router-dom";

const Dosen = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    getListDosen();
  }, []);

  const getListDosen = () => {
    fetch("http://localhost:5000/lecturer", {
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
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="h-screen w-screen">
      <Topbar />
      <div className="mt-20">
        <div className="flex justify-center items-center">
          <h1>Staf Dosen</h1>
        </div>
        <div className="grid grid-cols-3">
          {data.map((item) => (
            <div className="card w-96 bg-base-100 shadow-xl mt-3 ml-3">
              {
                <figure>
                  <img
                    src={item.profile_picture} // Assuming item.profile_picture contains the image URL
                    alt="Shoes"
                    className="rounded-full h-44 w-44"
                  />
                </figure>
              }
              <div className="card-body">
                <p className="text-lg font-bold">{item.full_name}</p>
                <p>{item.major}</p>
                <p>{item.study_program}</p>
                <p className="font-semibold">{item.email}</p>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => navigate(`/dosen/${item.id_dosen}`)}
                    className="btn btn-primary flex grow"
                  >
                    Profil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dosen;
