import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Topbar from "../../components/topbar";
import moment from "moment";

const DetailDosenPKM = () => {
  const params = useParams();
  console.log(params);
  const dataDosen = JSON.parse(localStorage.getItem("idDosen"));
  console.log(dataDosen);

  const [pkm, setPKM] = useState([]);

  useEffect(() => {
    getListPKM();
  }, []);

  const getListPKM = () => {
    fetch(`http://localhost:5000/pkm/${dataDosen}/${params.id}`, {
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
        setPKM(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Topbar />
      <div className="mt-14 w-screen h-screen flex">
        <div className="w-2/6 flex flex-col gap-3 items-center p-5">
          <h4 className="flex w-full text-lg font-bold p-5 rounded-none rounded-t-md bg-indigo-50">
            Detail PKM
          </h4>
          <div className="w-full rounded-md items-start p-6 border h-max ">
            <p className="text-xl font-bold text-left">{pkm.pkm_title}</p>
            <p className="text-base text-left">
              {moment(pkm.pkm_year).format("DD MMMM YYYY")}
            </p>
            <div className="justify-start text-left">
              <a
                className="text-base font-bold text-left items-start"
                href={pkm.pkm_link}
              >
                {pkm.pkm_link}
              </a>
            </div>
            <br />
            <p className="text-base font-bold text-left">Description</p>
            <p className="text-base text-left">{pkm.description}</p>
          </div>
        </div>

        <div className="w-4/6 flex flex-col gap-3 items-start p-5">
          <div className="w-full rounded-md flex items-start p-6 border h-max ">
            <div className="w-full" key={pkm.id_pkm}>
              <iframe
                src={pkm.pdf_pkm}
                title="PDF Preview"
                width="100%"
                height="500px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDosenPKM;
