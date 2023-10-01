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
    <div className="h-screen w-full">
      <Topbar />
      <div className="mt-20">
        <h1>Staf Dosen</h1>
        <div className="grid grid-cols-3">
          {data.map((item) => (
            <div className="card w-96 bg-base-100 shadow-xl mt-3 ml-3">
              {/* <figure>
                <img
                  src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                  className="rounded-full"
                />
              </figure> */}
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
