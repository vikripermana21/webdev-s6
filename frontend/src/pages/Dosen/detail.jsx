import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Topbar from "../../components/topbar";

const DetailDosen = () => {
  const { dosenId } = useParams();

  const [dosen, setDosen] = useState({});
  const [eduHis, setEduHis] = useState([]);
  const [teachHis, setTeachHis] = useState([]);
  const [research, setResearch] = useState([]);
  const [pkm, setPKM] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const [selectedPKM, setSelectedPKM] = useState(null); // State untuk data PKM yang dipilih
  const [isPKMModalOpen, setPKMModalOpen] = useState(false); // State untuk mengelola status modal PKM

  const openPKMDetailModal = (pkmId) => {
    // Temukan data PKM berdasarkan ID PKM
    const selectedPKMData = pkm.find((item) => item.id_pkm === pkmId);
    setSelectedPKM(selectedPKMData);
    setPKMModalOpen(true); // Buka modal PKM
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    getListDosen();
    getListEducationHistory();
    getTeachingHistory();
    getListResearch();
    getListPKM();
  }, []);

  const getListDosen = () => {
    fetch(`http://localhost:5000/lecturer/${dosenId}`, {
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

  const getListEducationHistory = () => {
    fetch(`http://localhost:5000/education-history/${dosenId}`, {
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
        setEduHis(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTeachingHistory = () => {
    fetch(`http://localhost:5000/teaching-history/${dosenId}`, {
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
        setTeachHis(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListResearch = () => {
    fetch(`http://localhost:5000/research/${dosenId}`, {
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

  const getListPKM = () => {
    fetch(`http://localhost:5000/pkm/${dosenId}`, {
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
        <div className="w-3/6 flex flex-col gap-3 items-center p-5">
          <div className="w-full rounded-md flex items-start p-6 border h-max ">
            <div className="mr-5 pt-2">
              <img
                src={dosen.profile_picture}
                alt=""
                className="object-cover h-20 w-20 rounded-full"
              />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-2xl font-bold">{dosen.full_name}</p>
              <p className="text-sm">{dosen.major}</p>
              <p className="text-sm">{dosen.study_program}</p>
              <p className="text-sm">{dosen.position}</p>
            </div>
          </div>
          <div className="w-full rounded-md flex flex-col gap-10 items-start p-6 border h-max ">
            <div className="p-5 flex flex-col w-full">
              <div className="flex items-start">
                <button
                  onClick={() => setToggle(false)}
                  className={`w-full rounded-none rounded-l-md focus:outline-none ${
                    !toggle && "btn-primary"
                  }`}
                >
                  PKM
                </button>
                <button
                  onClick={() => setToggle(true)}
                  className={`w-full rounded-none rounded-r-md focus:outline-none ${
                    toggle && "btn-primary"
                  }`}
                >
                  Research
                </button>
              </div>
              <div className="mt-2 items-start">
                {toggle && (
                  <div className="flex flex-col gap-4">
                    {research.map((item) => (
                      <div className="flex flex-col items-start pt-3">
                        <p className="text-left text-lg font-bold items-start">
                          {item.research_title}
                        </p>
                        <p className="">
                          Publication Date :{" "}
                          {new Date(item.publication_date).toLocaleDateString(
                            "en-GB"
                          )}
                        </p>
                        <a
                          href={item.doi_link}
                          className="fill-primary-content"
                        >
                          {item.doi_link}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
                {!toggle && (
                  <div className="flex flex-col gap-4">
                    {pkm.map((item) => (
                      <div className="flex flex-col items-start pt-3">
                        <div className="flex w-full justify-between items-center">
                          <div className="">
                            <p className="flex text-left text-lg font-bold items-start">
                              {item.pkm_title}
                            </p>
                            <p className="flex text-left items-start">
                              PKM Date : {""}
                              {new Date(item.pkm_year).toLocaleDateString(
                                "en-GB"
                              )}
                            </p>
                          </div>
                          <button
                            className="justify-end items-end"
                            onClick={() => openPKMDetailModal(item.id_pkm)}
                          >
                            See Detail
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-3/6 flex flex-col gap-3 items-start p-5">
          <div className="w-full rounded-md flex flex-col items-start border relative">
            <h4 className="flex w-full text-lg font-bold p-5 rounded-none rounded-t-md bg-indigo-50">
              Bio
            </h4>
            <div className="p-5">
              <p className="">{dosen.bio}</p>
            </div>
          </div>
          <div className="w-full rounded-md flex flex-col items-start border h-max relative">
            <h4 className="flex w-full text-lg font-bold p-5 rounded-none rounded-t-md bg-indigo-50">
              Education History
            </h4>
            <div className="p-5 flex flex-col">
              {eduHis.map((item) => (
                <div className="flex flex-col items-start mb-4">
                  <div className="font-bold text-base">{item.degree}</div>
                  <div className="">{item.institution}</div>
                  <div className="">
                    Graduation Year :{" "}
                    {new Date(item.graduation_date).getFullYear()}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full rounded-md flex flex-col items-start border h-max relative">
            <h4 className="flex w-full text-lg font-bold p-5 rounded-none rounded-t-md bg-indigo-50">
              Teaching History
            </h4>
            <div className="p-5 flex flex-col">
              {teachHis.map((item) => (
                <div className="flex flex-col items-start mb-4">
                  <div className="font-bold text-base">{item.institution}</div>
                  <div className="">Position : {item.position}</div>
                  <div className="">
                    Teaching Period : {new Date(item.start_date).getFullYear()}{" "}
                    - {new Date(item.end_date).getFullYear()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal untuk menampilkan detail PKM */}
      {isPKMModalOpen && selectedPKM && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg pb-5">PKM Detail</h3>
              <div className="overflow-x-auto">
                <table className="table">
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th className="text-base">PKM Title</th>
                      <td className="text-base">{selectedPKM.pkm_title}</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <th className="text-base">PKM Year</th>
                      <td className="text-base">
                        {new Date(selectedPKM.pkm_year).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <th className="text-base">Partner Name</th>
                      <td className="text-base">{selectedPKM.partner_name}</td>
                    </tr>
                    {/* row 4 */}
                    <tr>
                      <th className="text-base">Desription</th>
                    </tr>
                  </tbody>
                </table>
                <div className="pl-4 pr-3">
                  <p className="text-justify">
                    {"   "}
                    {selectedPKM.description}
                  </p>
                </div>
              </div>
              {/* Tambahkan data PKM lainnya sesuai kebutuhan */}
              <div className="modal-action">
                <button
                  className="btn mr-2"
                  onClick={() => setPKMModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailDosen;
