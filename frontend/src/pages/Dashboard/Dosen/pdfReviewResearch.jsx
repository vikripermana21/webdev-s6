import React, { useEffect, useState } from "react";
import Topbar from "../../../components/topbar";
import SideBar from "../../../components/sidebar";
import { useNavigate, useParams } from "react-router-dom";

const PDFReviewResearch = () => {
  const dosenId = useParams();
  console.log(dosenId);
  const navigate = useNavigate();
  const dataAkun = JSON.parse(localStorage.getItem("infoAkun"));
  console.log(dataAkun);
  const [research, setResearch] = useState([]);

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
    getListResearch();
  }, []);

  const getListResearch = () => {
    fetch(`http://localhost:5000/research/${dataAkun.profile_dosen.id_dosen}`, {
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
        // Menambahkan data PDF base64 ke setiap entri  dalam daftar
        const researchListWithPDFData = data.map((research) => ({
          ...research,
          pdfData: research.pdf_research,
        }));

        setResearch(researchListWithPDFData);
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
          {research.map((item) => (
            <div className="w-full rounded-md flex flex-col items-start border relative">
              <div className="flex w-full justify-between items-center">
                <h4 className="flex w-full text-3xl font-bold p-5 text-center">
                  {item.research_title}
                </h4>
              </div>
              <div className="w-full p-5">
                <div key={item.id_research}>
                  <iframe
                    src={item.pdfData}
                    title="PDF Preview"
                    width="100%"
                    height="500px"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PDFReviewResearch;
