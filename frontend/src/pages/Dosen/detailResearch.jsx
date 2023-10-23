import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Topbar from "../../components/topbar";
import moment from "moment";

const DetailDosenResearch = () => {
  const params = useParams();
  console.log(params);
  const dataDosen = JSON.parse(localStorage.getItem("idDosen"));
  console.log(dataDosen);

  const [research, setResearch] = useState([]);

  useEffect(() => {
    getListResearch();
  }, []);

  const getListResearch = () => {
    fetch(`http://localhost:5000/research/${dataDosen}/${params.id}`, {
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
        setResearch(data);
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
            Detail Research
          </h4>
          <div className="w-full rounded-md items-start p-6 border h-max ">
            <p className="text-xl font-bold text-left">
              {research.research_title}
            </p>
            <p className="text-base text-left">
              {moment(research.publication_date).format("DD MMMM YYYY")}
            </p>
            <div className="justify-start text-left">
              <a
                className="text-base font-bold text-left items-start"
                href={research.doi_link}
              >
                {research.doi_link}
              </a>
            </div>
            <br />
            <p className="text-base font-bold text-left">Description</p>
            <p className="text-base text-left">{research.description}</p>
          </div>
        </div>

        <div className="w-4/6 flex flex-col gap-3 items-start p-5">
          <div className="w-full rounded-md flex items-start p-6 border h-max ">
            <div className="w-full" key={research.id_research}>
              <iframe
                src={research.pdf_research}
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

export default DetailDosenResearch;
