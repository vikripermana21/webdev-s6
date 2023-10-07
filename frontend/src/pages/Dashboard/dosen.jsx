import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar";
import { useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const DashboardDosen = () => {
  const { dosenId } = useParams();

  const [dosen, setDosen] = useState({});
  const [eduHis, setEduHis] = useState([]);
  const [teachHis, setTeachHis] = useState([]);
  const [research, setResearch] = useState([]);
  const [pkm, setPKM] = useState([]);
  const [selectedResearch, setSelectedResearch] = useState(null); // Menyimpan data research yang dipilih
  const [selectedPKM, setSelectedPKM] = useState(null);
  // State untuk mengontrol modal tambah data research
  const [showAddResearchModal, setShowAddResearchModal] = useState(false);

  // State untuk mengontrol modal tambah data PKM
  const [showAddPKMModal, setShowAddPKMModal] = useState(false);

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
    getListDosen();
    getListEducationHistory();
    getTeachingHistory();
    getListResearch();
    getListPKM();
    handleDeleteResearch();
    handleDeletePKM();
    // getIdDosen;
  }, []);

  // const getIdDosen = () => {
  //   fetch(`http://localhost:5000/login`)
  //     .then((response) => {
  //       return response.json();
  //       console.log(response);
  //     })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Gagal login");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // Simpan data infoAkun dari respons ke dalam variabel infoAkunData
  //       infoAkunData = data.infoAkun.id_user_account;

  //       // Sekarang Anda dapat mengakses infoAkunData di dalam FE
  //       console.log(infoAkunData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const getListDosen = () => {
    fetch(`http://localhost:5000/lecturer/3`, {
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
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListEducationHistory = () => {
    fetch(`http://localhost:5000/education-history/3`, {
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
    fetch(`http://localhost:5000/teaching-history/3`, {
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
    fetch(`http://localhost:5000/research/1`, {
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
    fetch(`http://localhost:5000/pkm/1`, {
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

  const handleDeleteResearch = (id_research) => {
    // Lakukan permintaan fetch untuk menghapus data research dengan id_research tertentu
    fetch(`http://localhost:5000/research/${id_research}`, {
      method: "DELETE", // Menggunakan metode DELETE untuk menghapus data
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menghapus data research");
        }
        // Jika berhasil dihapus, perbarui data research yang ditampilkan
        getListResearch();
      })
      .catch((err) => {
        console.error("Gagal menghapus data research:", err);
      });
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

  const handleUpdateResearch = () => {
    if (selectedResearch) {
      // Lakukan permintaan fetch untuk mengirim pembaruan data research ke server
      fetch(`http://localhost:5000/research/${selectedResearch.id_research}`, {
        method: "PATCH", // Menggunakan metode PUT untuk pembaruan data
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedResearch), // Mengirim data research yang diperbarui
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

  const handleUpdatePKM = () => {
    if (selectedPKM) {
      // Lakukan permintaan fetch untuk mengirim pembaruan data PKM ke server
      fetch(`http://localhost:5000/pkm/${selectedPKM.id_pkm}`, {
        method: "PATCH", // Menggunakan metode PUT untuk pembaruan data
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedPKM), // Mengirim data PKM yang diperbarui
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Gagal mengupdate data PKM");
          }
          // Jika berhasil diupdate, perbarui data PKM yang ditampilkan
          getListPKM();
          setSelectedPKM(null); // Tutup modal setelah berhasil
        })
        .catch((err) => {
          console.error("Gagal mengupdate data PKM:", err);
        });
    }
  };

  // Fungsi untuk menampilkan form update data Research
  const showResearchModal = (researchData) => {
    setSelectedResearch(researchData); // Menyimpan data research yang dipilih
    document.getElementById("my_modal_1").showModal();
  };

  // Fungsi untuk menampilkan form update data PKM
  const showPKMModal = (pkmData) => {
    setSelectedPKM(pkmData); // Menyimpan data PKM yang dipilih
    document.getElementById("my_modal_2").showModal();
  };

  let rowNum = 1;
  let rowNum2 = 1;

  // State untuk menyimpan data baru yang akan ditambahkan
  const [newResearch, setNewResearch] = useState({
    research_title: "",
    publication_date: "",
    doi_link: "",
    id_dosen: "",
  });

  const [newPKM, setNewPKM] = useState({
    pkm_title: "",
    pkm_year: "",
    partner_name: "",
    description: "",
  });

  // Fungsi untuk menambahkan data research baru
  const handleAddResearch = () => {
    // Lakukan permintaan fetch untuk menambahkan data research baru ke server
    fetch(`http://localhost:5000/research`, {
      method: "POST", // Menggunakan metode POST untuk menambahkan data
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newResearch), // Mengirim data research baru
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

  // Fungsi untuk menambahkan data PKM baru
  const handleAddPKM = () => {
    // Lakukan permintaan fetch untuk menambahkan data PKM baru ke server
    fetch(`http://localhost:5000/pkm`, {
      method: "POST", // Menggunakan metode POST untuk menambahkan data
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPKM), // Mengirim data PKM baru
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menambahkan data PKM");
        }
        // Jika berhasil ditambahkan, perbarui data PKM yang ditampilkan
        getListPKM();
        setNewPKM({
          pkm_title: "",
          pkm_year: "",
          partner_name: "",
          description: "",
        }); // Kosongkan input setelah berhasil
      })
      .catch((err) => {
        console.error("Gagal menambahkan data PKM:", err);
      });
  };

  return (
    <div>
      <Topbar contentType="admin" />
      <div className="mt-14 w-screen h-screen flex">
        <div className="w-2/6 flex flex-col gap-3 items-center p-5">
          <div className="w-full rounded-md flex items-start p-6 border h-max ">
            {/* ... */}
          </div>
        </div>

        <div className="w-4/6 flex flex-col gap-3 items-start p-5">
          <div className="w-full rounded-md flex flex-col items-start border relative">
            <h4 className="flex w-full text-lg font-bold p-5">Research</h4>
            {/* Tombol "Add Data" untuk menambahkan data research baru */}
            <button
              className="btn-primary hover:bg-primary-900 text-white font-bold rounded m-2"
              onClick={() => setShowAddResearchModal(true)}
            >
              Add Data
            </button>
            <div className="p-5">
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
          <div className="w-full rounded-md flex flex-col items-start border relative">
            <h4 className="flex w-full text-lg font-bold p-5">PKM</h4>
            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Title</th>
                      <th>Year</th>
                      <th>Partner Name</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pkm.map((item) => (
                      <tr key={item.id_pkm}>
                        <td>{rowNum2++}</td>
                        <td>{item.pkm_title}</td>
                        <td>{item.pkm_year}</td>
                        <td>{item.partner_name}</td>
                        <td>{item.description}</td>
                        <td>
                          <div className="flex">
                            <button
                              className="btn-primary hover:bg-primary-900 text-white font-bold rounded mr-2"
                              onClick={() => showPKMModal(item)}
                            >
                              <FaRegEdit />
                            </button>
                            <button
                              onClick={() => {
                                handleDeletePKM(item.id_pkm);
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
                type="text"
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
                type="text"
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

      {/* Modal untuk update data PKM */}
      {selectedPKM && (
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg pb-5">Update data PKM</h3>
            <div className="form-control w-full">
              <label className="label">PKM Title</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={selectedPKM.pkm_title}
                // Handle perubahan pada input
                onChange={(e) =>
                  setSelectedPKM({
                    ...selectedPKM,
                    pkm_title: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full">
              <label className="label">PKM Year</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={selectedPKM.pkm_year}
                // Handle perubahan pada input
                onChange={(e) =>
                  setSelectedPKM({
                    ...selectedPKM,
                    pkm_year: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full">
              <label className="label">Partner Name</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={selectedPKM.partner_name}
                // Handle perubahan pada input
                onChange={(e) =>
                  setSelectedPKM({
                    ...selectedPKM,
                    partner_name: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full">
              <label className="label">Description</label>
              <textarea
                rows="4"
                type="text"
                placeholder="Type here"
                className=" block p-2.5 input input-bordered w-full"
                value={selectedPKM.description}
                // Handle perubahan pada input
                onChange={(e) =>
                  setSelectedPKM({
                    ...selectedPKM,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-action">
              <button
                className="btn mr-2"
                onClick={() => {
                  setSelectedPKM(null); // Tutup modal
                }}
              >
                Close
              </button>
              <button className="btn btn-primary" onClick={handleUpdatePKM}>
                Save
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default DashboardDosen;
