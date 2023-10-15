import React, { useEffect, useState } from "react";
import Topbar from "../../../components/topbar";
import SideBar from "../../../components/sidebar";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import moment from "moment";

const UpdateResearch = () => {
  const dataAkun = JSON.parse(localStorage.getItem("infoAkun"));
  console.log(dataAkun);
  const [research, setResearch] = useState([]);
  const [selectedResearch, setSelectedResearch] = useState(null); // Menyimpan data research yang dipilih
  const [showAddResearchModal, setShowAddResearchModal] = useState(false);

  const [newResearch, setNewResearch] = useState({
    research_title: "",
    publication_date: "",
    doi_link: "",
    id_dosen: "",
  });

  let rowNum = 1;

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
    getListResearch();
  }, []);

  const getListResearch = () => {
    fetch(`http://localhost:5000/research/${dataAkun.id_user_account}`, {
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

  const handleUpdateResearch = () => {
    if (selectedResearch) {
      // Lakukan permintaan fetch untuk mengirim pembaruan data research ke server
      fetch(`http://localhost:5000/research/${selectedResearch.id_research}`, {
        method: "PATCH", // Menggunakan metode PUT untuk pembaruan data
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...selectedResearch,
          publication_date: moment(selectedResearch.publication_date).format(
            "YYYY-MM-DD"
          ),
        }), // Mengirim data research baru
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Gagal mengupdate data research");
          }
          // Jika berhasil diupdate, perbarui data research yang ditampilkan
          getListResearch();
          setSelectedResearch(null); // Tutup modal setelah berhasil
        })
        .catch((err) => {
          console.error("Gagal mengupdate data research:", err);
        });
    }
  };

  const showResearchModal = (researchData) => {
    setSelectedResearch(researchData); // Menyimpan data research yang dipilih
    document.getElementById("my_modal_1").showModal();
  };

  const handleDeletePKM = (id_pkm) => {
    // Lakukan permintaan fetch untuk menghapus data PKM dengan id_pkm tertentu
    fetch(`http://localhost:5000/pkm/${id_pkm}`, {
      method: "DELETE", // Menggunakan metode DELETE untuk menghapus data
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menghapus data PKM");
        }
        // Jika berhasil dihapus, perbarui data PKM yang ditampilkan
        getListPKM();
      })
      .catch((err) => {
        console.error("Gagal menghapus data PKM:", err);
      });
  };

  const handleAddResearch = () => {
    // Lakukan permintaan fetch untuk menambahkan data research baru ke server
    fetch(`http://localhost:5000/research`, {
      method: "POST", // Menggunakan metode POST untuk menambahkan data
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newResearch,
        id_dosen: dataAkun.id_user_account,
        publication_date: moment(newResearch.publication_date).format(
          "YYYY-MM-DD"
        ),
      }), // Mengirim data research baru
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menambahkan data research");
        }
        // Jika berhasil ditambahkan, perbarui data research yang ditampilkan
        getListResearch();
        setNewResearch({
          research_title: "",
          publication_date: "",
          doi_link: "",
        }); // Kosongkan input setelah berhasil
      })
      .catch((err) => {
        console.error("Gagal menambahkan data research:", err);
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
              <h4 className="flex text-3xl font-bold p-5">Research</h4>
              <button
                className="btn-sm btn-primary hover:bg-primary-900 text-white font-bold rounded m-2"
                onClick={() => setShowAddResearchModal(true)}
              >
                <AiOutlinePlus />
              </button>
            </div>
            <div className="p-5 w-full">
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Title</th>
                      <th>Publication Date</th>
                      <th>DOI Link</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Menampilkan data research */}
                    {research.map((item) => (
                      <tr key={item.id_research}>
                        <td>{rowNum++}</td>
                        <td>{item.research_title}</td>
                        <td>{item.publication_date}</td>
                        <td>{item.doi_link}</td>
                        <td>
                          <div className="flex">
                            <button
                              className="btn-primary hover:bg-primary-900 text-white font-bold rounded mr-2"
                              onClick={() => showResearchModal(item)}
                            >
                              <FaRegEdit />
                            </button>
                            <button
                              onClick={() => {
                                handleDeleteResearch(item.id_research);
                              }}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold rounded"
                            >
                              <RiDeleteBin5Line />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal untuk update data Research */}
      {selectedResearch && (
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg pb-5">Update data Research</h3>
            <div className="form-control w-full">
              <label className="label">Research Title</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={selectedResearch.research_title}
                // Handle perubahan pada input
                onChange={(e) =>
                  setSelectedResearch({
                    ...selectedResearch,
                    research_title: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full">
              <label className="label">Publication Date</label>
              <input
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={selectedResearch.publication_date}
                // Handle perubahan pada input
                onChange={(e) =>
                  setSelectedResearch({
                    ...selectedResearch,
                    publication_date: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full">
              <label className="label">DOI Link</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={selectedResearch.doi_link}
                // Handle perubahan pada input
                onChange={(e) =>
                  setSelectedResearch({
                    ...selectedResearch,
                    doi_link: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-action">
              <button
                className="btn mr-2"
                onClick={() => {
                  setSelectedResearch(null); // Tutup modal
                }}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={handleUpdateResearch}
              >
                Save
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Modal untuk menambahkan data research */}
      {showAddResearchModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-box">
            <h3 className="font-bold text-lg pb-5">Add Data Research</h3>
            <div className="form-control w-full">
              <label className="label">Research Title</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={newResearch.research_title}
                onChange={(e) =>
                  setNewResearch({
                    ...newResearch,
                    research_title: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full">
              <label className="label">Publication Date</label>
              <input
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={newResearch.publication_date}
                onChange={(e) =>
                  setNewResearch({
                    ...newResearch,
                    publication_date: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full">
              <label className="label">DOI Link</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={newResearch.doi_link}
                onChange={(e) =>
                  setNewResearch({
                    ...newResearch,
                    doi_link: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-action">
              <button
                className="btn mr-2"
                onClick={() => setShowAddResearchModal(false)}
              >
                Close
              </button>
              <button className="btn btn-primary" onClick={handleAddResearch}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateResearch;
